import { useEffect } from "react";
import useSWR from "swr"

const NETWORKS ={
  1 : "Ethereum Main Network",
  3 : "Ropsten Test Network",
  42 : "Kovan Test Network",
  56 : "Binance Smart Chain",
  1337 : "Ganache"
}

export const handler = (web3, provider) => () => {

  const {mutate, ...rest} = useSWR(()=>
    web3 ? "web3/network": null,
    async () => {
      const chainId = web3.eth.getChainId()
      return NETWORKS[netId];
    }
  )
  useEffect(() => {
    provider &&
    provider.on("chainChanged", chanId => {
      mutate(NETWORKS[parseInt(chanId,16)])
    })
  }, [web3])

  return {
    network: {
      mutate,
      ...rest
    }
  }
}