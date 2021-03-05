import React from 'react'
import { useData } from '../contexts/DataContext'
import { useAuth } from '../contexts/AuthContext'
import ToolTipButton from '../components/ToolTipButton'
import { Link } from 'react-router-dom'

// MUI
import FavoriteFilled from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'

function LikeButton(props) {
    const { screamId } = props
    const { likeScream, unlikeScream } = useData()
    const { user, authenticated } = useAuth()


    const likedScream = () => {
        if (user.likes && user.likes.find(like => like.screamId === screamId)) {
            return true
        } else return false
    }

    const userLikeScream = () => {
        likeScream(screamId)

    }
    const userUnlikeScream = () => {
        unlikeScream(screamId)
    }

    return (
        !authenticated ? (
            <Link to="/login">
                <ToolTipButton tip="Like">

                    <FavoriteBorder color="primary" />
                </ToolTipButton >
            </Link >
        ) : (
                likedScream() ? (
                    <ToolTipButton tip="Unlike" onClick={userUnlikeScream}>
                        <FavoriteFilled color="primary" />
                    </ToolTipButton>
                ) : (
                        <ToolTipButton tip="Like" onClick={userLikeScream}>
                            <FavoriteBorder color="primary" />
                        </ToolTipButton>
                    )
            )
    )
}

export default LikeButton