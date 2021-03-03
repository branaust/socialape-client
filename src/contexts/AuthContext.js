import React, { useContext, useState, useEffect } from 'react'
import useInputState from '../hooks/useInputState'
import axios from 'axios'
import history from '../util/history'
import jwtDecode from 'jwt-decode'

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
                setAuthorizationHeader(res.data.token)
                getUserData()
                setLoading(false)
                setErrors({})
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
                setAuthorizationHeader(res.data.token)
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

    // Logout User
    const logoutUser = () => {
        localStorage.removeItem('FBIdToken');
        delete axios.defaults.headers.common['Authorization']
        setAuthenticated(false)
        setUser({})
    }

    // Get User Data
    const getUserData = () => {
        setLoading(true)
        axios.get('/user')
            .then(res => {
                console.log(res)
                setUser(res.data)
                setAuthenticated(true)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }

    useEffect(() => {
        const token = localStorage.FBIdToken;
        if (token) {
            const decodedToken = jwtDecode(token)
            if (decodedToken.exp * 1000 < Date.now()) {
                logoutUser()
                window.location.href = '/login'
            } else {
                setAuthenticated(true)
                axios.defaults.headers.common['Authorization'] = token
                getUserData()
                console.log(authenticated)
            }
        }
    }, [])


    const setAuthorizationHeader = (token) => {
        const FBIdToken = `Bearer ${token}`
        localStorage.setItem('FBIdToken', FBIdToken)
        axios.defaults.headers.common['Authorization'] = FBIdToken;
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
        setAuthenticated,
        // Functions
        handleLogin,
        handleSignup,
        logoutUser,
        getUserData
    }

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}




