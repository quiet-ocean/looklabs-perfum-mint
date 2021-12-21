import React, {
    createContext,
    useReducer,
    Dispatch,
} from 'react'
import { cartReducer, productReducer } from '../reducers'
import { initialCartState, initialProductsState } from './constants'
import { CartProps, ActionProps, ProductProps } from '../types'

interface ContextType {
    state: CartProps;
    dispatch: Dispatch<ActionProps>;
    products: ProductProps[];
    productDispatch: Dispatch<ActionProps>;
}
const Context = createContext<ContextType>({ 
    state: initialCartState,   
    dispatch: () => {},
    products: initialProductsState,
    productDispatch: () => {},
})

const Store = ({ children, value = {} as ContextType }: { children: React.ReactNode; value?: {} }) => {
    
    const [state, dispatch] = useReducer(cartReducer, initialCartState)
    const [products, productDispatch] = useReducer(productReducer, initialProductsState)

    return (
        <Context.Provider value={{ state, dispatch, products, productDispatch }} >
            {children}
        </Context.Provider>
    )
}

export { Store, Context }