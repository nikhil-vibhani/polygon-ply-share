import React, {useState} from 'react'
import { Button, InputGroup, Modal } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'

export const StakeModal = (props) => {
    const [getBund, setBund] = useState(35000)
    const onClickToBund = (e) => {
        e.preventDefault()
        if(getBund) {
            props.onClickToStackPay(getBund)
        } else {
            toast.error('Bund is Required!')
        }
    }
    
    return <Modal show={props.showStake} onHide={props.handleCloseStake} centered>
        <Modal.Header closeButton>
            <div>
                <div className="ffTitle fs-20px fw-600 pt-3">How much do you<br /> want to stake?</div>
            </div>
        </Modal.Header>
        <Modal.Body>
            <form>
                <div class="custom_range">
                    <div class="fs-16px">Stake Baked Tokens</div>
                    <InputGroup className="mb-3">
                        <input type="number" min="25000" max={props.balance} value={getBund} onChange={(e) => setBund(e.target.value)} class="form-control" />
                        {/* <InputGroup.Text>40%</InputGroup.Text> */}
                    </InputGroup>
                    <input type="range" min="25000" max={props.balance} value={getBund} onChange={(e) => setBund(e.target.value)} className="w-100" />
                </div>
                <div class="mt-5">
                    <button class="btn-stake btn w-100" onClick={onClickToBund}><span>Stake {getBund} BAKED</span></button>
                </div>
            </form>
        </Modal.Body>
    </Modal >
}