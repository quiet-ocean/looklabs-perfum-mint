import React, {
    createContext,
    useReducer,
    Dispatch,
    useState,
} from 'react'
import { cartReducer, productReducer } from '../reducers'
import { initialCartState, initialProductsState } from './constants'
import { CartProps, ActionProps, ProductProps, ProductStateProps } from '../types'

type AppStateProps = {
    contract: any,
    loading: boolean,
    user: any,
    isAuthenticated: boolean,
    token: any
}
interface ContextType {
    state: CartProps;
    appState: AppStateProps;
    productState: ProductStateProps;
    dispatch: Dispatch<ActionProps>;
    productDispatch: Dispatch<ActionProps>;
    setAppState: any
}
const initialAppState = {contract: '', loading: false, user: '', isAuthenticated: false, token: ''}
const Context = createContext<ContextType>({ 
    state: initialCartState,
    appState: initialAppState,
    productState: initialProductsState,
    dispatch: () => {},    
    productDispatch: () => {},
    setAppState: () => {},
})

const Store = ({ children, value = {} as ContextType }: { children: React.ReactNode; value?: {} }) => {
    
    const [appState, setAppState] = useState<AppStateProps>(initialAppState)
    const [state, dispatch] = useReducer(cartReducer, initialCartState)
    const [productState, productDispatch] = useReducer(productReducer, initialProductsState)

    return (
        <Context.Provider value={{ state, dispatch, appState, productState, productDispatch , setAppState }} >
            {children}
        </Context.Provider>
    )
}

export { Store, Context }