import React, { createContext, useReducer } from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { initialCartState } from '../state/constants'
import { Context, Store } from '../state'
import { Root } from '../layouts/Root'

const renderWithContext = (component: any) => {
    return {
        ...render (
            <Store value={Context}>
                { component }
            </Store>
        )
    }
}
afterEach(cleanup)

describe('test service', () => {
    it('checks if initial state is equal to 0', () => {
        const { getByTestId } = renderWithContext(<Root />)
    })    
})