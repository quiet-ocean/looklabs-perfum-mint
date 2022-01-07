import React from 'react'
import { Redirect } from 'react-router-dom'

const PrivateRoute: React.FC<{children: React.ReactNode}> = ({children}) => {

    let isAuthenticated = true

    return (
            isAuthenticated
            ?
            <> {children} </>
            :
            <Redirect to = {{ pathname: '/'}} />
    )
}

export { PrivateRoute }