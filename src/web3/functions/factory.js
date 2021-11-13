import { enviornment } from "../../constants/constants";
// import { addPackageAsync } from '../../modules/createnewproject/createProjectRedux/createProject.api';

// import { createInvestmentOnChainAsync, getProjectByIdAsync, offerStatusChangeByInvestorAsync, statusChangeByProjectCreatorAsync } from "../../modules/product/productRedux/product.api";
import { launchSaleAsync } from "../web3Redux/web3.api";

function getInstance(web3) {
    
    return new Promise(async (resolve, reject) => {
        if (web3 && web3 != '') {
            try {
                let Instance = await new web3.eth.Contract(
                    enviornment.ERC20ABI,
                    enviornment.ERC20Address
                );
                
                if (Instance) {
                    resolve(Instance);
                } else {
                    reject({ error: "Issue with instance" });
                }
            } catch (error) {
                reject(error);
            }
        }
    });
};

function getBackedInstance(web3) {
    
    return new Promise(async (resolve, reject) => {
        if (web3 && web3 != '') {
            console.log('dd')
            try {
                let Instance = await new web3.eth.Contract(
                    enviornment.BACKEDABI,
                    enviornment.BACKEDADDRESS
                );
                
                if (Instance) {
                    resolve(Instance);
                } else {
                    reject({ error: "Issue with instance" });
                }
            } catch (error) {
                reject(error);
            }
        }
    });
};

function getPullAmount(ercInstance, walletAddress) {
    return new Promise(async (resolve, reject) => {
        try {
            return await ercInstance.methods
                .totalSupply()
                .call({ from: walletAddress }, (err, data) => {

                    if (err) {
                        reject({ error: err});
                    } else {
                        if (data > 0) {
                            resolve(parseFloat(data));
                        } else {
                            resolve(data)
                        }
                    }

                });
        } catch (error) {
            reject(error);
        }
    });
};

function approve(ercInstance, walletAddress, data) {
    return new Promise(async (resolve, reject) => {
        try {
            return await ercInstance.methods
                .approve(enviornment.ERC20Address, "60000000000000000000000000")
                .send({ from: walletAddress })
                .on("receipt", function (receipt) {
                    resolve(receipt);
                })
                .on("error", function (error, receipt) {
                    reject({ error: error });
                });
        } catch (error) {
            console.log("error11", error)
            reject(error);
        }
    });
}

function stack(ercInstance, walletAddress, uId, amount) {
    return new Promise(async (resolve, reject) => {
        try {
            return await ercInstance.methods
                .stake(uId, amount)
                .send({ from: walletAddress })
                .on("receipt", function (receipt) {
                    resolve(receipt);
                })
                .on("error", function (error, receipt) {
                    reject({ error: error });
                });
        } catch (error) {
            console.log("error11", error)
            reject(error);
        }
    });
}

function unstack(ercInstance, walletAddress, amount, stakeId) {
    return new Promise(async (resolve, reject) => {
        try {
            return await ercInstance.methods
                .withdraw(parseInt(stakeId), amount)
                .send({ from: walletAddress })
                .on("receipt", function (receipt) {
                    resolve(receipt);
                })
                .on("error", function (error, receipt) {
                    reject({ error: error });
                });
        } catch (error) {
            console.log("error11", error)
            reject(error);
        }
    });
}

function whiteListed(ercInstance, walletAddress, stakeId) {
    return new Promise(async (resolve, reject) => {
        try {
            
            return await ercInstance.methods
                .whiteListed(parseInt(stakeId))
                .send({ from: walletAddress })
                .on("receipt", function (receipt) {
                    resolve(receipt);
                })
                .on("error", function (error, receipt) {
                    reject({ error: error });
                });
        } catch (error) {
            console.log("error11", error)
            reject(error);
        }
    });
}

function AllStakes(ercInstance, walletAddress) {
    return new Promise(async (resolve, reject) => {
        try {
            return await ercInstance.methods
                .AllStakes(walletAddress)
                .call({ from: walletAddress }, (err, data) => {
                    if (err) {
                        reject({ error: err});
                    } else {
                        resolve(data)
                    }
                });
        } catch (error) {
            console.log("error11", error)
            reject(error);
        }
    });
}

function getBackedBalance(ercInstance, walletAddress, stakeId) {
    return new Promise(async (resolve, reject) => {
        try {
            return await ercInstance.methods
                .balanceOf(walletAddress)
                .call({ from: walletAddress }, (err, data) => {
                    if (err) {
                        reject({ error: err});
                    } else {
                        resolve(data/enviornment.divideValue)
                    }
                });
        } catch (error) {
            console.log("error11", error)
            reject(error);
        }
    });
}

function getBackedDuration(ercInstance, walletAddress, stakeId) {
    return new Promise(async (resolve, reject) => {
        try {
            return await ercInstance.methods
                .duration()
                .call({ from: walletAddress }, (err, data) => {
                    if (err) {
                        reject({ error: err});
                    } else {
                        resolve(data)
                    }
                });
        } catch (error) {
            console.log("error11", error)
            reject(error);
        }
    });
}

function getStakes(ercInstance, walletAddress, stakeId) {
    return new Promise(async (resolve, reject) => {
        try {
            return await ercInstance.methods
                .getStakes(stakeId)
                .call({ from: walletAddress }, (err, data) => {
                    if (err) {
                        reject({ error: err});
                    } else {
                        resolve(data)
                    }
                });
        } catch (error) {
            console.log("error11", error)
            reject(error);
        }
    });
}

export const poolMethods = {
    getInstance,
    getBackedInstance,
    getPullAmount,
    stack,
    unstack,
    approve,
    whiteListed,
    AllStakes,
    getStakes,
    getBackedBalance,
    getBackedDuration
}