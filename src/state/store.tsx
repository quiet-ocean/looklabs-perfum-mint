import React, {
    createContext,
    useReducer,
    Dispatch,
} from 'react'
import { cartReducer, productReducer } from '../reducers'
import { initialCartState, initialProductsState } from './constants'
import { CartProps, ActionProps, ProductProps, ProductStateProps } from '../types'

interface ContextType {
    state: CartProps;
    dispatch: Dispatch<ActionProps>;
    // products: ProductProps[];
    productState: ProductStateProps;
    productDispatch: Dispatch<ActionProps>;
}
const Context = createContext<ContextType>({ 
    state: initialCartState,   
    dispatch: () => {},
    productState: initialProductsState,
    productDispatch: () => {},
})

const Store = ({ children, value = {} as ContextType }: { children: React.ReactNode; value?: {} }) => {
    
    const [state, dispatch] = useReducer(cartReducer, initialCartState)
    const [productState, productDispatch] = useReducer(productReducer, initialProductsState)

    return (
        <Context.Provider value={{ state, dispatch, productState, productDispatch }} >
            {children}
        </Context.Provider>
    )
}

export { Store, Context }