import { initialProductsState } from '../state/constants';
import { ActionProps, ProductProps, ProductListProps } from '../types'
import { BigNumber } from 'ethers'

const productReducer = (state: ProductListProps = initialProductsState, action: ActionProps): ProductListProps => {

    let payload = action.payload
    switch(action.type){
        case 'ADD_PRODUCT':
            return {...state, products: [...state.products, action.payload]}
        case 'MINT':
            return state
        case 'CHANGE_STYLE':
            return state
        case 'SET_LOADED':
            let loaded: boolean = payload
            return { ...state, loaded: loaded }
        case 'REMOVE_ALL':
            return initialProductsState

        default:
            return state;
    }
}

export { productReducer }