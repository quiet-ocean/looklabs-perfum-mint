import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { CartMenuItem } from './CartMenuItem'
import { utils, BigNumber } from 'ethers'

import {
    VStack, Box, HStack, Text, Button, useToast,
} from '@chakra-ui/react'
import { useAppState } from '../../state'
import { Context } from '../../state'
import { CartItemProps, CartProps } from '../../types'
import { initialCartState } from '../../state/constants'

const CartNotification = (props: any) => {

    // const { product, quantity, close, checkout, state, history, setLoading } = props
    const { product, quantity, close, checkout, state, history, dispatch } = props
    // const { dispatch } = useContext(Context)
    // console.log('dispatch in cart notification is ', dispatch)
    // console.log('state in cart notification is ', state)
    // const history = useHistory()
    const toast = useToast()
    // const [_state, setState] = useState<CartProps>(initialCartState)
    const [_state, setState] = useState<any>(initialCartState)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {

        let effect = async () => {
            let promise = new Promise(resolve => {
                let id: number = BigNumber.from(product?.id).toNumber()

                let price: BigNumber = product?.price.mul(Number(quantity))
                let exist: boolean = state.ids.indexOf(id) > -1
                // console.log('prodcut is', exist ? 'exist' : 'not exist')
                // let quantity: number = (state.items[id]) ? (state.items[id]['quantity'] + payload.quantity) : payload.quantity;
                let qty: number = Number(quantity)
                let newState_1: CartProps = {
                    ...state,
                    nav: state.nav,
                    total: state.total.add(price), 
                    ids: exist ? state.ids : [...state.ids, id],
                    items: exist ? state.items.map((item: CartItemProps, key: number) => {
                        if(item.product.id == product.id) {
                            return { product: item.product, quantity: item.quantity + Number(quantity) }
                        }
                        return item
                    }) : [...state.items, { product: product, quantity: qty }] 
                }
                // console.log('add new item', newState_1)
                // return newState_1
                resolve(newState_1)
            })
            // let newState: CartProps// = await promise
            let newState = await promise
            // console.log('New state in cart notification toast', newState)
            setState(newState)
        }
        
        effect()

    }, [state])
    let checkoutProducts = () => {
        checkout(_state, toast, history, dispatch, setLoading)
        // state, toast, history, dispatch, setLoading
    }

    return (
        <VStack bg={'black'} style = {{color: 'white', border: '1px solid'}} onClick={close} >
            <Box w='full' borderBottom='1px solid #a5a5a5' p='5px'>
                <CartMenuItem product={product} quantity={quantity} />
            </Box>
            <Box w='full' borderBottom='1px solid #a5a5a5' p='5px'>
                <HStack align='stretch'>
                    <Box w='full'><Text>total:</Text></Box>
                    <Box><Text color='white'>ETH {Number(utils.formatEther(product.price)) * quantity}</Text></Box>
                </HStack>
            </Box>
            <Box p='5px' w='full'>
                <VStack w='full'>
                    <Button p='8px' bgGradient="linear(to-tr, #fd06b1, #ef313e, #cc672a, #a4a02e, #7dd632, #60ff35)" >
                        <Text color='white' onClick={() => {checkoutProducts()}}>proceed to checkout</Text>
                    </Button>
                    <Button p='8px' onClick={() => history.push('/cart')} bgGradient="linear(to-tr, #fd06b1, #ef313e, #cc672a, #a4a02e, #7dd632, #60ff35)" >
                        <Text color='white'>view cart</Text>
                    </Button>
                </VStack>
            </Box>
        </VStack>
    )
}

export { CartNotification }