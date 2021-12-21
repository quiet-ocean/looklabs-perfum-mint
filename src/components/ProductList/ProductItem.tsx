// @ts-nocheck
import React, {
  // MouseEvent,
  useState,
  useCallback,
  useEffect,
  useRef,
  Suspense,
  useContext,
} from 'react'
import { useHistory } from 'react-router-dom'
import { utils, BigNumber } from 'ethers'
import ReactPlayer from 'react-player'
import { Canvas } from '@react-three/fiber'
import {
  Environment,
  Html,
  OrbitControls,
  PerspectiveCamera,
  useProgress,
} from '@react-three/drei'
import Model from '../Voxel/Model'
import { CartNotification } from '../CartNotification'
// import axios from 'axios'
import { CartItemProps, ProductProps, StyleProps } from '../../types'
import { Context } from '../../state'
import { useAppState } from '../../state'
import { api } from '../../utils/api'

import {
  Container,
  Heading,
  VStack,
  HStack,
  Box,
  Button,
  Text,
  Input,
  Flex,
  useToast,
  SimpleGrid,
  keyframes,
  Image,
} from '@chakra-ui/react'
import { isEmpty } from '../../utils'
import env from '../../config'
import parse from 'html-react-parser'

const hoodieAnimationUris = {
  'ver1': '/static/movies/hoodie_v1.mov',
  'ver2': '/static/movies/hoodie_v2.mov',
}

