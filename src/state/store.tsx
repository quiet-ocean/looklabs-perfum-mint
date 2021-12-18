import React, {
    createContext,
    useReducer,
    Dispatch,
    ReducerAction,
    Reducer
} from 'react'
import { cartReducer } from '../reducers'
import { BigNumber } from 'ethers'
import { initialCartState } from './constants'
import { CartProps, ActionProps } from '../types'

interface ContextType {
    state: CartProps; dispatch: Dispatch<ActionProps>
}
const Context = createContext<ContextType>({ 
    state: initialCartState,   
    dispatch: () => {}
})

const Store = ({ children, value = {} as ContextType }: { children: React.ReactNode; value?: {} }) => {
    const [state, dispatch] = useReducer(cartReducer, initialCartState)

    return (
        <Context.Provider value={{ state, dispatch }} >
            {children}
        </Context.Provider>
    )
}

export { Store, Context }