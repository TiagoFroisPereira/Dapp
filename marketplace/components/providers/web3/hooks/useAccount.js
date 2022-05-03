import { useEffect } from "react"
import useSWR from "swr"

const adminAddress ={
  "0x2e21c8589059501fa3a14c320464b771ab020bae924805ebba58aeb439740394" : true
}

export const handler = (web3, provider) => () => {

  const {data, mutate, ...rest } = useSWR(() =>
    web3 ? "web3/accounts" : null,
    async () => {
      const accounts = await web3.eth.getAccounts()
      return accounts[0]
    }
  )

  useEffect(() => {
    provider &&
    provider.on("accountsChanged",
      accounts => mutate(accounts[0] ?? null)
    )
  }, [provider])

  return { 
    account: {
      data,
      isAdmin: ( 
        data && 
        adminAddress[web3.utils.keccak256(data)]) ?? false,
      mutate, 
      ...rest
    }
  }
}