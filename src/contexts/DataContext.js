import React, { useContext, useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'

export const DataContext = React.createContext()

export function useData() {
    return useContext(DataContext)
}

export function DataProvider(props) {
    const { user, setUser } = useAuth()
    const [dataLoading, setDataLoading] = useState(false)
    const [screams, setScreams] = useState([])
    const [likes, setLikes] = useState([])
    const [likedScream, setLikedScream] = useState(null)
    const [unlikedScream, setUnlikedScream] = useState(null)


    // Get All Screams
    const getScreams = () => {
        setDataLoading(true)
        axios.get('/screams')
            .then(res => {
                setScreams(res.data)
                setDataLoading(false)
            })
            .catch(err => {
                setScreams([])
                setDataLoading(false)
            })
    }

    // const getLikes = () => {
    //     setDataLoading(true)
    //     axios.get('/likes')
    //         .then(res => {
    //             setLikes(res.data)
    //             setDataLoading(false)
    //         })
    //         .catch(err => {
    //             setLikes([])
    //             setDataLoading(false)
    //             console.log(err)
    //         })
    // }

    // Like A Scream

    const likeScream = (screamId) => {
        axios.get(`/scream/${screamId}/like`)
            .then(res => {
                setLikedScream(res.data)
                let index = screams.findIndex((scream) => scream.screamId === res.data.screamId)
                let newArr = [...screams]
                newArr[index] = res.data
                setScreams(newArr)
                console.log(user.likes)
                let updatedLikes = [...user.likes, {
                    userHandle: user.credentials.handle,
                    screamId: res.data.screamId
                }]
                let updatedUser = { ...user, likes: updatedLikes }
                setUser(updatedUser)
            })
            .catch(err => console.log(err))
    }

    // Unlike A Scream
    const unlikeScream = (screamId) => {
        axios.get(`/scream/${screamId}/unlike`)
            .then(res => {
                setUnlikedScream(res.data)
                let index = screams.findIndex((scream) => scream.screamId === res.data.screamId)
                let newArr = [...screams]
                newArr[index] = res.data
                setScreams(newArr)
                let updatedLikes = user.likes.filter(like =>
                    like.screamId !== res.data.screamId
                )
                let updatedUser = { ...user, likes: updatedLikes }
                setUser(updatedUser)
            })
            .catch(err => console.log(err))
    }

    const value = {
        // State
        dataLoading,
        // Functions
        screams,
        getScreams,
        likeScream,
        unlikeScream,
        likes

    }

    return (
        <DataContext.Provider value={value}>
            {props.children}
        </DataContext.Provider>
    )
}
