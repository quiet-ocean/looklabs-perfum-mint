import React, { useState } from 'react'
import {
    HStack,
    VStack,
    Box,    
    Flex,
    Container,
    Button,
    Text,
} from '@chakra-ui/react'
import { TextInput } from '../../components'
import { initialProduct, products, useAppState } from '../../state'
import { ProductProps } from '../../types'
import { api } from '../../utils/api'

const AddProduct: React.FC = () => {
    const { contract } = useAppState()
    const [product, setProduct] = useState(initialProduct) 
    const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        // setProduct({[e.target.name]: e.target.value})
        let key: string = e.target?.name || ''
        let value: string = e.target?.value || ''
        console.log(key, value)
        setProduct({...product, [key]: value})
    }
    let addProducts = async () => {
        let length = products.length
        for(let i = 0; i < length; i++) {
            await addProduct(products[i])
        }
    }
    let addProduct = async (product: ProductProps) => {
        let tokenId = await contract?.addProduct(
                product.name,
                product.price,
                product.qty,
                product.type,
                product.category,
                product.sale,
                product.url
            )
        api.post('/add-product', { ...product, tokenId })
        .then(res => {

        })
        .catch(err => {
            console.log(err)
        })
    }
    return (
        <>
            <Flex h='full' flexDirection={{base: 'column', md: 'row'}}>
                <Box p='40px' w='full'>
                    <VStack w='full'>
                        <Box w='full'>
                            <TextInput
                            name='name'                            
                            value={product.name}
                            style={{border: '1px solid white'}} 
                            color='white'
                            onChange={handleClick}
                            placeholder='Name'
                            />
                        </Box>
                        <Box w='full'>
                            <TextInput
                            name='type'                            
                            value={product.type}
                            style={{border: '1px solid white'}} 
                            color='white'
                            onChange={handleClick}
                            placeholder='Type'
                            />
                        </Box>
                        <Box w='full'>
                            <TextInput
                            name='price'                            
                            value={product.price}
                            style={{border: '1px solid white'}} 
                            color='white'
                            onChange={handleClick}
                            placeholder='Price'
                            />
                        </Box>
                        <Box w='full'>
                            <TextInput
                            name='mediaUrl'                            
                            value={product.mediaUrl}
                            style={{border: '1px solid white'}} 
                            color='white'
                            onChange={handleClick}
                            placeholder='Media Url'
                            />
                        </Box>
                        <Box w='full'>
                            <TextInput
                            name='qty'                            
                            value={product.qty}
                            style={{border: '1px solid white'}} 
                            color='white'
                            onChange={handleClick}
                            placeholder='Quantity'
                            />
                        </Box>
                        <Box w='full'>
                            <TextInput
                            name='description'                            
                            value={product.description}
                            style={{border: '1px solid white'}} 
                            color='white'
                            onChange={handleClick}
                            placeholder='Description'
                            />
                        </Box>
                        <Box w='full'>
                            <TextInput
                            name='category'                            
                            value={product.category}
                            style={{border: '1px solid white'}} 
                            color='white'
                            onChange={handleClick}
                            placeholder='category'
                            />
                        </Box>
                    </VStack>
                </Box>
                <Box p='40px' w='full' borderLeft={{base: '', md: '1px solid white'}}>
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
                        onClick = { () => addProduct(product) }
                    >
                        <Text>add a product</Text>
                    </Button>
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
                        onClick = { () => addProducts() }
                    >
                        <Text>add default products</Text>
                    </Button>
                </Box>
            </Flex>
        </>
    )
}

export { AddProduct }