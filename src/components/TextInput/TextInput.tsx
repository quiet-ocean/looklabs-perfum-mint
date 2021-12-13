import {
    VStack,
    Box,
    Text,
    Input,
} from '@chakra-ui/react'

const TextInput = (props: any) => {
    return (
        <VStack spacing = '10px' w='100%'>
            <Box w='100%'>
                <Text fontSize='12px'>{props.label}</Text>
            </Box>
            <Box w='full'>
                <Input { ...props } borderRadius='0px' />
            </Box>
        </VStack>
    )
}

export { TextInput }