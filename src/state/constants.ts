import { CartProps, ProductListProps, ProductProps } from '../types'
import { BigNumber } from 'ethers'

export const PRODUCT = 'product'
export const CART = 'cart'
export const WHITEPAPER = 'whitepaper'
export const LOGIN = 'login'

export const TYPE_CYBER = 1
export const TYPE_HOODIE = 2
export const TYPE_NORMAL = 3

export const initialCartState: CartProps = {
    currentPage: LOGIN,
    total: BigNumber.from("0"),
    items: [],
    ids: [],
    discount: BigNumber.from("0"),
    cyberProductId: -1,
    hoodieStyle: 'ver1',
}
export const initialProductsState: ProductListProps = { loaded: false, products: [] }