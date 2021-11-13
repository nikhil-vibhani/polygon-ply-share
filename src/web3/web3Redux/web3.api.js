// import axios from "axios";
// import { Toast } from "../../../helpers/Toast";
import { web3Actions } from "./web3.actions";

export const setWalletAccountAsync = (walletAddress) => {
    return async (dispatch, getState) => {
        try {
            dispatch(web3Actions.setWalletAccountStart(walletAddress))
            let baseUrl = getState().auth.url.BASE_URL;
            let userToken = getState().auth.user.usr_jwt
        } catch (error) {
            dispatch(web3Actions.setWalletAccountError());
        }
    }
}

export const launchSaleAsync = (saleId) => {
    return async (dispatch, getState) => {
        try {
            dispatch(web3Actions.launchSaleStart())
            let baseUrl = getState().auth.url.BASE_URL;
            let userToken = getState().auth.user.usr_jwt
            
        } catch (error) {
            dispatch(web3Actions.launchSaleError());
            // Toast.fire({
            //     icon: "error",
            //     title: "Error occured while launching sale"
            // })
        }
    }
}


export const getNFTAddressesAsync = () => {
    return async (dispatch, getState) => {
       
    }
}
