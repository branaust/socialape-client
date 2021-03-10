import React, { Fragment } from 'react'
import styles from '../../styles/CommentsStyles'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import DeleteComment from '../../components/scream/DeleteComment'
import { useData } from '../../contexts/DataContext'
import { useAuth } from '../../contexts/AuthContext'

// MUI
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'


function Comments(props) {

    const { classes, comments } = props
    const { authenticated, user } = useAuth()
    const { loading } = useData()



    return (
        <Grid container>
            {comments.map((comment, index) => {
                const { body, createdAt, userImage, userHandle, commentId } = comment;
                return (
                    <Fragment key={createdAt}>
                        <Grid item sm={12}>
                            <Grid container >
                                <Grid item sm={2}>
                                    <img src={userImage} alt="comment" className={classes.commentImage} />
                                </Grid>
                                <Grid item sm={9}>
                                    <div className={classes.commentData}>
                                        <Typography
                                            variant='h5'
                                            component={Link}
                                            to={`/users/${userHandle}`}
                                            color="primary"
                                        >
                                            {userHandle}
                                        </Typography>
                                        {!loading && authenticated ? (comment.userHandle === user.credentials.handle && <DeleteComment commentId={commentId} />) : null}
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                        >
                                            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                                        </Typography>
                                        <hr className={classes.invisibleSeparator} />
                                        <Typography variant="body1">{body}</Typography>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                        {index !== comments.length - 1 && (<hr className={classes.visibleSeparator} />)}
                    </Fragment>
                )
            })}
        </Grid>
    )
}

export default withStyles(styles)(Comments)
