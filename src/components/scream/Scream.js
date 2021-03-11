import React from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import styles from '../../styles/CardStyles'
import { useAuth } from '../../contexts/AuthContext'
import ToolTipButton from './ToolTipButton'
import DeleteScream from './DeleteScream'
import ScreamDialog from './ScreamDialog'
import LikeButton from './LikeButton'
import { useData } from '../../contexts/DataContext'

// MUI
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography'
import ChatIcon from '@material-ui/icons/Chat'



function Scream(props) {
    dayjs.extend(relativeTime)
    const { comments } = useData

    const { classes,
        scream: {
            body,
            createdAt,
            userImage,
            userHandle,
            screamId,
            likeCount,
            commentCount,
        }, openDialog
    } = props

    const { user, authenticated, loading } = useAuth()

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
                <LikeButton screamId={screamId} />
                <span>{likeCount} Likes</span>
                <ToolTipButton tip="comments">
                    <ChatIcon color="primary" />
                </ToolTipButton>
                <span>{commentCount} Comments</span>
                <ScreamDialog screamId={screamId} userHandle={userHandle} openDialog={openDialog} />
            </CardContent>
        </Card >

    )
}

export default withStyles(styles)(Scream)
