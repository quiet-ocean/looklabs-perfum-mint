import { useState, useEffect, useContext, useRef } from 'react'
import { utils, providers, BigNumber } from 'ethers'
import { useHistory } from 'react-router-dom'
// import web3 from 'web3   '
import {
    // Container,
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
import { TextInput, AutoCompleteField } from '../../components'

import { useAppState, Context } from '../../state'
import { api } from '../../utils/api'

const countries = [
    { value: "ghana", label: "Ghana" },
    { value: "nigeria", label: "Nigeria" },
    { value: "kenya", label: "Kenya" },
    { value: "southAfrica", label: "South Africa" },
    { value: "unitedStates", label: "United States" },
    { value: "canada", label: "Canada" },
    { value: "germany", label: "Germany" }
]

// const states = {
//     'ghana': [],
//     'nigeria': [],
//     'kenya': [],
//     'southAfrica': [],
//     'unitedStates': [],
//     'canada': [],
//     'germany': [],
// }
// const token = {
//     id: 2,
//     name: 'CYBER EAU DE PARFUM 1',
//     media: '/static/comfy5402_gloss.mp4',
//     price: 5,
//     uri: '',
//     supply: 1337,
//     maxUnits: 10,
// }
type ReceiptProps = {confirmations: number, tokenId: number}
const Checkout = () => {

    const CHECKOUT = 0
    const PROCEEDING = 1
    const CONFIRMED = 2

    const MIN_CONFIRMATIONS = 10

    const { state, dispatch } = useContext(Context)
    const { transaction, setTransaction, cyberName, setCyberName } = useAppState()
    const history = useHistory()
    const subtitle = ['checkout','transction processing...', 'transaction confirmed']
    const [status, setStatus] = useState(1) // status - checkout, processing, confirmed
    // const [progress, setProgress] = useState(0.1)
    // const [confirmations, setConfirmations] = useState(0)
    const [time, setTime] = useState('')
    // const speed = 0.01

    // const transactionRef = useRef(useAppState.getState().transaction)
    const [loading, setLoading] = useState<boolean>(false)
    const [fee, setFee] = useState<string>('0')

    useEffect(() => {
        if(!transaction || transaction === undefined || transaction === '') {
            history.push('/token')
        } else {
            setLoading(true)
            let getTransactionConfirmations = async (): Promise<ReceiptProps> => {
                let receipt = await transaction.wait()

                console.log(receipt.logs[0].topics[0])
                console.log(receipt.logs[0].topics[1])
                console.log(receipt.logs[0].topics[2])
                console.log(receipt.logs[0].topics[3])

                console.log(parseInt(receipt.logs[0].topics[0]))
                console.log(parseInt(receipt.logs[0].topics[1]))
                console.log(parseInt(receipt.logs[0].topics[2]))
                console.log(parseInt(receipt.logs[0].topics[3]))

                let hexId = receipt.logs[0].topics[3]
                // console.log(BigNumber.from(hexId).toNumber())
                let id = parseInt(hexId)
                console.log(id, cyberName)
                // console.log(utils.hexValue(receipt.logs[0].topics[3]))
                // console.log(BigNumber.from(receipt.logs]0))
                // console.log((receipt.logs[0].topics[3].toNumber()))
                console.log('receipt', receipt)
                setFee(utils.formatEther(receipt.gasUsed.mul(transaction.maxFeePerGas.add(transaction.maxPriorityFeePerGas))))
                let result = { confirmations: receipt.confirmations, tokenId: id }
                return result
            }
            setTimeout(async () => {
                let result: ReceiptProps = await getTransactionConfirmations()
                console.log('get formations function result ', result)
                console.log('current state ', state)
                if(result.confirmations > 0) {
                    if(result.tokenId) {
                        if(state.cyberProductId > -1) {
                            console.log('cyber label exist')
                            console.log('cyber product id is ' + state.cyberProductId + ' is updated as token id is ' + result.tokenId)
                            let params = {productId: state.cyberProductId, tokenId: result.tokenId, cyberLabel: cyberName }
                            console.log(params)
                            api.post(`/cyber/update`, params)
                                .then((response) => {
                                    console.log(response)
                                })
                                .catch(error => {
                                    console.log(error)
                                })                      
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
            {(status === CHECKOUT && <Box  w='100%' flexGrow={4} minH='200px'>
                <Flex direction={{base: 'column', md: 'row'}} >
                    <VStack spacing='24px' w='100%' p='32px'>
                        <Box w='full'>
                            <VStack spacing='15px' w='full' align='stretch'>
                                <Heading as='h5' fontSize='18px'>customer details</Heading>
                                <Box w={{base: '100%', md: '50%'}}><AutoCompleteField label={'title'} placeholder={'title'} options={[{value: 'mr', label:'MR'},{value:'gt',label:'GT'}]} w={{base:'100%',md:'50%'}} /></Box>
                                <TextInput label={'fisrt name'}/>
                                <TextInput label={'super name'}/>
                            </VStack>
                        </Box>
                        <Box w='full'>
                            <VStack spacing='15px' w='full' align='stretch'>
                                <Heading as='h5' fontSize='18px'>delivery details</Heading>
                                <Box w='100%'><AutoCompleteField label={'country or region'} placeholder={'country'} w={{base:'100%',md:'50%'}} options = {countries} /></Box>
                                <TextInput label={'street address'}/>
                                <TextInput label={'street address 2 (optional)'}/>
                                <TextInput label={'city'} />
                                <Box w={{base: '100%', md: '50%'}}><AutoCompleteField label={'state/province/region'} placeholder={'state'} w={{base:'100%',md:'50%'}} options = {countries} /></Box>
                                <TextInput label={'zip code'} w={{base:'100%',md:'50%'}}/>
                            </VStack>
                        </Box>
                    </VStack>
                    <Box w='100%'>
                    
                    </Box>
                </Flex>
                <Box p='32px'>
                    <Button onClick = {() =>{ }} p='24px' bgGradient="linear(to-tr, #fd06b1, #ef313e, #cc672a, #a4a02e, #7dd632, #60ff35)">
                        <Text color='white'>pay with wallet</Text>
                    </Button>
                </Box>
            </Box>)
            ||
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