import { AbstractConnector } from '@web3-react/abstract-connector'
import { useWeb3React } from '@web3-react/core'
import { ConnectorNames, connectorsByName } from '../../connectors'
import { useAppState } from '../../state'
import Spinner from 'react-text-spinners'

import {
  VStack,
  Button,
  Box,
  Text,
  Image,
  Flex,
  Heading,
  Link,
  keyframes,
} from '@chakra-ui/react'

const rotateCircle = keyframes`
from {
  -ms-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -webkit-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
}
to {
  -ms-transform: rotate(-360deg);
  -moz-transform: rotate(-360deg);
  -webkit-transform: rotate(-360deg);
  -o-transform: rotate(-360deg);
  transform: rotate(-360deg);
}
  `

const rotateLogo = keyframes`
from {
  -ms-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -webkit-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
}
to {
  -ms-transform: rotate(360deg);
  -moz-transform: rotate(360deg);
  -webkit-transform: rotate(360deg);
  -o-transform: rotate(360deg);
  transform: rotate(360deg);
}
    `

const circleRotate = `${rotateCircle} 50s linear infinite;`
const logoRotate = `${rotateLogo} 50s linear infinite;`

const iconsMap = {
  [ConnectorNames.Metamask]: 'https://docs.metamask.io/metamask-fox.svg',
  // [ConnectorNames.WalletConnect]: 'https://walletconnect.org/walletconnect-logo.svg',
}

const Login = () => {
  const { activatingConnector, setActivatingConnector } = useAppState()
  const { activate } = useWeb3React()
  // const terminal = useRef<HTMLDivElement>(null)

  return (
    <>
      <Box w="full" color="white" fontFamily="Cyber Console" height="full">
        <Flex direction={{ base: 'column', md: 'row' }} height="full">
          <Flex
            w={{ base: '100%', md: '50%' }}
            p={{ base: '20px', md: '40px' }}
            alignitem="center"
          >
            {/* DAO TOKEN HERE */}
            <Box
              alignItems="center"
              justifyContent="center"
              fontSize={{ base: '1.1rem', lg: '1.1rem' }}
              display="flex"
              flexDirection="column"
              fontWeight="bold"
              w={{ base: '100%', lg: '100%' }}
            >
              <Box
                position="relative"
                width={{ base: '100%', lg: '58%' }}
                mt="10%"
              >
                <Flex
                  position="relative"
                  width="100%"
                  height="100%"
                  top="0"
                  left="0"
                  right="0"
                  bottom="0"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Image
                    className="rotating"
                    src="/static/token.svg"
                    animation={logoRotate}
                    width="100%"
                  ></Image>
                </Flex>
                <Flex
                  position="absolute"
                  alignItems="center"
                  width="100%"
                  height="100%"
                  top="0"
                  left="0"
                  right="0"
                  bottom="0"
                  justifyContent="center"
                >
                  <Image
                    className="reverse"
                    src="/static/ring.svg"
                    width="94%"
                    animation={circleRotate}
                  ></Image>
                </Flex>
              </Box>

              <Box mt={{ base: '0rem', lg: '0rem' }}>
                <Heading
                  as="h2"
                  fontSize="72px"
                  textAlign="center"
                  mt="40px"
                  mb="40px"
                  fontWeight="600"
                  letterSpacing="0.5rem"
                >
                  8888
                </Heading>
                <Text letterSpacing="0.3rem">LOOK LABS DAO Tokens</Text>
              </Box>
            </Box>
          </Flex>
          <Box
            w={{ base: '100%', md: '50%' }}
            p="40px"
            borderLeft={{ base: 'none', md: '1px solid white' }}
            borderTop={{ base: '1px solid white', md: 'none' }}
          >
            <VStack align="stretch" h="full">
              <Box flex="10" h="full">
                <Text
                  as="h1"
                  fontSize="40px"
                  fontWeight="600"
                  color="white"
                  textTransform="uppercase"
                >
                  WELCOME TO THE ELITE DROP
                </Text>
                <Text mb="79px" mt="32px">
                  Where high-end fashion is born on blockchain.
                </Text>
                <Text
                  mb="79px"
                  mt="32px"
                  fontSize="14px"
                  color="#A5A5A5"
                  maxWidth="523px"
                  letterSpacing="3px"
                >
                  Loading cart.art... done, booting the kernel. (gcc version
                  4.8.3 20140303 (prerelease) (crosstool-NG
                  linaro-1.13.1+bzr2650 - Linaro GCC 2014.03)) #775 PREEMPT ThuR
                  [ 0.000000] CPU: ARMv6-compatible processor [410fb767]
                  revision 7 (ARMv7), cr=00c5387d [ 0.000000] CPU: PIPT / VIPT
                  nonaliasing data cache, VIPT nonaliasing instruction cache [
                  0.000000] Machine model: Raspberry Pi Model B [ 0.000000] cma:
                  Reserved 8 MiB at 0x0b800000 [ 0.000000] Memory policy: Data
                  cache writeback
                </Text>
              </Box>

              <Box flex="1">
                {Object.keys(connectorsByName).map((name: string) => {
                  const currentConnector =
                    connectorsByName[name as keyof typeof connectorsByName]
                  const activating = currentConnector === activatingConnector
                  // const connected = currentConnector === connector

                  return (
                    <Button
                      bgGradient="linear(to-tr, #fd06b1, #ef313e, #cc672a, #a4a02e, #7dd632, #60ff35)"
                      borderRadius="0px"
                      w="full"
                      fontSize={{ base: '24px', md: '36px', lg: '42px' }}
                      p="50px"
                      mb="24px"
                      _active={{ boxShadow: 'none', outline: 'none' }}
                      fontFamily="IBM Plex Mono"
                      colorScheme="red"
                      key={name}
                      onClick={() => {
                        setActivatingConnector(currentConnector)
                        activate(
                          connectorsByName[
                            name as keyof typeof connectorsByName
                          ] as AbstractConnector,
                        )
                      }}
                    >
                      {iconsMap[name as keyof typeof connectorsByName] &&
                        !activating && (
                          <>
                            <span data-text="CONNECT METAMASK">
                              CONNECT METAMASK
                            </span>
                          </>
                        )}
                      {activating && (
                        <Spinner
                          backgroundColor="none"
                          size="2rem"
                          color="black"
                          theme="triangle"
                        />
                      )}
                    </Button>
                  )
                })}
              </Box>
              <Box flex="1">
                {Object.keys(connectorsByName).map((name: string) => {
                  // const currentConnector =
                  // connectorsByName[name as keyof typeof connectorsByName];
                  // const activating = currentConnector === activatingConnector;
                  // const connected = currentConnector === connector

                  return (
                    <Button
                      background="linear-gradient(0deg, rgba(88, 101, 242, 0.2), rgba(88, 101, 242, 0.2)), #000000"
                      borderRadius="0px"
                      w="full"
                      fontSize={{ base: '24px', md: '36px', lg: '42px' }}
                      p="50px"
                      color="#5865F2"
                      border="1px solid #5865F2"
                      fontFamily="IBM Plex Mono"
                      key={name}
                      _active={{ boxShadow: 'none', outline: 'none' }}
                    >
                      <Link
                        href="https://discord.gg/looklabs"
                        isExternal
                        textDecoration="none"
                        _hover={{ textDecoration: 'none' }}
                      >
                        JOIN the DISCORD
                      </Link>
                    </Button>
                  )
                })}
              </Box>
            </VStack>
          </Box>
        </Flex>
      </Box>
    </>
  )
}

export { Login }
