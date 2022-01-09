import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Context } from '../../state'
import { api, setAuthToken } from '../../utils'

import {
    Button,
    Text,
    Input,
    Modal,
    VStack,
    Box,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Checkbox, CheckboxGroup,
    useDisclosure,
    useToast,
} from '@chakra-ui/react'
import { TextInput } from '../'

const LoginModal: React.FC<{isOpen: boolean, onOpen: () => void, onClose: () => void}> = ({isOpen, onOpen, onClose}) => {

    // const { isOpen, onOpen, onClose } = useDisclosure()
    const history = useHistory()
    const toast = useToast()
    const { appState, setAppState } = useContext(Context)
    const [user, setUser] = useState<{username: string, password: string}>({username: 'admin', password: 'admin'})
    const [error, setError] = useState('')

    useEffect(() => {
      setError('')
    }, [isOpen])
    const login = async () => {
        
        const body = { username: user.username, password: user.password }
        
        let res = await api.post('/login', body)
        console.log(res)
        if(res && res.data) {
            if(res.data.success) {
                setAuthToken(res.data.token)
                setAppState({...appState, token: res.data.token, isAuthenticated: true})
                onClose()
                toast({
                  position: 'top-right',
                  render: () => (
                    <Box color='white' p={3} bg='blue.500'>
                      <Text color='white'>Login succeed!</Text>
                    </Box>
                  ),
                })
                history.push('/admin')
            } else {
                console.log('login failed')
                setError(res.data.message)
            }
        }
        console.log(res)
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let key: string = e.target.name || ''
        let value: string = e.target.value || ''
        setUser({...user, [key]: value})
    }
    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose} >
          <ModalOverlay />
          <ModalContent p='10px' style={{borderRadius: '0px'}}>
            <ModalHeader style={{border:'none'}}><Text color='black'>Login as Amin</Text></ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack>
                <Box w='full'>
                  <TextInput name='username' value={user.username} onChange={handleChange} />
                </Box>
                <Box w='full'>
                  <TextInput name='password' value={user.password} onChange={handleChange} />
                </Box>
                <Box w='full'><Text>{error}</Text></Box>
                <Box w='full'>
                  <Checkbox defaultIsChecked>Checkbox</Checkbox>
                </Box>                
              </VStack>
            </ModalBody>                                
            <ModalFooter>
              <Button colorScheme='blue' onClick={login}><Text>Login</Text></Button>
            </ModalFooter>
            <ModalBody>
              <VStack>
                <Box></Box>
                <Box></Box>
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
}

export { LoginModal }