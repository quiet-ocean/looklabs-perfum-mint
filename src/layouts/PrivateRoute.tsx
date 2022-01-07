import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { Context } from '../state'

const PrivateRoute: React.FC<{children: React.ReactNode}> = ({children}) => {

    const { appState, setAppState } = useContext(Context)
    let isAuthenticated = appState.isAuthenticated

    return (
            isAuthenticated
            ?
            <> {children} </>
            :
            <Redirect to = {{ pathname: '/'}} />
    )
}

export { PrivateRoute }