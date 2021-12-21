import { useWeb3React } from '@web3-react/core'
import { Login } from '../'
import { ProductList } from '../../components'
import { useAppState } from '../../state'

const Marketplace = () => {
  const { user } = useAppState()
  const { active } = useWeb3React()

  return (
    <>
      {!user && <Login />}
      {user && active && <ProductList />}
      </>
    )
}

export { Marketplace }
