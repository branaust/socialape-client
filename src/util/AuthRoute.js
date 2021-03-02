import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function AuthRoute({ component: Component, ...rest }) {

    const { authenticated } = useAuth()

    return (
        <Route
            {...rest}
            render={(props) => authenticated === true ? <Redirect to='/' /> : <Component {...props} />}
        />
    )
}
