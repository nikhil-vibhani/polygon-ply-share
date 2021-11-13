import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Row, Container } from 'react-bootstrap';
import ToggleSwitch from '../../Components/ToggleSwitch';
import shortid from 'shortid';

import IconStaking from "../../assets/images/icon.svg"
import Union from "../../assets/images/Union.png"
import { Web3Context } from '../../web3/contexts/web3Context'
import { poolMethods } from '../../web3/functions/factory'
import { ToastContainer, toast } from 'react-toastify'
import { StakeModal } from './StakeModal';
import {getWalletDetails, updateContract} from '../../action/stake.action'
import {dayHourMinuteFormate} from '../../utils/utils'

const Staking = () => {
    const { networkDetails, handleConnect } = useContext(Web3Context)
    const [getInstance, setInstance] = useState();
    const [getInstancePrev, setInstancePrev] = useState();
    const [status, setStatus] = useState(false)
    const [getLoadingStackBtn, setLoadingStackBtn] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [poolBalance, setPoolBalance] = useState(0.00)
    const [bakedBalance, setBakedBalance] = useState(0.00)
    const [showStake, setShowStake] = useState(false)
    const [stackCount, setStackCount] = useState(localStorage.stackCount || 0)
    const [duration, setDuration] = useState(0)
    
    useEffect(() => {
        (async () => {
          const instance = await poolMethods.getBackedInstance(networkDetails.web3)
          const instanceP = await poolMethods.getInstance(networkDetails.web3)
          if(instance) {
            setInstance(instance);
          }
          if(instanceP) {
            localStorage.setItem("stackCount", localStorage.stackCount?parseInt(localStorage.stackCount):0);
            setInstancePrev(instanceP);
          }
        })()
        if(!networkDetails.connected) {
            setBakedBalance(0)
            setPoolBalance(0)
        }
    }, [networkDetails]);

    useEffect(() => {
        if(getInstancePrev) {
            getPoolAmount()
            getBackedBalance()
        }
    }, [getInstancePrev])

    useEffect(() => {
        if(getInstance) {
            getBackedBalance()
            getBackedDuration()
        }
    }, [getInstance])

    useEffect(() => {
        if(getInstance) {
            getBackedBalance()
        }
    }, [getInstance])

    
    const getBackedDuration = async () => {
        if(getInstancePrev) {
            const result = await poolMethods.getBackedDuration(getInstancePrev, networkDetails.address)
            const formatted = dayHourMinuteFormate(result);
            setDuration(formatted)
        }
    }

    const getPoolAmount = async () => {
        if(getInstancePrev) {
            const result = await poolMethods.getPullAmount(getInstancePrev, networkDetails.address)
            setPoolBalance(result)
        }
    }

    const getBackedBalance = async () => {
        if(getInstancePrev) {
            const result = await poolMethods.getBackedBalance(getInstance, networkDetails.address)
            setBakedBalance(result)
        }
    }

    const onClickToApprove = async () => {
        if (networkDetails.address !== '') {
            setIsLoading(true)
            try {
                const result = await poolMethods.approve(getInstance, networkDetails.address)
                if (result) {
                    await updateContract(networkDetails.address)
                    getWallet()
                    setIsLoading(false)
                }
            } catch (err) {
                setIsLoading(false)
            }
        } else {
            toast.error('Please connect wallet')
        }
    }

    useEffect(() => {
        getWallet()
        getBackedDuration()
    }, [networkDetails, getInstancePrev])

    const getWallet = async () => {
        if(networkDetails.address) {
            const res = await getWalletDetails(networkDetails.address)
            if(res.data.responseCode === 200) {
                if(res.data.responseData.isApproved === 'Yes') {
                    setStatus(true)
                }
            }
        }
    }

    const onClickToStackPay = async (amount) => {
        if(parseInt(amount) <= bakedBalance) {
            setShowStake(false)
            if (networkDetails.address !== '') {
                setIsLoading(true)
                try {
                    var timestamp = Date.parse(new Date())
                    const result = await poolMethods.stack(getInstancePrev, networkDetails.address, timestamp, amount)
                    if (result) {
                        getPoolAmount()
                        setStackCount(parseInt(stackCount) + 1)
                        localStorage.setItem("stackCount", parseInt(stackCount) + 1);
                        setIsLoading(false)
                    }
                } catch (err) {
                    setIsLoading(false)
                }
            } else {
                toast.error('Please connect wallet')
            }
        } else {
            toast.error(`You don't have sufficient amount`)
        }
    }

    const onClickToStack = async (status) => {
        setShowStake(true)
    }

    const handleCloseStake = () => {
        setShowStake(false)
    }

    return (<>
        <Container>
            {/* <div className="re_search">
                <input text="text" placeholder="Search Pool Name" />
            </div> */}
            {/* <div className="d-flex align-items-center fs-16px fs-xxl-18px fw-500 text-white mt-4 mb-5 justify-content-center"><span className="pr-2">My Staking Pools</span><ToggleSwitch /></div> */}
            <Row className="justify-content-center">
                <Col md={6} lg={4} xl={3} className="mb-4">
                    <div className="re_stakingPoolBox">
                        <div className="re_imgBox">
                            <img src={Union} alt="" />
                        </div>
                        <div className="d-flex align-items-start py-3 ">
                            <img src={IconStaking} alt="" className="re_icon" />
                            <div className="pl-2">
                                <div className="fs-xxl-24px fs-18px text-white ffTitle fw-900">ReBaked Pool</div>
                                {/* <div className="fs-xxl-16px fs-14px text-white fw-300">With IDO</div> */}
                            </div>
                        </div>
                        <div className="border_gradiant" />
                        <Row className="align-items-center py-1">
                            <Col xs={5} className="fs-xxl-16px fs-14px text-white opacity-70 ">Your Baked Balance</Col>
                            <Col xs={7} className="text-right fs-xxl-20px fs-18px fw-600 text-white">{bakedBalance}</Col>
                        </Row>
                        <div className="d-flex align-items-start py-3 ">
                            <img src={IconStaking} alt="" className="re_icon" />
                            <div className="pl-2">
                                <div className="fs-xxl-24px fs-18px text-white ffTitle fw-900">Staking Pool</div>
                                {/* <div className="fs-xxl-16px fs-14px text-white fw-300">With IDO</div> */}
                            </div>
                        </div>
                        <div className="border_gradiant" />
                        <Row className="align-items-center py-1">
                            <Col xs={5} className="fs-xxl-16px fs-14px text-white opacity-70 ">Total Pool Amount</Col>
                            <Col xs={7} className="text-right fs-xxl-20px fs-18px fw-600 text-white">{poolBalance}</Col>
                        </Row>
                        <Row className="align-items-center py-1">
                            <Col xs={5} className="fs-xxl-16px fs-14px text-white opacity-70 ">Min Amount Would Be Staked Amount</Col>
                            <Col xs={7} className="text-right fs-xxl-20px fs-18px fw-600 text-white">25000 BAKED</Col>
                        </Row>
                        <Row className="align-items-center py-1">
                            <Col xs={5} className="fs-xxl-16px fs-14px text-white opacity-70 ">Loking Period</Col>
                            <Col xs={7} className="text-right fs-xxl-20px fs-18px fw-600 text-white">{duration}</Col>
                        </Row>
                        {/* {getLoadingStackBtn !== 'unstack' && parseInt(stackCount) > 0 && <Button variant="stake" className="w-100 mt-3" disabled={isLoading} onClick={() => onClickToStack('unstack')}><span>Unstake</span></Button>} */}
                        {isLoading && <Button variant="stake" className="w-100 mt-3"><span>Loading...</span></Button>}
                        {status && !isLoading && <Button variant="stake" disabled={isLoading} className="w-100 mt-3" onClick={() => onClickToStack('stack')}><span>Stake</span></Button>}
                        {!status && !isLoading && <Button variant="stake" className="w-100 mt-3" onClick={onClickToApprove}><span>Approve</span></Button>}
                    </div>
                </Col>
            </Row>
        </Container>
        <StakeModal showStake={showStake} onClickToStackPay={onClickToStackPay} balance={bakedBalance} handleCloseStake={handleCloseStake} />
    </>)
}
export default Staking