import ReactPlayer from 'react-player'
import {
    Container,
    HStack,
    VStack,
    Box,
    Text,
} from '@chakra-ui/react'
import { utils } from 'ethers'

const CartMenuItem = (props: any) => {
    const { product, quantity } = props

    const tokenPrice = Number(utils.formatEther(product.price))
    return (
        <>
        { (product)?
        <Container>
            <HStack>
                <Box border='1px solid #a5a5a5'>
                    <Container h='75px'>
                        <ReactPlayer
                            // url={`${item.token.media}`}
                            // url = {`/static/${product.uri}`}
                            url = {`/static/${product.mediaUrl}`}
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
                                <Box w='100%'><Text color='white'>{tokenPrice}</Text></Box>
                                <Box><Text>qty:{quantity}</Text></Box>
                            </HStack>
                        </Box>
                        <Box w='100%'>
                            <Text>free shipping</Text>
                        </Box>
                    </VStack>
                </Box>
            </HStack>
        </Container>: <Container></Container>}
        </>
    )
}

export {CartMenuItem}