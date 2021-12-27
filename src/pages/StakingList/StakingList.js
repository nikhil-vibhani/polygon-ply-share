import React, { useContext, useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { StakeModal } from './StakeModal';
import axios from 'axios'
import moment from 'moment'
import IconStaking from "../../assets/images/icon.svg"
import Union from "../../assets/images/Union.png"
import { Web3Context } from '../../web3/contexts/web3Context'
import { poolMethods } from '../../web3/functions/factory'
import { ToastContainer, toast } from 'react-toastify'
import {formattedDate, dateFormate} from '../../utils/utils'
import { getAllStake } from '../../action/stake.action'

const StakingList = () => {
    
    const [userData, setUserData] = useState([])
    const { networkDetails, handleConnect } = useContext(Web3Context)
    const [getInstance, setInstance] = useState();
    const [getInstancePrev, setInstancePrev] = useState();
    const [isLoading, setIsLoading] = useState(false)
    const [isIndex, setIndex] = useState('')
    const [getLoadingStake, setLoadingStake] = useState('')

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
    }, [networkDetails]);

    const onHandleStake = async () => {
        if(networkDetails.address && getInstancePrev) {
            const result = await poolMethods.AllStakes(getInstancePrev, networkDetails.address)
            if(result) {
                // const stakeResult = await getAllStake(networkDetails.address)
                Promise.all(result.map(async (r, i) => {
                    const res = await poolMethods.getStakes(getInstancePrev, networkDetails.address, r)
                    const iswhitelisted = await poolMethods.iswhitelisted(getInstancePrev, networkDetails.address, res[0])
                    // const iswhitelisted = await poolMethods.iswhitelisted(getInstancePrev, networkDetails.address, res[0])
                    // const stakeObj = stakeResult.data.responseData.find(re => re.stakeId === res[0])
                    let newdate = formattedDate(res[2]);
                    let date = formattedDate(res[2])
                    const timeStamp = new Date(date.setDate(date.getDate() + 30));
                    // const timeStamp = new Date(date.getTime() + 3   *60000)
                    const isUnstake = res[5]
                    // console.log(i, 'isUnstake', isUnstake, 'iswhitelisted', iswhitelisted, !iswhitelisted && !isUnstake)
                    const obj = {stakeId: res[0], isUnstake, iswhitelisted, amount: res[1], timestamp: Date.parse(timeStamp), date: newdate, currentTimestamp: Date.parse(new Date())}
                    return obj
                })).then(values => {
                    setIsLoading(false)
                    setUserData(values)
                });
            }
        } else {
            setIsLoading(false)
            setUserData([])
        }
    }

    useEffect(() => {
        onHandleStake()
    }, [getInstancePrev, networkDetails])

    const onClickToStackPay = async (index, id, amount, stakeId) => {
        if (networkDetails.address !== '') {
            setLoadingStake('unstake')
            setIsLoading(true)
            setIndex(index)
            try {
                const result = await poolMethods.unstack(getInstancePrev, networkDetails.address, amount, stakeId)
                if (result) {
                    onHandleStake()
                    setIndex('')
                    setLoadingStake('')
                }
            } catch (err) {
                setIndex('')
                setLoadingStake('')
                setIsLoading(false)
            }
        } else {
            toast.error('Please connect wallet')
        }
    }

    const onClickToVerify = async (index, id, stakeId) => {
        if (networkDetails.address !== '') {
            setLoadingStake('verify')
            setIsLoading(true)
            setIndex(index)
            try {
                const result = await poolMethods.whiteListed(getInstancePrev, networkDetails.address, stakeId)
                if (result) {
                    onHandleStake()
                    setIndex('')
                    setLoadingStake('')
                }
            } catch (err) {
                setIndex('')
                setLoadingStake('')
                setIsLoading(false)
            }
        } else {
            toast.error('Please connect wallet')
        }
    }

    return (<><Container>
        <Table>
            <thead>
            <tr>
                <th>Staking List</th>
                <th>Amount</th>
                <th>Timestamp</th>
                <th>Verify Eligibility</th>
            </tr>
            </thead>
            <tbody>
                {userData && userData.map((res, ind) => {
                    return (
                        <tr key={ind + 1}>
                            <td>{res.stakeId}</td>
                            <td>{res.amount}</td>
                            <td>{dateFormate(res.date)}</td>
                            <td>
                                {/* {console.log('res.currentTimestamp >= res.timestamp && !res.iswhitelisted', ind, res.currentTimestamp >= res.timestamp, res.iswhitelisted)} */}
                                {isIndex!==ind && <button className="btn-stake btn" disabled={res.currentTimestamp < res.timestamp} onClick={() => onClickToVerify(ind, res._id, res.stakeId)}><span className="px-4">Verify</span></button>}
                                {isIndex===ind && getLoadingStake!=='verify' && <button className="btn-stake btn" disabled={res.currentTimestamp < res.timestamp} onClick={() => onClickToVerify(ind, res._id, res.stakeId)}><span className="px-4">Verify</span></button>}
                                {/* {isIndex!==ind && <button className="btn-stake btn" disabled={res.timestamp <= res.currentTimestamp} onClick={() => onClickToVerify(ind, res._id, res.stakeId)}><span className="px-4">Verify</span></button>} */}
                                {isLoading && isIndex===ind && <button className="btn-stake btn">Loading...</button>}
                                {isIndex===ind && getLoadingStake!=='unstake' && res.currentTimestamp < res.timestamp && !res.iswhitelisted && <button className="btn-stake btn" disabled={true} onClick={() => onClickToStackPay(ind, res._id, res.amount, res.stakeId)}><span className="px-4">Unstake</span></button>}
                                {isIndex!==ind && res.currentTimestamp < res.timestamp && !res.iswhitelisted && <button className="btn-stake btn" disabled={true} onClick={() => onClickToStackPay(ind, res._id, res.amount, res.stakeId)}><span className="px-4">Unstake</span></button>}
                                {isIndex===ind && getLoadingStake!=='unstake' && res.currentTimestamp < res.timestamp && res.iswhitelisted && <button className="btn-stake btn" disabled={res.isUnstake} onClick={() => onClickToStackPay(ind, res._id, res.amount, res.stakeId)}><span className="px-4">Unstake</span></button>}
                                {isIndex!==ind && res.currentTimestamp < res.timestamp && res.iswhitelisted && <button className="btn-stake btn" disabled={!res.isUnstake} onClick={() => onClickToStackPay(ind, res._id, res.amount, res.stakeId)}><span className="px-4">Unstake</span></button>}
                                {isIndex===ind && getLoadingStake!=='unstake' && res.currentTimestamp >= res.timestamp && <button className="btn-stake btn" disabled={true} onClick={() => onClickToStackPay(ind, res._id, res.amount, res.stakeId)}><span className="px-4">Unstake</span></button>}
                                {isIndex!==ind && res.currentTimestamp >= res.timestamp && <button className="btn-stake btn" disabled={true} onClick={() => onClickToStackPay(ind, res._id, res.amount, res.stakeId)}><span className="px-4">Unstake</span></button>}
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
        </Container>
        </>)
}
export default StakingList