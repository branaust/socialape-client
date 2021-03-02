import React, { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function PrivateRoute({ component: Component, ...rest }) {
    const { currentUser } = useAuth()

    return (
        <Route
            {...rest}
            render={props => {
                return localStorage.getItem(currentUser) ? <Component {...props} /> : <Redirect to="/login" />
            }}>
        </ Route>
    )
}