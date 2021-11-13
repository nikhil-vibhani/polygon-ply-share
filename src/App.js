import React, {useEffect, useState, useContext} from 'react';
import AppRoutes from './routes/AppRoutes';
import {GlobalContext} from './context/globalContext'
import {ToastContainer, toast} from 'react-toastify'
import {Web3Context, Web3Provider} from './web3/contexts/web3Context'
import {
  loadWeb3,
  loadBlockChainData,
  listenAccountChange,
  listenNetworkChange,
} from './web3/functions/web3'
import {addWalletAddress} from './action/stake.action'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {

  const [loading, setLoading] = useState(false)
  const web3NetWork = useContext(Web3Context);
  const [networkDetails, setNetworkDetails] = useState({
    address: '',
    web3: '',
    connected: '',
    connectTag: '',
    chainData: '',
    wallet: '',
    chainId: '',
    networkId: '',
    balance: '',
  })

  const resetApp = async () => {
    setNetworkDetails({
      address: '',
      web3: '',
      connected: false,
      connectTag: '',
      chainData: '',
      wallet: '',
      chainId: '',
      networkId: '',
      balance: '',
    })
    const web3 = window.web3
    //close -> disconnect
    localStorage.clear();
    if (
      web3 &&
      web3.currentProvider &&
      web3.currentProvider.disconnect
    ) {
      await web3.currentProvider.disconnect()
    }
  }

  const handleConnect = async () => {
    const metaMaskInstalled = typeof window.web3 !== 'undefined'
    if (metaMaskInstalled) {
      setLoading(true)
      await loadWeb3(setLoading)
      await loadBlockChainData(
        setNetworkDetails,
        networkDetails,
        setLoading,
      )
      await listenAccountChange(
        setNetworkDetails,
        networkDetails,
        setLoading,
        resetApp,
      )
      await listenNetworkChange(
        setNetworkDetails,
        networkDetails,
        setLoading,
        resetApp,
      )
    } else {
      toast.info(
        'Metamask Extension Not Found ! Please Install Metamask to Connect',
      )
    }
  }

  useEffect(() => {
    let injected = localStorage.getItem("injected");
    if (injected && injected !== undefined) {
      let walletName = localStorage.getItem("wallet_name");
      if (walletName && walletName !== undefined) {
        if (walletName === "metamask") {
          handleConnect();
        }
      }
    }
  }, []);

  useEffect(() => {
    (async () => {
      console.log('networkDetails.address', networkDetails.address)
      if(networkDetails.address) {
        const res = await addWalletAddress(networkDetails.address)
      }
    })()
  }, [networkDetails])

  return (<Web3Provider
      value={{
        loadWeb3,
        loading,
        setLoading,
        networkDetails,
        setNetworkDetails,
        loadBlockChainData,
        listenAccountChange,
        listenNetworkChange,
        handleConnect,
        resetApp,
      }}
    >
      
      <AppRoutes />
      <ToastContainer />
    </Web3Provider>)
}

export default App;
