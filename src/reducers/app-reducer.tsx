import { ActionProps } from '../types'

const appReducer = (state: any, action: ActionProps) => {
    const type = action.type
    // const payload: CartProps = action.payload
    const payload: any = action.payload;

    switch(type){
        case 'ADD_TOKEN':
            console.log('add token to cart in cart reducer')
            
            const newCart = (typeof state=='object')?[ ...state, payload ]:[payload]
            console.log(newCart)
            return newCart
        case 'REMOVE_TOKEN':
            console.log('remove token from cart')
            return state
            // break;
        
        default:
            return state
    }
}

export { appReducer }