const ProductItem = ({ product, setLoading }: {ProductProps, any}) => {
  const {
    boughtTokens,
    cyberName,
    setCyberName,
    labelExist,
    user,
    checkout,
  } = useAppState()
  const productPrice = Number(utils.formatEther(product.price))
  // const [order, setOrder] = useState<OrderProps>({
  //   qty: 1,
  //   productPrice: tokenPrice,
  // });
  const [input, setInput] = useState('')
  const [count, setCount] = useState(1)
  const toast = useToast()
  const { state, dispatch, productDispatch } = useContext(Context)
  const [isCyber, setIsCyber] = useState(false)
  const [isHoodie, setIsHoodie] = useState(false)

  const cyberSupply = product.qty
  const maxUnits = product.maxUnits

  const history = useHistory()
  const ref = useRef(null)
  let canvasWidht

  const updateSupply = useAppState(
    useCallback(({ getSupply }) => getSupply, []),
  )

  useEffect(() => {

    let _isCyber = product.type === 1 ? true : false
    let _isHoodie = product.type === 2 ? true : false

    setIsHoodie(_isHoodie)
    setIsCyber(_isCyber)
  }, [])

  useEffect(() => {
    updateSupply()
  }, [updateSupply])

  let gotoCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    toast.closeAll()
    history.push('/cart')
  }

  let checkLabelExist = async (label: string) => {
    const response = await api.get(`/label?name=${label}`)
    console.log(response)
    return response.data.exist
  }
  let addLabel = async (label: string, id: number) => {
    const ADDED = 1
    const MINTED = 2
    if (isEmpty(label)) {
      
      console.log('label is empty')
      return
    }
    let data = {
      name: label,
      address: user?.address,
      productId: id,
      type: ADDED,
    }
    console.log('add label with param', data)
    const response = await api.post(`/label`, data)
    console.log(response)
    return response.data
  }
  let add2Cart = async (product, quantity) => {

    if (quantity > 0) {
      const item: CartItemProps = { product: product, quantity: quantity }
      if (isCyber) {
        if (cyberName === '' || cyberName === undefined || cyberName === null) {
          toast({
            title: 'Warning.',
            description: 'Label cannot be empty.',
            position: 'top-right',
            status: 'warning',
            duration: 5000,
            isClosable: true,
          })
          return
        }
        setLoading(true)
        let labelExist = await checkLabelExist(cyberName)
        console.log('label is ', labelExist)
        setLoading(false)
        if (labelExist) {
          // window.alert('The label already exist')
          toast({
            title: 'Warning.',
            description: 'Label already exist.',
            position: 'top-right',
            status: 'warning',
            duration: 5000,
            isClosable: true,
          })
          return
        } else {
          setLoading(true)
          console.log('add label ', cyberName)
          let productId = parseInt(product.id)
          let success = await addLabel(cyberName, productId)
          setLoading(false)
        }
      }

      let promise = new Promise((resolve) => {
        dispatch({ type: 'ADD_PRODUCT', payload: item })
        resolve(true)
      })
      let flag = await promise
      if (flag) {
        promise.then((value) => {
          toast({
            status: 'success',
            duration: 5000,
            position: 'top-right',
            isClosable: true,
            render: (props) => {
              return (
                <CartNotification
                  product={product}
                  quantity={count}
                  close={() => {
                    toast.closeAll()
                  }}
                  checkout={checkout}
                  state={state}
                  dispatch={dispatch}
                  history={history}
                  setLoading={setLoading}
                />
              )
            },
          })
        })
      }

    }
  }

  const increase = () => {
    if (count < product.qty && count < env.MAX_QTY) {
      setCount(count + 1)
    }
  }
  const decrease = () => {
    if (count > 1) {
      setCount(count - 1)
    }
  }
  
  function changeCyberName(e) {
    labelExist(true)
    const val = e.target.value
    const r = new RegExp('^[a-zA-Z0-9$#!&]+$')
    if (r.test(val) && val.length <= 5) {
      setInput(val)
      setCyberName(val)
    } else if (val.length === 0) {
      setInput('')
      setCyberName('')
    }
  }

  function Loader() {
    const { progress } = useProgress()
    return (
      <Html
        style={{
          height: '100%',
          width: '100%',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            margin: 'auto',
            width: '150px',
            left: '-50px',
            top: '-150px',
            fontSize: '16px',
            color: 'black',
          }}
        >
          {progress}% LOADED.
        </div>
      </Html>
    )
  }
  const gradient = keyframes`
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
    `

  const gradientAnimation = `${gradient} infinite 2s linear`

  return (
    <Container maxW="1600px">
      <Flex direction={{ base: 'column', md: 'row' }}>
        <Box p="40px" w={{ base: '100%', md: '50%' }}>
          <Flex bg="" h="100%" ref={ref}>
            {isCyber ? (
              <Canvas
                camera
                style={{
                  cursor: 'grab',
                  // background: "url(static/grid.png)",
                  backgroundSize: 'contain',
                  width: '100vw',
                  h: 'full',
                  maxHeight: '800px',
                  paddingTop: '30px',
                }}
              >
                <PerspectiveCamera makeDefault position={[100, 130, -125]} />
                <OrbitControls target={[0, 50, 0]} />
                <Suspense fallback={<Loader />}>
                  <Model name={{ cyberName }} position={[0, 0, 0]} zoom={0} />
                  <Environment preset="city" />
                </Suspense>
              </Canvas>
            ) : (
              <ReactPlayer
                url={product.mediaUrl}
                // url={isHoodie ? hoodieAnimationUris[state.hoodieStyle] : product.mediaUrl}
                loop={true}
                playing={true}
                muted={true}
                width="100%"
                height="100%"
              />
            )}
          </Flex>
        </Box>
        <Box
          p="40px"
          w={{ base: '100%', md: '50%' }}
          borderLeft={{ base: '0', md: '1px solid white' }}
        >
          <VStack align="stretch" spacing={0}>
            <Box>
              <Text
                color="#a5a5a5"
                fontSize="16px"
                textTransform="uppercase"
                mb="16px"
              >
                ntf & physical
              </Text>
            </Box>
            <Box>
              <Heading
                as="h2"
                fontWeight="600"
                fontSize="56px"
                mt="0"
                pt="0"
                mb="32px"
              >
                {product.name}
              </Heading>
            </Box>
            <Box>
              <Text color="white" fontSize="24px" fontWeight="600" mb="16px">
                Ξ {productPrice} + gas
              </Text>
            </Box>
            <Box>
              <Text
                color="#BABABA"
                fontSize="16"
                fontWeight="normal"
                mb="32px"
                textTransform="uppercase"
              >
                {/* TODO fix - for each product */}
                {cyberSupply} left IN stock
              </Text>
            </Box>
            <Box h="100%">
              <Box mb="39px">
                <Text>{parse(`${product.description}`)}</Text>
              </Box>
            </Box>
            <SimpleGrid flexDirection="row">
              {isCyber ? (
                <VStack w="100%" h="100%" align="stretch" mb="79px">
                  <Box w="100%">
                    <Text
                      textTransform="uppercase"
                      color="#a5a5a5"
                      fontSize="16px"
                    >
                      Name your $EDP pass
                    </Text>
                  </Box>
                  <Box w="100%">
                    <Input
                      fontFamily="Verdana"
                      borderRadius="0px"
                      p="17px"
                      h="100%"
                      textAlign="center"
                      maxLength="5"
                      textTransform="uppercase"
                      // value={input}
                      value={cyberName}
                      onChange={changeCyberName}
                      background="#191919"
                      textTransform="uppercase"
                      color="red"
                      fontSize="32px"
                      fontWeight="600"
                      letterSpacing="0.5rem"
                      _focus={
                        ({ outline: 'none' }, { border: '1px solid red' })
                      }
                      autoComplete="off"
                    />
                  </Box>
                  <SimpleGrid flexDirection="row">
                    <Flex
                      direction={{ base: 'row', md: 'row' }}
                      spacing="10px"
                      align="stretch"
                      mt="8px"
                    >
                      <Box w="100%" textAlign="left">
                        <Text color="#A5A5A5">A - Z</Text>
                      </Box>
                      <Box w="100%" textAlign="center">
                        <Text color="#A5A5A5">0 - 9</Text>
                      </Box>
                      <Box w="100%" textAlign="right">
                        <Text color="#A5A5A5">$ # * &</Text>
                      </Box>
                    </Flex>
                  </SimpleGrid>
                </VStack>
              ) : (
                ''
              )}
              {/* hoodie choose option */}
              { 
                product.type === 2
                ?
                <Box>
                  <Text
                    color="#BABABA"
                    fontSize="16"
                    fontWeight="normal"
                    mb="32px"
                    textTransform="uppercase"
                  >
                    {/* TODO fix - for each product */}
                    Colour Name:
                    <Text as="b" ml="8px">
                      Minamilistic
                    </Text>
                  </Text>
                  <HStack spacing="18px" mb="39px">
                  {
                    product.styles.map((style: StyleProps, key: number) => {
                      return <Box
                      key={key}
                      onClick={()=>{productDispatch({type: 'CHANGE_STYLE', payload: {productId: product.id, style: style}})}}
                      w="80px"
                      h="80px"
                      border={style.name === product.selectedStyle ? "1px solid red" : "1px solid white"}>
                        <Image src={style.imageUri} alt="" />
                      </Box>
                    })
                  }
                  </HStack>
                </Box>
                :
                null
              }
            {/* end of hoodie choose option */}
              <Box w="100%">
                <Text
                  textTransform="uppercase"
                  color="#a5a5a5"
                  fontSize="16px"
                  mb="8px"
                >
                  how many units to mint?
                </Text>
                <Flex direction={{ base: 'row', md: 'row' }} align="stretch">
                  <Box
                    background="linear-gradient(0deg, rgba(165, 165, 165, 0.2), rgba(165, 165, 165, 0.2)), #000000"
                    border="1px solid #A5A5A5"
                    color="#A5A5A5"
                    fontSize="32px"
                    w="100%"
                    textAlign="center"
                    border="3px solid #a5a5a5"
                    p="10px"
                    // onClick={minQty}
                    onClick={decrease}
                    cursor={'pointer'}
                    userSelect="none"
                    h="80px"
                  >
                    -
                  </Box>
                  <Box
                    w="100%"
                    textAlign="center"
                    background="#191919"
                    ml="10px"
                    mr="10px"
                    h="80px"
                  >
                    <Input
                      fontSize="32px"
                      p={{ base: '24px', md: '36px' }}
                      w={{ base: '100%', md: '150px' }}
                      h="full"
                      textAlign="center"
                      borderRadius="0px"
                      border="none"
                      // value={order.qty}
                      value={count}
                      min="1"
                      max="10"
                      readOnly
                      userSelect="none"
                      cursor={'default'}
                      color="#A5A5A5"
                      fontWeight="600"
                    />
                  </Box>
                  <Box
                    background="linear-gradient(0deg, rgba(165, 165, 165, 0.2), rgba(165, 165, 165, 0.2)), #000000"
                    border="1px solid #A5A5A5"
                    color="#A5A5A5"
                    fontSize="32px"
                    w="100%"
                    h="80px"
                    textAlign="center"
                    border="3px solid #a5a5a5"
                    p="10px"
                    // onClick={plusQty}
                    onClick={increase}
                    cursor={'pointer'}
                    userSelect="none"
                  >
                    +
                  </Box>
                </Flex>
              </Box>
            </SimpleGrid>
            <Box>
              {boughtTokens && boughtTokens?.toNumber() < cyberSupply && (
                <Box mt={{ base: '32px', md: '72px' }}>
                  <Button
                    background="linear-gradient(45deg, #fd06b1, #ef313e, #cc672a, #a4a02e, #7dd632, #60ff35)"
                    backgroundSize="150% 200%"
                    onClick={() => {
                      add2Cart(product, count)
                    }}
                    outline="none"
                    p="45px"
                    animation={gradientAnimation}
                    _focus={{ outline: 'none' }}
                    _hover={{
                      backgroundSize: '800% 800%',
                    }}
                    _active={{
                      backgroundSize: '30% 30%',
                    }}
                  >
                    <Text
                      fontSize={{ base: '12px', md: '32px' }}
                      fontFamily="monospace"
                      color=""
                    >
                      ADD TO CART
                    </Text>
                  </Button>
                  <span className="btn-preorder--glitch"></span>
                </Box>
              )}
              {/* show sold out if no tokens */}
              {boughtTokens && boughtTokens?.toNumber() === cyberSupply && (
                <h3
                  className="text-cyber"
                  style={{
                    color: 'red',
                    marginTop: '6rem',
                    fontSize: '4rem',
                    display: 'block',
                  }}
                >
                  SOLD OUT
                </h3>
              )}
            </Box>
          </VStack>
        </Box>
      </Flex>
    </Container>
  )
}

export { ProductItem }
