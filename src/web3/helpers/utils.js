import supportedChains from "./chains";
export function ellipseAddress(address) {
  const width = 6;
  return `${address.slice(0, width)}...${address.slice(-4)}`;
}

export function getChainData(chainId) {
  console.log('supportedChains', supportedChains)
  const chainData = supportedChains.filter(
    (chain) => {
      console.log('chain.chain_id', chain.chain_id)
      console.log('chainId', chainId)
      return chain.chain_id === chainId
    }
  )[0];

  if (!chainData) {
    return { isChainValid: false };
  }
  chainData.isChainValid = true;
  return chainData;
}
