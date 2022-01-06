import React, { useState, useRef } from 'react'
import { utils, providers } from 'ethers'
import Web3 from 'web3'
import GenesisCart from '../../contracts/build/contracts/GenesisCart.json'
import {
    HStack,
    VStack,
    Box,    
    Flex,
    Container,
    Button,
    Text,
    Input,
} from '@chakra-ui/react'
import { TextInput } from '../../components'
import { initialProduct, products, useAppState } from '../../state'
import { ProductProps, RefObject } from '../../types'
import { api } from '../../utils/api'
import { FileUpload } from '../../components/FileUpload'

const AddProduct: React.FC<{setLoading: any}> = ({setLoading}) => {

    const { contract } = useAppState()
    const [product, setProduct] = useState<ProductProps>(initialProduct)
    const ref = useRef<RefObject>(null)
    const uploadImage = async (fileName: string) => {
        console.log(ref)
        let response
        if(ref.current) {
            response = await ref.current.uploadImage(fileName)
        }
        return response
    }
    const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        // setProduct({[e.target.name]: e.target.value})
        let key: string = e.target?.name || ''
        let value: string = e.target?.value || ''
        setProduct({...product, [key]: value})
    }
    let addProducts = async () => {
        let length = products.length
        for(let i = 0; i < length; i++) {
            await addProduct(products[i])
        }
    }
    let addProduct = async (product: ProductProps) => {

        // await uploadImage('asdief0sdf882f')
        // return
        setLoading(true)
        console.log('add a product')
        
        if(contract === undefined || contract === null || !contract) {
            setLoading(false)
            console.error('contract is not defined')
            return
        }
        let tokenId = await contract?.addProduct(
                product.name,
                product.price,
                product.qty,
                product.type,
                product.category,
                product.sale,
                product.url
            )
            .then(async (tx: any) => {
                console.log(tx)
                let receipt = await tx.wait()
                console.log(receipt)
                const web3 = new Web3()
                const typesArray = [
                {type: 'uint256', name: 'productId'}
                ]
                let data = receipt.logs[0].data
                const decodedParameters = web3.eth.abi.decodeParameters(typesArray, data)
                // console.log(JSON.stringify(decodedParameters, null, 1));
                let productId = decodedParameters[0]
                console.log('new product id is ', productId)

                let response = await uploadImage(productId.toString() + '.png')
                console.log('image upload result', response)

                api.post(`/product`, {
                    productId: productId,
                    mediaUrl: product.mediaUrl,
                    type: product.type,
                    description: product.description,
                })
                .then(res => {
                    setLoading(false)
                    console.log(res)
                })
                .catch(err => {
                    setLoading(false)
                    console.log(err)
                })
            })
            .catch((error: any) => {
                setLoading(false)
            })
    }
    return (
        <>
            <Flex h='full' flexDirection={{base: 'column', md: 'row'}}>
                <Box p='40px' w='full'>
                    <VStack w='full' spacing='12px'>
                        <Box w='full'><Text>name</Text>
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
                            <Text>type</Text>
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
                            <Text>price</Text>
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
                            <Text>media url</Text>
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
                            <Text>quantity</Text>
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
                            <Text>description</Text>
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
                            <Text>category</Text>
                            <TextInput
                            name='category'                            
                            value={product.category}
                            style={{border: '1px solid white'}} 
                            color='white'
                            onChange={handleClick}
                            placeholder='category'
                            />
                        </Box>
                        <Box w='full'>
                            <Text>preview image</Text>
                            <FileUpload ref = {ref} name = 'name'/>
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