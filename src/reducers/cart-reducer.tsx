import { ActionProps, CartItemProps, CartProps } from '../types'
import { utils, BigNumber } from 'ethers'
import { initialCartState } from '../state/constants'

const cartReducer = (state: CartProps = initialCartState, action: ActionProps): CartProps => {
    const type = action.type
    const payload: any = action.payload

    switch (type) {
        
        case 'ADD_PRODUCT':
            let id: number = payload.product?.id.toNumber()

            let price: BigNumber = payload.product?.price.mul(Number(payload.quantity))

            let exist: boolean = state.ids.indexOf(id) > -1
            let quantity: number = Number(payload.quantity)

            let _newItems = exist ? state.items.map((item: CartItemProps, key: number) => {
                if(item.product.id.eq(payload.product.id)) {
                    let _newQuantity = item.quantity + Number(payload.quantity)
                    if(_newQuantity > item.product.qty) {
                        _newQuantity = item.product.qty
                        price = payload.product?.price.mul(Number(item.product.qty - item.quantity))
                    } else {

                    }
                    return { product: item.product, quantity: _newQuantity}
                }
                return item
            }) : [...state.items, { product: payload.product, quantity: quantity }]

            let _newState: CartProps = { 
                ...state,
                nav: state.nav,
                total: state.total.add(price), 
                // total: state.total.add(BigNumber.from('0.001').toString()),
                ids: exist ? state.ids : [...state.ids, id],
                items: _newItems
            }
            return _newState
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
            state.items.forEach((item: CartItemProps) => {
                if(item.product.id.eq(payload)) {
                    newtotal = newtotal.sub(item.product.price)
                    if(item.quantity > 1) {                        
                        __newItems.push({product: item.product, quantity: item.quantity - 1})
                    } else if ( item.quantity === 1) {
                        console.log('remove a item')
                    }            
                    return
                } else {
                    // console.log('mismatching')
                    __newItems.push(item)
                }
                
            })
            return {
                ...state,
                total: newtotal,                
                items: __newItems
            }
        case 'REMOVE_PRODUCT':
            return state

        case 'SET_NAV':
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
                if(item.product.id.equal(payload)) {
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
            let newState_2 = {
                ...state,
                cyberProductId: payload
            }
            // console.log(newState_2)
            return newState_2
        case 'REMOVE_ALL':
            return initialCartState
        default:
            return state
    }
}

export { cartReducer }