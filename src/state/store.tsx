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
}
interface ContextType {
    state: CartProps;
    appState: AppStateProps;
    productState: ProductStateProps;
    dispatch: Dispatch<ActionProps>;
    productDispatch: Dispatch<ActionProps>;
    setAppState: any
}
const Context = createContext<ContextType>({ 
    state: initialCartState,   
    appState: {contract: '', loading: false, user: ''},
    productState: initialProductsState,
    dispatch: () => {},    
    productDispatch: () => {},
    setAppState: () => {},
})

const Store = ({ children, value = {} as ContextType }: { children: React.ReactNode; value?: {} }) => {
    
    const [appState, setAppState] = useState<AppStateProps>({contract: '', loading: false, user: ''})
    const [state, dispatch] = useReducer(cartReducer, initialCartState)
    const [productState, productDispatch] = useReducer(productReducer, initialProductsState)

    return (
        <Context.Provider value={{ state, dispatch, appState, productState, productDispatch , setAppState }} >
            {children}
        </Context.Provider>
    )
}

export { Store, Context }