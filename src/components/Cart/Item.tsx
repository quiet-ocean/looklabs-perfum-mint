import ReactPlayer from 'react-player'
import { utils } from 'ethers'
import {
    Container,
    HStack,
    VStack,
    Box,
    Text,
    Flex,
    Link, Image
} from '@chakra-ui/react'

const Item = (props: any) => {
    const { product, quantity, deleteProduct } = props

    return (
        <>
            {(product) ?
                <HStack mb="16px" spacing="0" p="16px">
                    <Box border='1px solid #a5a5a5' mr="16px">
                        <Flex h='80px'>
                            <ReactPlayer
                                // url={`${item.token.media}`}
                                // url={`/static/${product.uri}`}
                                url = {`/static/${product.mediaUrl}`}
                                loop={true}
                                playing={true}
                                muted={true}
                                width="100%"
                                height="100%"
                            />
                        </Flex>
                    </Box>
                    <Box w='100%'>
                        <VStack spacing="0">
                            <Box w='100%' mb="10px">
                                <HStack align='stretch'>
                                    <Box w='100%'>
                                        <Text color="white" fontSize="14px" fontWeight="normal">{product.name}</Text>
                                    </Box>
                                    <Box>
                                        <Link>
                                            <Text
                                                color="#800000"
                                                textTransform="uppercase"
                                                fontWeight="500"
                                                mb="14px"
                                                onClick = {() => deleteProduct(product.id)}
                                            >
                                                Delete
                                            </Text>
                                        </Link>
                                    </Box>
                                </HStack>
                            </Box>
                            <Box w='100%'>
                                <HStack align='stretch'>
                                    <Box w='100%'><Text color='white' fontWeight="600" fontSize="16px">Ξ&nbsp;{utils.formatEther(product.price)}</Text>
                                    </Box>
                                    <Box>
                                        <Text textTransform="uppercase" fontSize="12px" color="#A5A5A5">QTY:&nbsp;{quantity}
                                        </Text>
                                    </Box>
                                </HStack>
                            </Box>
                            <Box w='100%'>
                                <Text fontWeight="600" fontSize="14px" color="#A5A5A5">excl. shipping</Text>
                            </Box>
                        </VStack>
                    </Box>
                </HStack>
                : <></>}
        </>
    )
}

export { Item }