import { useState, useEffect, useContext } from 'react'
import { utils } from 'ethers'
import { useHistory } from 'react-router-dom'
import {
    VStack,
    HStack,
    Flex,
    Box,
    Text,
    Heading,
    Button,
    Progress,
    useToast,
    Spinner,
} from '@chakra-ui/react'

import { useAppState, Context } from '../../state'

type ReceiptProps = {confirmations: number, tokenId: number}

const Checkout = () => {

    const CHECKOUT = 0
    const PROCEEDING = 1
    const CONFIRMED = 2

    const { state, dispatch } = useContext(Context)
    const { transaction, setTransaction, cyberName, setCyberName } = useAppState()
    const history = useHistory()
    const subtitle = ['checkout','transction processing...', 'transaction confirmed']
    const [status, setStatus] = useState(1) // status - checkout, processing, confirmed
    const [time, setTime] = useState('')
    const [loading, setLoading] = useState<boolean>(false)
    const [fee, setFee] = useState<string>('0')

    useEffect(() => {
        if(!transaction || transaction === undefined || transaction === '') {
            history.push('/token')
        } else {
            setLoading(true)
            let getTransactionConfirmations = async (): Promise<ReceiptProps> => {
                let receipt = await transaction.wait()

                let hexId = receipt.logs[0].topics[3]
                let id = parseInt(hexId)
                setFee(utils.formatEther(receipt.gasUsed.mul(transaction.maxFeePerGas.add(transaction.maxPriorityFeePerGas))))
                let result = { confirmations: receipt.confirmations, tokenId: id }
                return result
            }
            setTimeout(async () => {

                let result: ReceiptProps = await getTransactionConfirmations()

                if(result.confirmations > 0) {
                    if(result.tokenId) {
                        if(state.cyberProductId > -1) {
                            let params = {productId: state.cyberProductId, tokenId: result.tokenId, cyberLabel: cyberName, address: '' }
                        } else {
                            console.log('cyber label not exist')
                        }
                        
                    } else {
                        console.log('token id is null')
                    }
                    setLoading(false)
                    setStatus(CONFIRMED)
                    dispatch({type: 'REMOVE_ALL', payload: ''})
                    setCyberName('')
                    return;
                } else {
                    
                }
            }, 1000)
        }       
    }, [])
    const toShort = (value: string, factor: number = 5) => {
        const slice = Math.round(value.length / factor)
        return `${value.substr(0, slice)}...${value.substr(value.length - slice, value.length)}`
    }
      
    return (
        <Flex direction={{base:'column', md:'row'}} w='100%' h='full'>
            {
            ((status === PROCEEDING || status === CONFIRMED) && <Box  w='100%' border='1px solid'  flex='4' p='24px' minH='200px'>
                <VStack align='stretch' spacing='16px'>
                    <Box><Text color='white' fontSize='22px'>{subtitle[status]}</Text></Box>
                    <Flex direction = {{base:'column', md: 'row'}}>
                        <Text  fontSize='12px'>tx id: </Text>
                        <Text  fontSize='12px'
                            style = {{
                                background: "linear-gradient(to top right, #fd06b1, #ef313e, #cc672a, #a4a02e, #7dd632, #60ff35)",
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            { (transaction && transaction.hash) ? transaction.hash : ''}
                        </Text> 
                    </Flex>
                    <Box w='100%'>
                        {status === PROCEEDING ? ([<Spinner color = 'white' />, <Box color='white'> <Text>Transaction: </Text> <Text color='white'>{(transaction && transaction.hash) ? toShort(transaction.hash) : ''}</Text></Box>]) : ''}
                        
                    </Box>
                    <Box>
                        {
                            status === CONFIRMED 
                            ? 
                            [
                                <HStack key='1'>
                                    <Text fontSize='12px'>time: </Text><Text color='white' fontSize='12px'>{time} transaction succeed</Text>
                                </HStack>,
                                <Box key='2'>
                                    <HStack><Text  fontSize='12px'>amount: Ξ </Text><Text  fontSize='12px' color='white'> {(transaction && transaction.hash) ? utils.formatEther(transaction.value) : ''}</Text></HStack>
                                </Box>,
                                <Box key='3'>
                                    <HStack><Text  fontSize='12px'>tx fees: Ξ </Text><Text  fontSize='12px' color='white'> { fee }</Text></HStack>
                                </Box>
                            ]                            
                            :
                            ''
                        }
                    </Box>
                </VStack>
            </Box>)
            }
            <Box w='100%' border='1px solid'flex='2' borderLeft={{md:'1px solid white'}}>
                { status === CHECKOUT && <VStack w='full' p='25px' borderBottom = {{md: '1px solid white'}}>
                    <HStack  w='100%'>
                        <Box w='100%'><Text>subtotal (4 items):</Text></Box>
                        <Box><Text>$2,129</Text></Box>
                    </HStack>
                    <HStack  w='100%'><Box w='100%'><Text>all 4 discount:</Text></Box><Box><Text>-$250</Text></Box></HStack>
                    <HStack  w='100%'><Box w='100%'><Text>total:</Text></Box><Box><Text>$1875</Text></Box></HStack>
                    <Box  w='100%' mt='60px !important'>
                        <Button onClick = {() => {setStatus(CHECKOUT)}} p='8px' bgGradient="linear(to-tr, #fd06b1, #ef313e, #cc672a, #a4a02e, #7dd632, #60ff35)" >
                            <Text color='white' fontSize={{base: '12px', md: '18px'}}>proceed to checkout</Text>
                        </Button>
                    </Box>
                </VStack>
                }
            </Box>
        </Flex>
    )
}

export { Checkout }