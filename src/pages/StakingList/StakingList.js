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

const StakingList = () => {
    
    const [userData, setUserData] = useState([])
    const { networkDetails, handleConnect } = useContext(Web3Context)
    const [getInstance, setInstance] = useState();
    const [getInstancePrev, setInstancePrev] = useState();
    const [isLoading, setIsLoading] = useState(false)
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

    useEffect(() => {
        (async () => {
            if(networkDetails.address && getInstancePrev) {
                const result = await poolMethods.AllStakes(getInstancePrev, networkDetails.address)
                if(result) {
                    Promise.all(result.map(async r => {
                        const res = await poolMethods.getStakes(getInstancePrev, networkDetails.address, r )
                        let newdate = formattedDate(res[2]);
                        let calculateDate = newdate.setDate(newdate.getDate() + 30)
                        let current = formattedDate(Date.parse(new Date()))
                        console.log('Date.parse(new Date())', Date.parse(new Date()))
                        console.log('current', current)
                        const obj = {stakeId: res[0], amount: res[1], timestamp: calculateDate, date: newdate, currentTimestamp: current}
                        return obj
                    })).then(values => {
                        setUserData(values)
                    });
                }
            } else {
                setUserData([])
            }
        })()
    }, [getInstancePrev, networkDetails])

    const onClickToStackPay = async (id, amount, stakeId) => {
        if (networkDetails.address !== '') {
            setLoadingStake('unstake')
            setIsLoading(true)
            try {
                const result = await poolMethods.unstack(getInstancePrev, networkDetails.address, amount, stakeId)
                if (result) {
                    setLoadingStake('')
                    setIsLoading(false)
                }
            } catch (err) {
                setLoadingStake('')
                setIsLoading(false)
            }
        } else {
            toast.error('Please connect wallet')
        }
    }

    const onClickToVerify = async (id, stakeId) => {
        if (networkDetails.address !== '') {
            setLoadingStake('verify')
            setIsLoading(true)
            try {
                const result = await poolMethods.whiteListed(getInstancePrev, networkDetails.address, stakeId)
                if (result) {
                    setLoadingStake('')
                    setIsLoading(false)
                }
            } catch (err) {
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
                                {console.log('res.timestamp <= res.currentTimestamp', res.timestamp <= res.currentTimestamp)}
                                {getLoadingStake !== 'verify' && <button className="btn-stake btn" disabled={res.timestamp <= res.currentTimestamp} onClick={() => onClickToVerify(res._id, res.stackId)}><span className="px-4">Verify</span></button>}
                                {isLoading && <button className="btn-stake btn">Loading...</button>}
                                {getLoadingStake !== 'unstake' && <button className="btn-stake btn" disabled={res.timestamp <= res.currentTimestamp} onClick={() => onClickToStackPay(res._id, res.amount, res.stackId)}><span className="px-4">Unstake</span></button>}
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