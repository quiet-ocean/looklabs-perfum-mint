import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { Context } from '../state'

const PrivateRoute: React.FC<{component: React.FC, path: string, exact: boolean}> = (props) => {

    const { appState } = useContext(Context)
    let isAuthenticated = appState.isAuthenticated

    return  isAuthenticated ? (<Route  path={props.path}  exact={props.exact} component={props.component} />) : 
        (<Redirect  to="/"  />);
}

export { PrivateRoute }