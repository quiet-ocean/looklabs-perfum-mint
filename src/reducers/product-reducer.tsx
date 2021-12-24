import { ActionProps, ProductProps } from '../types'

const productReducer = (state: ProductProps[], action: ActionProps) => {
    switch(action.type){
        case 'ADD_PRODUCT':
            return [...state, action.payload]
        case 'MINT':

        break;
        default:
            return state;
    }
}

export { productReducer }