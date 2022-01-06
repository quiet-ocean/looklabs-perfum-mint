import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BigNumber } from 'ethers'
import { useProductState } from '../../hooks'

import {
    Container,
    Box,
    Text,

    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    
} from '@chakra-ui/react'
import { ProductProps } from '../../types'
import { Context, products, useAppState } from '../../state'
import { api } from '../../utils/api'

const AdminPage: React.FC = () => {
    const { productState, productDispatch, appState, setAppState } = useContext(Context)
    const { contract } = useAppState()
    const products = useProductState()

    useEffect(() => {
        
    }, [])

    const setLoading = (flag: boolean) => {
        setAppState({...appState, loading: flag})
    }
    const deleteProduct = async (productId: BigNumber) => {
        setLoading(true)
        console.log('delee product ' + productId + ' in database')
        await contract?.deleteProduct(productId)
            .then(async (tx: any) => {
                productDispatch({type: 'REMOVE_PRODUCT', payload: productId})
                let response = await api.get(`/product/del/${productId}`)
                let body = response.data.body
                console.log(response)
            })
        setLoading(false)
    }
    return (
        <>
            <Container maxW='container.xl' mt='40px'>
                <Box><Link to='/add'><Text align='right'>add product</Text></Link></Box>
                <Table variant='simple' color='white' w='full' mt='20px'>
                    <TableCaption>product list</TableCaption>
                    <Thead>
                    <Tr>
                        <Th>id</Th>
                        <Th>name</Th>
                        <Th isNumeric>price</Th>
                        <Th>category</Th>
                        <Th>detail</Th>
                        <Th>actions</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {
                        productState.products.map((item: ProductProps, key: number) => {
                            return (
                                <Tr key={key}>
                                    <Td>{item.id.toString()}</Td>
                                    <Td>{item.name}</Td>
                                    <Td isNumeric>{item.price.toString()}</Td>
                                    <Td>{item.category.toString()}</Td>
                                    <Td>detail</Td>
                                    <Td><a href='#' onClick={() => {deleteProduct(item.id)}}>delete</a></Td>
                                </Tr>
                            )
                        })
                    }
                    </Tbody>
                    <Tfoot>
                    <Tr>
                        <Th>id</Th>
                        <Th>name</Th>
                        <Th isNumeric>price</Th>
                        <Th>category</Th>
                        <Th>detail</Th>
                        <Th>actions</Th>
                    </Tr>
                    </Tfoot>
                </Table>
            </Container>
        </>
    )
}

export { AdminPage }