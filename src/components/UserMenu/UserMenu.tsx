import { EtherSymbol } from '@ethersproject/constants'
import { useAppState } from '../../state'
import { toShort } from '../../utils'
import { utils } from "ethers";

export type UserMenuProps = {
  //
}

const UserMenu = () => {
  const { user, isAuthenticated } = useAppState()

  return (
    <div
      style={{
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
        flexDirection: 'row',
        marginTop: '3rem'
      }}
    >
      {isAuthenticated && user && (
        <div>
          <div
            style={{
              fontSize: '2rem',
              display: 'block',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              lineHeight: '2rem',
              color: '#b7b7b7',
              fontFamily: 'Cyber Console'
            }}
          >
            {toShort(user.address)}
          </div>
          <div
            style={{
              fontSize: '2rem',
              display: 'block',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              lineHeight: '2rem',
              color: '#b7b7b7',
              fontFamily: 'Cyber Console'

            }}
          >
            Balance:&nbsp;
            {EtherSymbol}
            {utils.formatEther(user.balance)}
          </div>
        </div>
      )}
    </div>
  )
}

export { UserMenu }
