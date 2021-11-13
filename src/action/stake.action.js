import axios from 'axios'

const URL = process.env.REACT_APP_API_BASEPATH;

export const addWalletAddress = async (walletAddress) => {
    const body = {walletAddress}
    const res = await axios.post(`${URL}/ReBaked/v1/api/user/saveContractDetails`, body)
    return res
}

export const getWalletDetails = async (walletAddress) => {
    const res = await axios.get(`${URL}/ReBaked/v1/api/user/getContractDetails/${walletAddress}`)
    return res
}

export const updateContract = async (walletAddress) => {
    const res = await axios.put(`${URL}/ReBaked/v1/api/user/updateContractDetails/${walletAddress}`, {isApproved: 'Yes'})
    return res
}