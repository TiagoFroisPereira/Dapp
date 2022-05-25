import { useEffect } from "react"
import useSWR from "swr"

const adminAddress ={
  "0x0d79b1be11021f5a6d18a877fd07be9d7a73ba3361e280eb22b089e8f50ef2fd" : true
}

export const handler = (web3, provider) => () => {

  const {data, mutate, ...rest } = useSWR(() =>
    web3 ? "web3/accounts" : null,
    async () => {
      const accounts = await web3.eth.getAccounts()
      const account = accounts[0]

      if (!account) {
        throw new Error("Cannot retreive an account. Please refresh the browser.")
      }

      return account
    }
  )

  useEffect(() => {
    const mutator = accounts => mutate(accounts[0] ?? null)
    provider?.on("accountsChanged", mutator)
    return () => {
      provider?.removeListener("accountsChanged", mutator)
    }
  }, [provider])

  return { 
    data,
    isAdmin: ( 
      data && 
      adminAddress[web3.utils.keccak256(data)]) ?? false,
    mutate, 
    ...rest
  }
}