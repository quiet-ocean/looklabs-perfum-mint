// # use describe, it pattern
import { render, screen } from '@testing-library/react';
import { assert, should } from 'chai'
import { App } from '../App';
import { cartReducer } from '../reducers/cart-reducer'
import { CartProps, CartItemProps, ProductProps, ActionProps } from '../types'
import { initialCartState } from '../state/constants'
import { BigNumber, utils } from 'ethers';

describe("Cart reducer test", () => {
  let URL = ''
  let product1: ProductProps
  let product2: ProductProps
  let product3: ProductProps
  let product4: ProductProps
  let products: ProductProps[]
  let payload: any
  let action: ActionProps
  let previousState: CartProps
  let total: BigNumber
  let expectedTotal: BigNumber = BigNumber.from('0')

  let addProducts = (n: number) => {
    // let product: ProductProps
    // for(let i = 0; i < n; i++) {

    // }
    // let payload: any = { product: product1, quantity: 1 }
    // let action: ActionProps = { type: 'ADD_PRODUCT', payload: payload }
    // previousState = cartReducer(initialCartState, action)
    // action.payload = { product: product2, quantity: 2 }
    // previousState = cartReducer(previousState, action)
    // action.payload = { product: product3, quantity: 3}
    // previousState = cartReducer(previousState, action)
    // action.payload = { product: product4, quantity: 4 }
    // total = cartReducer(previousState, action).total
    // expectedTotal = utils.parseEther('0.03')

    for(let i = 0; i < 4; i++) {
      action = { type: 'ADD_PRODUCT', payload: { product: products[i], quantity: i + 1} }
      previousState = cartReducer(previousState, action)
      total = previousState.total
      // expectedTotal = expectedTotal.add(products[i].price.mul(BigNumber.from((i+1)))
      expectedTotal = expectedTotal.add(products[i].price.mul(BigNumber.from(i+1)))
    }
  }
  beforeAll(()=>{
    
    product1 = {
      id: BigNumber.from('1'),
      name: 'Cyber EDP',
      price: utils.parseEther('0.001'),
      qty: 10,
      // contractType: 1,
      // category: 1,
      // sale: true,
      mediaUrl: URL + '/cyber/',
      type: 1,
      supply: 10,
      maxUnits: 10,
      description: '',
      sale: true,
    }
    product2 = {
      ...product1,
      id: BigNumber.from('2'),
      name: 'Hoodie',
      price: utils.parseEther('0.002')
    }
    product3 = {
      ...product1,
      id: BigNumber.from('3'),
      name: 'Coder',
      price: utils.parseEther('0.003')
    }
    product4 = {
      ...product1,
      id: BigNumber.from('4'),
      name: 'Fashion.Eight.Pass',
      price: utils.parseEther('0.004'),
    }
    products = [product1, product2, product3, product4]
  })  

  it("handle a product being added to cart list", () => {
    
    let payload: any = { product: product1, quantity:1 }
    let action: ActionProps = {type: 'ADD_PRODUCT', payload: payload}
    let expectedTotal: BigNumber = utils.parseEther('0.001')
    let stateTotal: BigNumber = cartReducer(initialCartState, action).total
    
    expect(stateTotal).toEqual(expectedTotal)
  })
  it('handle 2 products being added to cart list', () => {
    
    let payload: any = { product: product1, quantity:1 }
    let action: ActionProps = {type: 'ADD_PRODUCT', payload: payload}
    let expectedTotal: BigNumber = utils.parseEther('0.005')
    let previousState: CartProps = cartReducer(initialCartState, action)
    action.payload = { product: product2, quantity: 2 }
    let stateTotal: BigNumber = cartReducer(previousState, action).total
    
    expect(stateTotal).toEqual(expectedTotal)
  })
  it('handle several products being added to cart list', () => {
    addProducts(1)
    
    expect(total).toEqual(expectedTotal)
  })
  it('handle products being deleted from cart list', () => {

    addProducts(1)
    for(let i = 0; i < 4; i++) {
      action = { type: 'DELETE_PRODUCT', payload: products[i].id }
      previousState = cartReducer(previousState, action)
      total = previousState.total
      // expectedTotal = expectedTotal.sub(products[i].price.mul(BigNumber.from(i+1)))
    }
    expectedTotal = BigNumber.from('0')

    // let total = cartReducer(previousState, action).total
    // let expectedTotal: BigNumber = utils.parseEther('0.0')
    console.log('calculated total price is ', utils.formatEther(total))
    console.log('expected total price is ', utils.formatEther(expectedTotal))
    expect(total).toEqual(expectedTotal)
  })
  
  afterAll(() => {

  })
})