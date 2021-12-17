import GenesisCart from '../contracts/build/contracts/GenesisCart.json'
import create from 'zustand'
import { BigNumber, Contract, utils, providers } from 'ethers'
import axios from 'axios'
import { api } from '../utils/api'
import { abi } from './abi'
import { ContractPropsDetails, UserProps, CartItemProps } from '../types/types'

interface DiscountProps {
  discount: boolean
  total: BigNumber
  items: any[]
  count: number
}

export interface StateContext {
  isAuthenticated: boolean
  contract?: Contract
  contractDetails?: ContractPropsDetails
  user?: UserProps
  ethPrice?: string
  cyberName?: string
  labelValid?: boolean
  activatingConnector?: any
  transaction?: any
  library?: any
  boughtTokens?: BigNumber
  cyberIds?: any
  tokens?: any[]
  cart?: any
  transactionHash: any
  setAuthenticated(authenticated: boolean): void
  setContract(library: any, chainId: number): void
  setSupply(boughtTokens: BigNumber): void
  setCyberId(cyberIds: any): void
  setEthPrice(ethPrice: string): void
  labelExist(label: boolean): void
  setCyberName(cyberName: string): void
  setActivatingConnector(activatingConnector: any): void
  setTransaction(transaction: any): void
  mintToken(qty: number, price: BigNumber): void
  mintArt(): void
  setUser(address?: string, balance?: BigNumber): void
  getSupply(): void
  getCyberId(): void
  setTransactionHash(tx: any): void
  getTransactionHash(): any
  checkout(
    state: any,
    toast: any,
    history: any,
    dispatch: any,
    setLoading: any,
  ): void
  discount(state: any): Promise<DiscountProps>
}

const eliteAPI = 'https://elite.looklabs.xyz/cyber'

