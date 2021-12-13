import { CartProps } from '../types'
import { BigNumber } from 'ethers'

export const initialCartState: CartProps = {
    nav: '',
    total: BigNumber.from("0"),
    items: [],
    ids: [],
    discount: BigNumber.from("0"),
    cyberProductId: -1,
}