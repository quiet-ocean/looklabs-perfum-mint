import { BigNumber } from 'ethers'
import { isEmpty } from './isEmpty'
import { api } from './api'

const { REACT_APP_SERVICE_URL } = process.env

export const ETHSCAN_API = `${REACT_APP_SERVICE_URL}/ethusd`
export const METADATA_API = REACT_APP_SERVICE_URL || ''

export * from './toShort'
export * from './formatPriceEth'
export * from './isEmpty'
export * from './api'

const isAlphaNumeric = function(s: string) {
    var regExp = /^[A-Za-z0-9]+$/;
    return (s.match(regExp));
  };
export const BN = (n: string) => {
    if(isEmpty(n) && !isAlphaNumeric(n)) {
        console.error('input param is not alphanumeric')
    }
    return BigNumber.from(n)
}

export const setAuthToken = (token: string) => {
    console.log(token)
    if(token) {
        api.defaults.headers.common['x-auth-token'] = token
        localStorage.setItem('token', token) 
    } else {
        delete api.defaults.headers.common['x-auth-token'];
        localStorage.removeItem('token')
    }
}