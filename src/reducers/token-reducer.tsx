import { ActionProps, TokenProps } from '../types'

const tokenReducer = (state: TokenProps[], action: ActionProps) => {
    switch(action.type){
        case 'ADD_TOKEN':
            return [...state, action.payload]
        // break;
        case 'MINT':

        break;
        default:
            return state;
    }
}

export {tokenReducer}