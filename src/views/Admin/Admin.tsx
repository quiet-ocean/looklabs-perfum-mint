import React, { useContext } from 'react'
import { BigNumber } from 'ethers'

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
import { Context, products } from '../../state'

const AdminPage: React.FC = () => {
    const { productState } = useContext(Context)
    const deleteProduct = (dbId: BigNumber) => {
        console.log('delete product ' + dbId + ' in database')
    }
    return (
        <>
            <Container>
                <Table variant='simple' color='white' w='full'>
                    <TableCaption>Imperial to metric conversion factors</TableCaption>
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
                                <Tr>
                                    <Td>{item.id.toString()}</Td>
                                    <Td>{item.name}</Td>
                                    <Td isNumeric>{item.price.toString()}</Td>
                                    <Td>{item.category.toString()}</Td>
                                    <Td>detail</Td>
                                    <Td>delete</Td>
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
                    </Tr>
                    </Tfoot>
                </Table>
            </Container>
        </>
    )
}

export { AdminPage }