import { initialProductsState } from '../state/constants';
import { ActionProps, ProductProps, ProductListProps } from '../types'
import { BigNumber } from 'ethers'

const productReducer = (state: ProductListProps = initialProductsState, action: ActionProps): ProductListProps => {
    // try {
        let payload = action.payload
        switch(action.type){
            case 'ADD_PRODUCT':
                return {products: [...state.products, action.payload]}
            case 'MINT':
                return state
            break;
            case 'CHANGE_STYLE':

                let productId: BigNumber = payload?.productId
                let styleId: number = payload?.styleId

                return {
                    products: state.products.map((product: ProductProps, key: number) => {
                        if(product.id.eq(productId)) {
                            return { ...product, selectedStyle: styleId }
                        }
                        return product
                    })
                }
            case 'REMOVE_ALL':
                return initialProductsState
            default:
                return state;
        }
    // } catch (e) {
    //     console.error(e)
    // }
}

export { productReducer }