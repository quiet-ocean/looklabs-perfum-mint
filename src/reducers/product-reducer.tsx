import { initialProductsState } from '../state/constants';
import { ActionProps, ProductProps } from '../types'
import { BigNumber } from 'ethers'

const productReducer = (state: ProductProps[] = initialProductsState, action: ActionProps): ProductProps[] => {
    let payload = action.payload
    switch(action.type){
        case 'ADD_PRODUCT':
            return [...state, action.payload]
        case 'MINT':

        break;
        case 'CHANGE_STYLE':

            let productId: BigNumber = payload?.productId
            let styleId: number = payload?.styleId

            return state.map((product: ProductProps, key: number) => {
                if(product.id.eq(productId)) {
                    return { ...product, selectedStyle: styleId }
                }
                return product
            })
        case 'REMOVE_ALL':
            return initialProductsState
        default:
            return state;
    }
}

export { productReducer }