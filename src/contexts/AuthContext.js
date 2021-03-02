import React, { useContext, useState, useEffect } from 'react'
import useInputState from '../hooks/useInputState'
import axios from 'axios'
import history from '../history'

export const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider(props) {
    const [email, updateEmail] = useInputState("")
    const [password, updatePassword] = useInputState("")
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [handle, updateHandle] = useInputState("")
    const [confirmPassword, updateConfirmPassword] = useInputState("")
    const [user, setUser] = useState({})
    const [authenticated, setAuthenticated] = useState(false)

    // Signup
    const handleSignup = (e) => {
        e.preventDefault()
        setLoading(true)
        const newUserData = {
            email,
            password,
            confirmPassword,
            handle
        }
        axios.post('/signup', newUserData)
            .then(res => {
                console.log(res.data)
                localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`)
                setLoading(false)
                history.push('/')
            })
            .catch(err => {
                setErrors(err.response.data)
                setLoading(false)
                console.log(err.response.data)
            })
    }

    // Login
    const handleLogin = (e) => {
        e.preventDefault()
        setLoading(true)
        const userData = {
            email,
            password
        }
        axios.post('/login', userData)
            .then(res => {
                const FBIdToken = `Bearer ${res.data.token}`
                localStorage.setItem('FBIdToken', FBIdToken)
                axios.defaults.headers.common['Authorization'] = FBIdToken;
                getUserData()
                setLoading(false)
                setErrors({})
                history.push('/')
            })
            .catch(err => {
                setErrors(err.response.data)
                setLoading(false)
                console.log(err)
            })
    }

    // Get User Data
    const getUserData = () => {
        axios.get('/user')
            .then(res => {
                console.log(res)
                setUser(res.data)
                setAuthenticated(true)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const value = {
        // State
        email,
        updateEmail,
        handle,
        updateHandle,
        password,
        updatePassword,
        confirmPassword,
        updateConfirmPassword,
        loading,
        setLoading,
        errors,
        setErrors,
        user,
        authenticated,
        // Functions
        handleLogin,
        handleSignup
    }

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}




