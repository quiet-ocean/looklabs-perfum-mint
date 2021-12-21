import { CartProps, ProductProps } from '../types'
import { BigNumber } from 'ethers'

export const PRODUCT = 'product'
export const CART = 'cart'
export const WHITEPAPER = 'whitepaper'
export const LOGIN = 'login'

export const initialCartState: CartProps = {
    currentPage: LOGIN,
    total: BigNumber.from("0"),
    items: [],
    ids: [],
    discount: BigNumber.from("0"),
    cyberProductId: -1,
}
export const initialProductsState: ProductProps[] = []