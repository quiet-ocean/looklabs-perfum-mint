// import { useHistory } from 'react-router-dom'
import { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Item } from './Item'
import { Context, useAppState } from '../../state'
import { CartItemProps } from '../../types'

import { utils, BigNumber, providers  } from "ethers";


import {
    VStack, Box, HStack, Text, Button, Flex, Spacer, useToast
} from '@chakra-ui/react'

// Mock data

// const mockItem = {
//     uri: "/movies/hoodie_grid.mp4",
//     name: "CYBER EAU DE PARFUM",
//     description:
//         "Diam augue auctor aliquet tortor dui proin purus, amet. Ut pellentesque sem praesent cras adipiscing risus pellentesque non id. Risus sed vitae nisi sit. Learn more",
//     type: Math.floor(Math.random() * 4) + 1,
// };

// const mockedItems = [mockItem, mockItem, mockItem, mockItem];


const Cart = (props: any) => {

    const { checkout } = useAppState()
    const { product, quantity, setLoading, close } = props
    const [mockedItems, setMockedItems] = useState([])
    const [total, setTotal] = useState<BigNumber>(BigNumber.from(0))
    const { state } = useContext(Context)
    const { dispatch } = useContext(Context)
    const toast = useToast()
    const history = useHistory()
    

    useEffect(() => {
        setMockedItems(state.items)
        setTotal(state.total)
    }, [state])
    let deleteProduct = (id: BigNumber) => {
        console.log('deleteProduct',id)
        dispatch({type:'DELETE_PRODUCT', payload: id})
    }
    let checkoutTransfer = async () => {
        
      checkout(state, toast, history, dispatch, setLoading, true)
    };
    return (
        <VStack bg={'black'} color='white' border='1px solid white' onClick={close} >
            <Box w='full' borderBottom='1px solid #fff'>
                {(mockedItems && mockedItems.length)? mockedItems.map((item: CartItemProps, key: number) => {
                    return <Item product={item?.product} key={key} quantity={item?.quantity} deleteProduct = {deleteProduct}/>
                }) : <Text p='36px'>No product</Text>}
            </Box>
            <Box w='full' borderBottom='1px solid #fff' p='16px'>
                <Flex direction={{ base: "row", md: "row" }}>
                    <Box><Text color="#A5A5A5" textTransform="uppercase" fontWeight="500">total:</Text></Box>
                    <Spacer />
                    <Box><Text color='white' fontWeight="600" textTransform="uppercase">ETH {utils.formatEther(total)}</Text></Box>

                </Flex>
            </Box>
            <Box p='16px' w='full'>
                <VStack w='full'>
                    <Button onClick={() => { checkoutTransfer() }} p='30px' bgGradient="linear(to-tr, #fd06b1, #ef313e, #cc672a, #a4a02e, #7dd632, #60ff35)" mb="16px">
                        <Text fontWeight="600" color='white' fontSize="16px">proceed to checkout</Text>
                    </Button>
                    <Button p='30px' onClick={() => { history.push('/cart') }} border='2px solid' borderWidth="2px" background="transparent" style={{ borderImageSource: "linear-gradient(46.58deg, #FF00C7 2.22%, #60FF35 91.69%)", borderImageSlice: "1" }}>
                        <Text color='white' fontWeight="600" fontSize="16px" backgroundSize="100%" backgroundRepeat="none" backgroundClip="text" backgroundImage="linear-gradient(180deg, #ffd635 9.69%, #fe8c21 91.19%)">view cart</Text>
                    </Button>
                </VStack>
            </Box >
        </VStack >
    )
}

export { Cart }