const useAppState = create<StateContext>((set, get) => ({
  isAuthenticated: false,
  contract: undefined,
  user: undefined,
  labelValid: true,
  ethPrice: '0.0',
  activatingConnector: undefined,
  transaction: undefined,
  boughtTokens: undefined,
  cyberIds: undefined,
  cart: new Map(),
  transactionHash: undefined,
  cyberName: '',
  setAuthenticated: (authenticated: boolean) =>
    set({ isAuthenticated: authenticated }),
  setContract: async (library: any, chainId: number) => {
    try {
      if (!library) throw new Error('No Web3 Found')

      const networkid = (id: number) => {
        switch (id) {
          case 1337:
            return 5777
          default:
            return id
        }
      }

      const deployedNetwork =
        GenesisCart.networks[
          String(networkid(chainId)) as keyof typeof GenesisCart.networks
        ]
      if (!deployedNetwork) {
        throw new Error('The network you selected is no supported yet.')
      }

      const { address } = deployedNetwork
      const contract = new Contract(
        address,
        GenesisCart.abi,
        library.getSigner(),
      )
      const name = 'ELITE DROP'
      const symbol = '$ELITE'

      set({
        library,
        contract,
        contractDetails: {
          name,
          symbol,
          address,
        },
      })
    } catch (e) {
      console.log(e)
    }
  },
  setUser: async (address?: string) => {
    try {
      const { contract, user, library } = get()

      if (!library) throw new Error('No Web3 Found')
      if (!contract) throw new Error('No contract found')
      if (!user && !address) throw new Error('No user found')

      const balance = await library.getBalance(address || user?.address || '')

      set({
        isAuthenticated: true,
        user: { address: address || user?.address || '', balance },
      })
    } catch (e) {
      console.log(e)
    }
  },
  setCyberId: (cyberIds: any) => {
    try {
      set({ cyberIds: cyberIds })
    } catch (e) {
      console.log(e)
    }
  },
  setSupply: (boughtTokens: BigNumber) => set({ boughtTokens: boughtTokens }),
  setEthPrice: (ethPrice: string) => set({ ethPrice: ethPrice }),
  setCyberName: (cyberName: string) => {
    set({ cyberName: cyberName })
  },
  labelExist: async (valid: boolean) => {
    set({ labelValid: valid })
  },
  setActivatingConnector: (activatingConnector: any) =>
    set({ activatingConnector: activatingConnector }),
  setTransaction: (transaction: any) => set({ transaction: transaction }),
  mintToken: async (qty: number, price: BigNumber) => {
    try {
      const { setTransaction, contract } = get()
      if (!contract) throw new Error('No contract found')
      const tx = await contract.mint(qty, { value: price })
      setTransaction(tx)
    } catch (e) {
      console.log('::: error on mint', e)
    }
  },
  mintArt: async () => {
    console.log('mint art')
    const { cyberName } = get()

    console.log('test signing here')

    const provider = new providers.Web3Provider(window.ethereum, 'any')
    const signer = provider.getSigner()
    const signature = await signer.signMessage(`${cyberName}`)

    try {
      const { cyberName, user } = get()
      axios
        .post(eliteAPI, {
          id:
            '59802099964075186739861634546209583188803329139329341613404248241597390832602',
          label: cyberName,
          address: user?.address,
          signature: signature,
        })
        .then((response) => {
          console.log('updated', response.data)
        })
    } catch (e) {
      console.log('on mintArt', e)
    }

  },
  getSupply: async () => {
    try {
      const { contract, setSupply } = get()
      if (!contract) throw new Error('No contract found')
      const supply = BigNumber.from('0')
      setSupply(supply)
    } catch (e) {
      console.log(e)
    }
  },
  getCyberId: async () => {
    try {
      const { contract, setCyberId, user } = get()
      if (!user) throw new Error('No user found')
      if (!contract) throw new Error('No contract found')
      const cyberId = await contract.getCyberId(user?.address)
      setCyberId(cyberId)
    } catch (e) {
      console.log(e)
    }
  },
  setTransactionHash: (tx) => {
    set({ transactionHash: tx })
  },
  getTransactionHash: () => {
    const { transactionHash } = get()
    return transactionHash
  },
  discount: async (state: any): Promise<DiscountProps> => {
    let min: number = 10
    let productIds: any[] = []
    let total: BigNumber = BigNumber.from('0')
    let items: any[] = []
    let flag: boolean = false
    return await new Promise((resolve) => {
      state.items.forEach((item: CartItemProps) => {
        let index: number = productIds.indexOf(item.product.id)
        if (index === -1) {
          productIds.push(item.product.id)
          min = min < item.quantity ? min : item.quantity
          total = total.add(item.product.price.div(BigNumber.from('5')))
          let amount: BigNumber = item.product.price.div(BigNumber.from('5'))

          items =
            items && items.length > 0
              ? [...items, item.product]
              : [item.product]
        }
        flag = productIds.length === 4 ? true : false
      })
      resolve({
        discount: flag,
        items: items,
        total: BigNumber.from(utils.parseEther('0.001').toString()).mul(
          BigNumber.from(min),
        ),
        count: min,
      })
    })
  },

  checkout: async (state, toast, history, dispatch, setLoading) => {
    setLoading(true)
    const {
      contract,
      user,
      setTransactionHash,
      cyberName,
      setTransaction,
      discount,
    } = get()
    let quantity: number = 1
    let eth: BigNumber = state.total
    let balance: BigNumber = BigNumber.from(user?.balance.toString())

    let dstate: DiscountProps = await discount(state)

    if (dstate.discount) {
      dispatch({ type: 'SET_DISCOUNT_AMOUNT', payload: dstate.total })
    }
    type TempProps = {
      cl: any
      qtys: any[]
      prds: BigNumber[]
      success: boolean
      cyberId: number
      data: string[]
    }
    let promise = new Promise<TempProps>((resolve, reject) => {
      let quantities: any[] = []
      let productIds: BigNumber[] = []
      let cyberLabel: any = ''
      let success: boolean = true
      let cyberId = -1
      let labelArray: string[] = []

      state.items.forEach(async (item: CartItemProps, key: number) => {
        if (
          item.product ||
          item.product.id !== undefined ||
          item.product.id !== '' ||
          item.quantity > 0
        ) {
          quantities.push(item.quantity)
          productIds.push(item.product.id)

          if (item.product.type === 2) {
            console.log('cyber label is ', cyberName)
            cyberLabel = cyberName
            cyberId = parseInt(item.product.id)
            labelArray.push(cyberLabel)
          } else {
            labelArray.push('')
          }
        } else {
          console.log('state have wrong items')
          success = false
        }
        resolve({
          success: success,
          qtys: quantities,
          prds: productIds,
          cl: cyberName,
          cyberId: cyberId,
          data: labelArray
        })
      })
    })

    let t: TempProps = await promise
    console.log(t)
    let productIds = t.prds
    let quantities = t.qtys
    let cyberLabel: string = t.cl
    let cyberId: number = t.cyberId
    let data: string[] = t.data

    let product

    if (balance.lt(state.total)) {
      toast({
        title: 'Notice.',
        description: 'Your balance is not enough to pay.',
        status: 'success',
        duration: 5000,
        position: 'top-right',
        isClosable: true,
      })
      setLoading(false)
    } else {

      if (quantities.length > 0 && productIds.length > 0 && eth) {
        let price: BigNumber = dstate.discount ? eth.sub(dstate.total) : eth
        let tx: any

        contract
            ?.checkOut(productIds, quantities, data, {
            value: price,
          })
          .then(async (tx: any) => {
            console.log('check transaction', tx)
            setTransaction(tx)
            if (tx && tx?.hash) {
              if (t.success) {
                if (cyberLabel !== '' && cyberId > -1) {
                  dispatch({ type: 'SET_CYBER_ID', payload: cyberId })
                } else {
                  console.log('cannot find cyber name')
                }
                setTransactionHash(tx.hash)
                setLoading(false)
                history?.push('/checkout')
              } else {
                setLoading(false)
                return
              }
            }
          })
          .catch((error: any) => {
            console.log(error)
            setLoading(false)
            console.log('transaction rejected')
          })
      } else {
        setLoading(false)
        console.log('checkout transaction parameters have error')
        console.log(state, toast, history, dispatch)
      }
    }
  },
}))

export { useAppState }
