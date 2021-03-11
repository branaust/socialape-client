import React, { useContext, useState } from 'react'
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
    const [errors, setErrors] = useState(null)
    const [scream, setScream] = useState({})
    const [screamLoading, setScreamLoading] = useState(false)
    const [comments, setComments] = useState([])
    // const [commentCount, setCommentCount] = useState()

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


    // Like A Scream

    const likeScream = (screamId) => {
        axios.get(`/scream/${screamId}/like`)
            .then(res => {
                let index = screams.findIndex((scream) => scream.screamId === res.data.screamId)
                let newArr = [...screams]
                newArr[index] = res.data
                setScreams(newArr)
                let updatedLikes = [...user.likes, {
                    userHandle: user.credentials.handle,
                    screamId: res.data.screamId
                }]
                let updatedUser = { ...user, likes: updatedLikes }
                setUser(updatedUser)
                if (scream.screamId === res.data.screamId) {
                    setScream(res.data)
                }
            })
            .catch(err => console.log(err))
    }

    // Unlike A Scream
    const unlikeScream = (screamId) => {
        axios.get(`/scream/${screamId}/unlike`)
            .then(res => {
                let index = screams.findIndex((scream) => scream.screamId === res.data.screamId)
                let newArr = [...screams]
                newArr[index] = res.data
                setScreams(newArr)
                let updatedLikes = user.likes.filter(like =>
                    like.screamId !== res.data.screamId
                )
                let updatedUser = { ...user, likes: updatedLikes }
                setUser(updatedUser)
                if (scream.screamId === res.data.screamId) {
                    setScream(res.data)
                }
            })
            .catch(err => console.log(err))
    }

    // Delete A Scream
    const deleteScream = (screamId) => {
        axios.delete(`/scream/${screamId}`)
            .then(() => {
                let index = screams.findIndex((scream) => scream.screamId === screamId);
                let newArr = [...screams]
                newArr.splice(index, 1);
                setScreams(newArr)
            })
            .catch(err => console.log(err))
    }

    // Delete A Comment
    const deleteComment = (screamId, commentId) => {
        axios.delete(`scream/${screamId}/comment/${commentId}`)
            .then(() => {
                let commentIndex = comments.findIndex((comment) => comment.commentId === commentId)
                let updatedCommentCount = scream.commentCount -= 1
                let newCommentArr = [...comments]
                newCommentArr.splice(commentIndex, 1)
                setComments(newCommentArr)
                let updatedScream = {
                    ...scream, commentCount: updatedCommentCount
                }
                let index = screams.findIndex((scream) => scream.screamId === screamId)
                let newScreamArr = [...screams]
                newScreamArr[index] = updatedScream
                setScreams(newScreamArr)


                // setScream(updatedScream)
                //////////////
                setErrors(null)
            })
            .catch(err => console.log(err))
    }

    // POST A Scream
    const postScream = (newScream) => {
        axios.post('/scream', newScream)
            .then((res) => {
                let newArr = [res.data, ...screams]
                setScreams(newArr)
            })
            .catch(err => {
                setErrors(err.response.data)
            })
    }

    // Get Scream
    const getScream = (screamId) => {
        setScreamLoading(true)
        axios.get(`/scream/${screamId}`)
            .then((res) => {
                setScream(res.data)
                setScreamLoading(false)
                setComments(res.data.comments)
            })
            .catch(err => {
                setScream(null)
                console.log(err)
                setScreamLoading(false)
            })
    }

    // Submit A Comment
    const submitComment = (screamId, commentData) => {
        axios.post(`/scream/${screamId}/comment`, commentData)

            // TODO: update comment count on scream

            .then(res => {
                let updatedComments = [res.data, ...scream.comments]
                let updatedCommentCount = scream.commentCount += 1
                let updatedScream = {
                    ...scream, commentCount: updatedCommentCount, comments: updatedComments
                }
                let index = screams.findIndex((scream) => scream.screamId === screamId)
                let newArr = [...screams]
                newArr[index] = updatedScream
                setScreams(newArr)
                setScream(updatedScream)
                setComments(updatedComments)
                setErrors(null)
            })
            .catch(err => {
                setErrors('Field Required')
            })
    }

    // Get User Profile
    const getUserProfile = (userHandle) => {
        setDataLoading(true)
        axios.get(`/user/${userHandle}`)
            .then(res => {
                setScreams(res.data.userData.screams)
                setDataLoading(false)
            })
            .catch(() => {
                setScreams(null)
                setDataLoading(false)
            })
    }

    const value = {
        // State
        dataLoading,
        errors,
        setErrors,
        dataLoading,
        screamLoading,
        comments,
        setComments,
        // Functions
        screams,
        scream,
        getScreams,
        getScream,
        likeScream,
        unlikeScream,
        deleteScream,
        deleteComment,
        postScream,
        submitComment,
        getUserProfile

    }

    return (
        <DataContext.Provider value={value}>
            {props.children}
        </DataContext.Provider>
    )
}