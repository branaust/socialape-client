import React from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import styles from '../styles/CardStyles'
import { useData } from '../contexts/DataContext'
import { useAuth } from '../contexts/AuthContext'
import ToolTipButton from '../components/ToolTipButton'
import DeleteScream from '../components/DeleteScream'
import ScreamDialog from '../components/ScreamDialog'

// MUI
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography'
import ChatIcon from '@material-ui/icons/Chat'
import FavoriteFilled from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'


function Scream(props) {
    dayjs.extend(relativeTime)
    const { classes,
        scream: {
            body,
            createdAt,
            userImage,
            userHandle,
            screamId,
            likeCount,
            commentCount }
    } = props

    const { user, authenticated, loading } = useAuth()
    const { likeScream, unlikeScream } = useData()

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

    const likeButton = !authenticated ? (
        <ToolTipButton tip="Like">
            <Link to="/login">
                <FavoriteBorder color="primary" />
            </Link>
        </ToolTipButton>
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

    const deleteButton = !loading && authenticated ? (userHandle === user.credentials.handle &&
        <DeleteScream screamId={screamId} />
    ) : null

    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.image}
                image={userImage}
                title='Profile Image'
                component={'span'}
            />

            <CardContent className={classes.content}>
                <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color='primary'>
                    {userHandle}
                </Typography>
                {deleteButton}
                <Typography variant="body2" color="textSecondary">
                    {dayjs(createdAt).fromNow()}
                </Typography>
                <Typography variant="body1" >
                    {body}
                </Typography>
                {likeButton}
                <span>{likeCount} Likes</span>
                <ToolTipButton tip="comments">
                    <ChatIcon color="primary" />
                </ToolTipButton>
                <span>{commentCount} Comments</span>
                <ScreamDialog screamId={screamId} userHandle={userHandle} />
            </CardContent>
        </Card >

    )
}

export default withStyles(styles)(Scream)
