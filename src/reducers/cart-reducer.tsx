import { ActionProps, CartItemProps, CartProps, ProductProps } from '../types'
import { utils, BigNumber } from 'ethers'
import { initialCartState } from '../state/constants'
import env from '../config'

const cartReducer = (state: CartProps = initialCartState, action: ActionProps): CartProps => {
    const type = action.type
    const payload: any = action.payload

    let calculateTotalPrice = (items: CartItemProps[]): BigNumber => {
        let total: BigNumber = BigNumber.from('0')
        items.forEach((item: CartItemProps)=>{
            total = total.add(item.product?.price.mul(item.quantity))
        })
        return total
    }

    switch (type) {
        case 'ADD_PRODUCT':
            let product: ProductProps = payload.product
            let id: BigNumber = product.id
            let addQuantity: number = payload.quantity
            addQuantity = addQuantity > product.qty ? product.qty : addQuantity
            let price: BigNumber = BigNumber.from('0')
            let _newItems: CartItemProps[] = []
            let newTotal: BigNumber = BigNumber.from('0')
            let exist: boolean = false

            let addItem = () => {
                
                state.items.forEach((item: CartItemProps) => {
                    let _quantity: number = 0
                    if(item.product.id.eq(id)) {
                        exist = true
                        _quantity = addQuantity + item.quantity
                        _quantity = _quantity > item.product.qty ? item.product.qty : _quantity
                        
                    } else {
                        _quantity = item.quantity
                    }
                    _newItems.push({product: item.product, quantity: _quantity})
                })
                if(!exist) {
                    price = product.price.mul(BigNumber.from(addQuantity))
                    newTotal = newTotal.add(price)
                    _newItems.push({product: product, quantity: addQuantity})
                }
            }
            addItem()
            let _total: BigNumber = calculateTotalPrice(_newItems)
            return {
                ...state,
                total: _total,
                items: _newItems,
                ids: exist ? state.ids : [...state.ids, id],
            }
        case 'INCREASE_QUANTITY':
            return {
                ...state,
                items: state.items.map((item: CartItemProps) => {
                    // if(item.product.id === payload){
                    if(item.product.id.eq(payload)) {
                        return { product: item.product, quantity: item.quantity + 1}
                    }
                    return item
                })
            }
        
        case 'DECREASE_QUANTITY':
            let newtotal: BigNumber = state.total
            let __newItems: CartItemProps[] = []
            let _newIds: number[] = []
            state.items.forEach((item: CartItemProps) => {
                if(item.product.id.eq(payload)) {
                    newtotal = newtotal.sub(item.product.price)
                    if(item.quantity > 1) {                        
                        __newItems.push({product: item.product, quantity: item.quantity - 1})
                        _newIds.push(item.product.id.toNumber())
                    } else if ( item.quantity === 1) {
                        console.log('remove a item')
                        
                    }            
                    return
                } else {
                    // console.log('mismatching')
                    __newItems.push(item)
                    _newIds.push(item.product.id.toNumber())
                }
                
            })
            return {
                ...state,
                total: newtotal,                
                items: __newItems,
                ids: _newIds,
            }
        case 'REMOVE_PRODUCT':
            return state

        case 'SET_NAV_TITLE':
            const nav: string = payload
            let newState = {...state, nav: payload}
            return newState
        case 'DELETE_PRODUCT':
            let total: BigNumber = state.total;
            let productId: BigNumber = payload
            
            let newIds = state.ids.filter((id: any) => {
                if(id === productId.toNumber()) {
                    // console.log('id exist in id array')
                    return false
                }
                return true
            })
            let newItems = state.items.filter((item: CartItemProps, key: number) => {
                if(item.product.id.eq(payload)) {
                    // console.log('id exist in item array')
                    // total =  total.sub(item.product?.price.mul(BigNumber.from(item.quantity)))
                    total =  total.sub(item.product?.price.mul((item.quantity)))
                    return false
                }
                return true
            })
        // console.log(utils.formatEther(total))
            return { ...state, items: newItems, total: total, ids: newIds }
        case 'SET_DISCOUNT_AMOUNT':
            return {
                ...state,
                discount: payload
            }
        case 'SET_CYBER_ID':
            let __newState = {
                ...state,
                cyberProductId: payload
            }
            // console.log(newState_2)
            return __newState
        case 'REMOVE_ALL':
            return initialCartState
        default:
            return state
    }
}

export { cartReducer }