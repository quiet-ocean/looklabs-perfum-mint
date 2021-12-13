import {
    VStack,
    Box,
    Text,
} from '@chakra-ui/react'

import {
    AutoComplete,
    AutoCompleteInput,
    AutoCompleteItem,
    AutoCompleteList,
} from '@choc-ui/chakra-autocomplete';

interface Item {
    label: string;
    value: string;
}

const AutoCompleteField = (props: any) => {
    
    const { label, options, placeholder } = props
    // console.log(options)
    return (
        <VStack spacing = '10px' w='100%'>
            <Box w='100%'>
                <Text fontSize='12px'>{label}</Text>
            </Box>
            <Box w='full'>
                <AutoComplete rollNavigatio tagStyleProps={{color:'red',w:'50% !important'}}>
                    <AutoCompleteInput  variant="filled" border='1px solid #a5a5a5' borderRadius='0px' placeholder={placeholder} bg='black' textTransform='uppercase'/>
                    <AutoCompleteList background='black !important' border='1px solid #a5a5a5 !important' borderRadius='0px !important'>
                    {options?.map((option: Item, oid: number) => (
                        <AutoCompleteItem
                        key={`option-${oid}`}
                        value={option.value}
                        textTransform="uppercase"
                        borderRadius='0px'
                        background='black !important'
                        >
                        {option.label}
                        </AutoCompleteItem>
                    ))}
                    </AutoCompleteList>
                </AutoComplete>
            </Box>
        </VStack>
    )
}

export { AutoCompleteField }