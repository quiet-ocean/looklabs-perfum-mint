import React, { useContext, useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { useHistory } from 'react-router-dom'
import { utils, BigNumber } from 'ethers'
// import { CartMenuItem } from './CartMenuItem'
import {
    Container, VStack, Box, HStack, Text, Button, useToast,
} from '@chakra-ui/react'
import { useAppState } from '../../state'
import { Context } from '../../state'
import { CartItemProps, CartProps, ProductProps } from '../../types'
import { initialCartState } from '../../state/constants'
import env from '../../config/index'

const ToastContent = (props: any) => {
    const { item, itemCount, history, close, toast, dispatch, setLoading, checkout } = props
    const { product, quantity } = item

    let price: string = utils.formatEther(BigNumber.from(product.price))
    const total: BigNumber = BigNumber.from(product.price).mul(BigNumber.from(quantity))
    
    let state = initialCartState
    let proceedCheckout = () => {
        if(itemCount === 4) {
            console.log('cannot proceed checkout')
            return
        }
        state = { ...state, items: [item], total: total }
        console.log(state)
        dispatch({type: 'SET_PENDING_ITEM', payload: item})
        checkout(state, toast, history, dispatch, setLoading)
        // console.log('can checkout', product)
    }

    return (
        <VStack bg={'black'} style = {{color: 'white', border: '1px solid'}} onClick={close} >
            <Box w='full' borderBottom='1px solid #a5a5a5' p='5px'>
                <Container>
                    <HStack>
                        <Box border='1px solid #a5a5a5'>
                            <Container h='75px'>
                                <ReactPlayer
                                    // url={`${item.token.media}`}
                                    // url = {`/static/${product.uri}`}
                                    url = {product.mediaUrl}
                                    loop={true}
                                    playing={true}
                                    muted={true}
                                    width="100%"
                                    height="100%"
                                />
                            </Container>
                        </Box>
                        <Box w='100%'>
                            <VStack>
                                <Box w='100%'>
                                    <Text>{product.name}</Text>
                                </Box>
                                <Box w='100%'>
                                    <HStack align='stretch'>
                                        <Box w='100%'><Text color='white'>{price}</Text></Box>
                                        <Box><Text>qty:{quantity}</Text></Box>
                                    </HStack>
                                </Box>
                                <Box w='100%'>
                                    <Text>free shipping</Text>
                                </Box>
                            </VStack>
                        </Box>
                    </HStack>
                </Container>
            </Box>
            <Box w='full' borderBottom='1px solid #a5a5a5' p='5px'>
                <HStack align='stretch'>
                    <Box w='full'><Text>total:</Text></Box>
                    <Box><Text color='white'>ETH {Number(utils.formatEther(total.toString()))}</Text></Box>
                </HStack>
            </Box>
            <Box p='5px' w='full'>
                <VStack w='full'>
                    <Button p='8px' bgGradient="linear(to-tr, #fd06b1, #ef313e, #cc672a, #a4a02e, #7dd632, #60ff35)" >
                        <Text color='white' onClick={() => {proceedCheckout()}}>proceed to checkout</Text>
                    </Button>
                    <Button p='8px' onClick={() => history.push('/cart')} bgGradient="linear(to-tr, #fd06b1, #ef313e, #cc672a, #a4a02e, #7dd632, #60ff35)" >
                        <Text color='white'>view cart</Text>
                    </Button>
                </VStack>
            </Box>
        </VStack>
    )
}

export { ToastContent }