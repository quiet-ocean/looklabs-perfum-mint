// # use describe, it pattern
import { render, screen } from '@testing-library/react';
import { assert, should } from 'chai'
import { App } from '../App';
import { cartReducer } from '../reducers/cart-reducer'
import { CartProps, CartItemProps, ProductProps, ActionProps } from '../types'
import { initialCartState } from '../state/constants'
import { BigNumber, utils } from 'ethers';
import { cookieStorageManager } from '@chakra-ui/react';

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
  let expectedTotal: BigNumber

  let addProducts = (n: number) => {

    for(let i = 0; i < 4; i++) {
      action = { type: 'ADD_PRODUCT', payload: { product: products[i], quantity: i + 1} }
      previousState = cartReducer(previousState, action)
      total = previousState.total
      expectedTotal = expectedTotal.add(products[i].price.mul(BigNumber.from(i+1)))
    }
  }
  let clear = () => {
    previousState = initialCartState
    total = BigNumber.from('0')
    expectedTotal = BigNumber.from('0')
  }
  beforeAll(()=>{
    
    product1 = {
      id: BigNumber.from('1'),
      name: 'Cyber EDP',
      price: utils.parseEther('0.001'),
      qty: 10,
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

  afterAll(() => {

  })
  beforeEach(() => {
    clear()
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
    let state: CartProps = cartReducer(previousState, action)
    let stateTotal: BigNumber = state.total
    console.log(state)
    expect(stateTotal).toEqual(expectedTotal)
  })
  it('handle several products being added to cart list', () => {
    
    addProducts(1)
    console.log(previousState)
    expect(total).toEqual(expectedTotal)
  })
  xit('handle products being deleted from cart list', () => {

    addProducts(1)
    for(let i = 0; i < 4; i++) {
      action = { type: 'DELETE_PRODUCT', payload: products[i].id }
      previousState = cartReducer(previousState, action)
      total = previousState.total
    }
    expectedTotal = BigNumber.from('0')

    assert.notEqual(total, expectedTotal)
  })
  xit('handle a product being decreased in cart list', () => {
    addProducts(2)
    action = { type: 'DECREASE_QUANTITY', payload: BigNumber.from('4')}
    let state: CartProps = cartReducer(previousState, action)
    total = state.total
    console.log(state)
    expectedTotal = utils.parseEther('0.026')
    expect(total).toEqual(expectedTotal)
  })
  xit('handle decrease action in cart list', () => {
    addProducts(1)
    console.log(utils.formatEther(total), utils.formatEther(expectedTotal))
    action = { type: 'DECREASE_QUANTITY', payload: BigNumber.from('4')}
    for(let i = 0; i < 6; i++) {
      previousState = cartReducer(previousState, action)
    }
    console.log(previousState)
    total = previousState.total
    expectedTotal = utils.parseEther('0.014')
    
    console.log(utils.formatEther(total), utils.formatEther(expectedTotal))

    expect(total).toEqual(expectedTotal)
  })
})