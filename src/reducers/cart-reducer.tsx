import { ActionProps, CartItemProps, CartProps } from '../types'
import { utils, BigNumber } from 'ethers'
import { initialCartState } from '../state/constants'

const cartReducer = (state: CartProps = initialCartState, action: ActionProps): CartProps => {
    const type = action.type
    const payload: any = action.payload

    switch (type) {
        
        case 'ADD_PRODUCT':
            // console.log('add new product', payload)
            // let id: number = BigNumber.from(payload.product?.id).toNumber()
            let id: number = payload.product?.id.toNumber()

            let price: BigNumber = payload.product?.price.mul(Number(payload.quantity))
            // console.log('price of added product is ', price)
            // let price: BigNumber = BigNumber.from('0')
            let exist: boolean = state.ids.indexOf(id) > -1
            let quantity: number = Number(payload.quantity)

            let newTotalPrice: BigNumber = BigNumber.from("0")
            let _newItems = exist ? state.items.map((item: CartItemProps, key: number) => {
                if(item.product.id == payload.product.id) {
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

            let newState_1: CartProps = { 
                ...state,
                nav: state.nav,
                total: state.total.add(price), 
                // total: state.total.add(BigNumber.from('0.001').toString()),
                ids: exist ? state.ids : [...state.ids, id],
                items: _newItems
            }
            // console.log('add new item', newState_1)
            // console.log(utils.formatEther(newState_1.total))
            return newState_1
        case 'INCREASE_QUANTITY':
            console.log('increase quantity in cart reducer ', payload)
            return {
                ...state,
                items: state.items.map((item: CartItemProps) => {
                    if(item.product.id == payload){
                        return { product: item.product, quantity: item.quantity + 1}
                    }
                    return item
                })
            }
        
        case 'DECREASE_QUANTITY':
            // let newtotal = BigNumber.from('0');
            let newtotal: BigNumber = state.total
            state.items.forEach((item: CartItemProps) => {
                if(item.product.id === payload && item.quantity > 1) {
                    newtotal = newtotal.sub(item.product.price)
                    return
                }
            })
            return {
                ...state,
                // total: newtotal.eq(BigNumber.from('0')) ? state.total : newtotal,
                total: newtotal,
                items: state.items.map((item: CartItemProps) => {
                    if(item.product.id == payload && item.quantity > 1) {
                        return { product: item.product, quantity: item.quantity - 1}
                    }
                    return item
                })
            }
        case 'REMOVE_PRODUCT':
            return state

            // break;
        case 'SET_NAV':
            // console.log('change nav text to ', payload)
            const nav: string = payload
            let newState = {...state, nav: payload}
            // console.log(newState)
            return newState
        case 'DELETE_PRODUCT':
            let total: BigNumber = state.total;
            // let productId: number = BigNumber.from(payload).toNumber()
            let productId: BigNumber = payload
            
            let newIds = state.ids.filter((id: any) => {
                if(id === productId) {
                    console.log('id exist in id array')
                    return false
                }
                return true
            })
            let newItems = state.items.filter((item: CartItemProps, key: number) => {
                if(item.product.id === payload) {
                    console.log('id exist in item array')
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
            console.log(newState_2)
            return newState_2
        case 'REMOVE_ALL':
            return initialCartState
        default:
            return state
    }
}

export { cartReducer }