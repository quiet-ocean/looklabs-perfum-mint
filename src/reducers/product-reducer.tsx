import { initialProductsState } from '../state/constants';
import { ActionProps, ProductProps, ProductStateProps } from '../types'
import { BigNumber } from 'ethers'

const productReducer = (state: ProductStateProps = initialProductsState, action: ActionProps): ProductStateProps => {

    let payload = action.payload
    switch(action.type){
        case 'ADD_PRODUCT':
            return {...state, products: [...state.products, action.payload]}
        case 'REMOVE_PRODUCT':
            let removeId: BigNumber = payload
            return {
                ...state,
                products: state.products.filter((item: ProductProps) => {
                    if(item.id.eq(removeId)) {
                        return false
                    }
                    return true
                })
            }
        case 'ADD_HOODIE':
            let hoodie: ProductProps = payload
            let newProducts: ProductProps[] = []
            let exist: boolean = false;

            state.products.forEach((product: ProductProps, key: number) => {
                if(product.name === hoodie.name) {
                    exist = true
                    newProducts.push({...product, ids: [...product.ids, hoodie.id]})
                } else {
                    newProducts.push(product)
                }
            })
            if(!exist) newProducts.push({ ...hoodie, ids: [hoodie.id]})

            return { ...state, products: newProducts }
        case 'CHANGE_HOODIE_STYLE':
            let productId: BigNumber = payload?.productId
            let styleId: BigNumber = payload?.styleId

            return {
                ...state,
                products: state.products.map((product: ProductProps) => {
                    if(product.id.eq(productId)) {
                        return { ...product, styleId: styleId, mediaUrl: `/static/movies/hoodie_v${styleId.toNumber()}.mov` }
                    }
                    return product
                })
            }

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