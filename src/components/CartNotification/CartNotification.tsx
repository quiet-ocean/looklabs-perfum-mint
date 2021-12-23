import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { utils, BigNumber } from 'ethers'
import { CartMenuItem } from './CartMenuItem'
import {
    VStack, Box, HStack, Text, Button, useToast,
} from '@chakra-ui/react'
import { useAppState } from '../../state'
import { Context } from '../../state'
import { CartItemProps, CartProps, ProductProps } from '../../types'
import { initialCartState } from '../../state/constants'
import env from '../../config/index'

const CartNotification = (props: any) => {

    const { product, quantity, close, checkout, __state, history, dispatch, _checkoutProducts } = props
    
    const toast = useToast()
    const [_state, setState] = useState<any>(initialCartState)
    const [loading, setLoading] = useState<boolean>(false)
    const { state } = useContext(Context)
    console.log(state)

    useEffect(() => {

        let effect = async () => {

            let state = __state
            let calculateTotalPrice = (items: CartItemProps[]): BigNumber => {
                let total: BigNumber = BigNumber.from('0')
                items.forEach((item: CartItemProps)=>{
                    total = total.add(item.product?.price.mul(item.quantity))
                })
                return total
            }
            let min = (items: number[]): number => {
                let min: number = 0

                if(items.length === 0)
                    return min
                
                min = items[0]
                let length: number = items.length
                for(let i = 0; i < length; i++ ){
                    min = min > items[i] ? items[i] : min
                }

                return min;
            }
            let promise = new Promise(resolve => {
                
                // let product: ProductProps = payload.product
                let id: BigNumber = product.id
                let addQuantity: number = quantity
                addQuantity = min([addQuantity, product.qty, env.MAX_QTY])
                let price: BigNumber = BigNumber.from('0')
                let _newItems: CartItemProps[] = []
                let newTotal: BigNumber = BigNumber.from('0')
                let exist: boolean = false

                let addItem = () => {
                    
                    state.items.forEach((item: CartItemProps) => {
                        let _quantity: number = 0
                        let _product: ProductProps = item.product
                        if(item.product.id.eq(id)) {
                            exist = true
                            _quantity = addQuantity + item.quantity
                            _quantity = min([_quantity, item.product.qty, env.MAX_QTY])
                            _product = product
                        } else {
                            _quantity = item.quantity
                        }
                        _newItems.push({product: _product, quantity: _quantity})
                    })
                    if(!exist) {
                        price = product.price.mul(BigNumber.from(addQuantity))
                        newTotal = newTotal.add(price)
                        _newItems.push({product: product, quantity: addQuantity})
                    }
                }
                addItem()
                let _total: BigNumber = calculateTotalPrice(_newItems)
                resolve({
                    ...state,
                    total: _total,
                    items: _newItems,
                    ids: exist ? state.ids : [...state.ids, id],
                })
            })
            let newState = await promise
            setState(newState)
        }
        
        effect()

    }, [__state])
    let checkoutProducts = () => {
        checkout(_state, toast, history, dispatch, setLoading, true)
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
                    <Box><Text color='white'>ETH {Number(utils.formatEther(_state.total))}</Text></Box>
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