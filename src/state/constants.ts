import { CartProps, ProductStateProps, ProductProps } from '../types'
import { BigNumber, utils } from 'ethers'

export const PRODUCT_PAGE = 'product'
export const CART_PAGE = 'cart'
export const WHITEPAPER_PAGE = 'whitepaper'
export const LOGIN_PAGE = 'login'

export const TYPE_CYBER = BigNumber.from('5')
export const TYPE_HOODIE = BigNumber.from('2')
export const TYPE_NORMAL = BigNumber.from('3')

export const initialCartState: CartProps = {
    currentPage: LOGIN_PAGE,
    total: BigNumber.from("0"),
    items: [],
    ids: [],
    discount: BigNumber.from("0"),
    cyberProductId: -1,
    hoodieStyle: 'ver1',
    pendingItem: {product: null, quantity: 0}
}
export const initialProductsState: ProductStateProps = { loaded: false, products: [] }

const description = [
    [
      '<p>Cyber Eau de Parfume is the real taste of luxury in. Each Cyber comes with the digitalised version of the scent. The label is recoreded and customed on the blockchain. Each physical is matching the blockchain one.</p>',
    ],
    [
      '<h2>Includes LOOK LABS propreiatry Metalight™ technilogy. Lightening in the dark, wireless chargable. Recycable OLED lights.</h2>',
    ],
    [
      '<h2>Includes LOOK LABS propreiatry Metalight™ technilogy. Lightening in the dark, wireless chargable. Recycable OLED lights.</h2>',
    ],
    ['<h2>Hello, World!</h2>'],
    ['<h2>1x free AR mint</h2>'],
  ]

export const initialProduct: ProductProps = {
    id: BigNumber.from('0'),
    name: '',
    price: BigNumber.from(utils.parseEther('0.001').toString()),    
    qty: 0,
    contractType: BigNumber.from('1'),
    category: BigNumber.from('1'),
    sale: true,
    url: '',

    type: BigNumber.from('0'),
    supply: 10,
    maxUnits: 10,
    mediaUrl: '',    
    description: '',

    ids: [BigNumber.from('0')],
    styleId: BigNumber.from('0'),
}

const URL = 'https://cart-art.looklabs.xyz'

export const products: ProductProps[] = [
    {
        ...initialProduct,
        url: URL + '/cyber/',
        price: BigNumber.from(utils.parseEther('0.001').toString()),
        name: 'cyber edp',
        type: BigNumber.from('0'),
        mediaUrl: '/static.movies/cyber.mov',
        description: description[0][0],
        category: BigNumber.from('1')
    },
    {
        ...initialProduct,
        name: 'COMFY5402 METALIGHT HOODIE',
        url: URL + '/hoodie/'
    },
    {
        ...initialProduct,
        name: 'COMFY5402 METALIGHT HOODIE',
        url: URL + '/hoodie/'
    },
    {
        ...initialProduct,
        name: 'fashion.eight.pass',
        url: URL + '/eight/',
        category: BigNumber.from('3')
    },
    {
        ...initialProduct,
        name: 'coder.art.pass',
        url: URL + '/coder/',
        category: BigNumber.from('4'),
    }
]