import {
    VStack,
    Box,
    Text,
    Select,
} from '@chakra-ui/react'

const SelectInput = (props: any) => {
    
    const { label, placeholder, options, ...rest} = props
    return (
        <VStack spacing = '10px' w='100%'>
            <Box w='100%'>
                <Text fontSize='12px'>{label}</Text>
            </Box>
            <Box w='full'>
                <Select { ...rest } borderRadius='0px' >
                    {
                        options?.map((value: string, key: number)=>(<option key={key} >{value}</option>))
                    }
                </Select>
            </Box>
        </VStack>
    )
}

export { SelectInput }