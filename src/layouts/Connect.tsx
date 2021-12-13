import { FC, useEffect, useCallback } from 'react'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector'

// import { Text, Heading, Box } from 'theme-ui'
import useSWR from 'swr'
import { useEagerConnect, useInactiveListener } from '../hooks/web3'
import { ETHSCAN_API } from '../utils'
import { useAppState } from '../state'
import Spinner from 'react-text-spinners'
import { 
  // Container, 
  Box, 
  Heading, 
  Text
} from '@chakra-ui/react'

function getErrorMessage(error: Error) {
  console.log(error)

  if (error instanceof NoEthereumProviderError) {
    return 'No MetaMask browser extension detected. Install MetaMask or visit from a dApp browser on mobile.'
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network. Please connect to Ethereum Mainnet network"
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect
  ) {
    return 'Please authorize this website to access your Ethereum account.'
  } else {
    console.error(error)
    return 'UNKNOWN ERROR. Check the console for more details.'
  }
}

const Connect: FC = ({ children }) => {
  const { activatingConnector } = useAppState()
  const { library, chainId, account, error } = useWeb3React()

  // console.log(library, chainId, account, error)

  const { setContract, setUser } = useAppState(
    useCallback(
      ({ setContract, setUser }) => ({
        setContract,
        setUser,
      }),
      []
    )
  )

  useSWR(ETHSCAN_API)

  useEffect(() => {
    if (!chainId || !account || !library) return

    const update = async () => {
      try {
        await setContract(library, chainId)
        setUser(account)
      } catch (e) {
        console.log(e)
      }
    }

    update()
  }, [chainId, account, library, setContract, setUser])

  const triedEager = useEagerConnect()
  useInactiveListener(!triedEager || !!activatingConnector)

  return (
    <>
      {error ? (
        <Box sx={{ marginTop: '10rem', padding: '0.75rem' }}>
          <Heading as="h2" className="text-cw" sx={{color: 'red', textAlign: 'center'}}>
            {' '}
            <div style={{ position: 'relative', bottom: '-1px', display: 'inline-block' }}>
              <Spinner
                theme="plus"
                className="text-cyber"
                backgroundColor="none"
                size="2rem"
                color="red"
              />
            </div>{' '}
            ERROR
          </Heading>
          <Text sx={{ mt: 3, marginTop: '3rem', display: 'block', lineHeight: '2rem'}} className="text-cw">&gt;&nbsp;{getErrorMessage(error)}</Text>
        </Box>
      ) : (
        children
      )}
    </>
  )
}

export { Connect }
