import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Context } from '../../state'
import { api, setAuthToken } from '../../utils'

import {
    Button,
    Text,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react'

const LoginModal: React.FC<{isOpen: boolean, onOpen: () => void, onClose: () => void}> = ({isOpen, onOpen, onClose}) => {

    // const { isOpen, onOpen, onClose } = useDisclosure()
    const history = useHistory()
    const { appState, setAppState } = useContext(Context)
    const [user, setUser] = useState<{username: string, password: string}>({username: 'admin', password: 'admin'})

    const login = async () => {
        
        const body = { username: user.username, password: user.password }

        let res = await api.post('/login', body)
        console.log(res)
        if(res && res.data) {
            if(res.data.success) {
                setAuthToken(res.data.token)
                setAppState({...appState, token: res.data.token, isAuthenticated: true})
                history.push('/admin')
            } else {
                console.log('login failed')
            }
        }
        // let result = 
        console.log(res)
    }
    // e: React.ChangeEvent<HTMLInputElement>
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let key: string = e.target.name || ''
        let value: string = e.target.value || ''
        setUser({...user, [key]: value})
    }
    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent p='10px'>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>modal</Text>
            </ModalBody>
                <div>
                    <Input name='username' value={user.username} onChange={handleChange} />
                    <Input name='password' value={user.password} onChange={handleChange} />
                </div>                
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant='ghost' onClick={login}>Login</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}

export { LoginModal }
