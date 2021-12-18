import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import { assert, should } from 'chai'
import { Context, Store, useAppState } from '../state';
import { App } from '../App'
import { Root } from '../layouts/Root'

import { BrowserRouter as Router } from "react-router-dom";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import { ChakraProvider, VStack, Box } from "@chakra-ui/react";

describe('State function test', () => {

    function getLibrary(provider: any): Web3Provider {
        const library = new Web3Provider(provider);
        library.pollingInterval = 12000;
        return library;
    }
    const renderWithContext = (component) => {
        return {
            ...render(
                <Router basename={process.env.PUBLIC_URL}>
                    <Web3ReactProvider getLibrary={getLibrary}>
                        <ChakraProvider>
                        <Store value={Context}>
                            {component}
                        </Store>
                        </ChakraProvider>
                    </Web3ReactProvider>
                </Router>
            )
        }
    }
    afterEach(()=>cleanup())
    beforeAll(()=>{
        
    })
    afterAll(() => {
  
    })
    xit('>>check render', () => {
        // const { getByTestId } = renderWithContext(<App/>)
        // const { getByTestId } = renderWithContext(<Root />)
        // expect(getByTestId).toEqual('')
    })
    it('>>discount function test', () => {
  
    })
    
})