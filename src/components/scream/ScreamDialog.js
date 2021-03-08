import React, { Fragment, useEffect, useState } from 'react'
import styles from '../../styles/ScreamDialogStyles'
import ToolTipButton from './ToolTipButton'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { useData } from '../../contexts/DataContext'
import useToggleState from '../../hooks/useToggleState'
import LikeButton from './LikeButton'
import Comments from './Comments'
import CommentForm from './CommentForm'

// MUI
import withStyles from '@material-ui/core/styles/withStyles'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import CircularProgress from '@material-ui/core/CircularProgress'
import CloseIcon from '@material-ui/icons/Close'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import UnfoldMore from '@material-ui/icons/UnfoldMore'
import ChatIcon from '@material-ui/icons/Chat'

function ScreamDialog(props) {

    const { screamId, userHandle, openDialog, classes } = props
    const { getScream, scream, screamLoading, setErrors, comments } = useData()
    const [open, toggleOpen] = useToggleState(false)
    const [oldPath, setOldPath] = useState('')
    const [newPath, setNewPath] = useState('')

    const handleOpen = () => {
        toggleOpen()
        let oldPath = window.location.pathname;
        const newPath = `/users/${userHandle}/scream/${screamId}`
        if (oldPath === newPath) oldPath = `/users/${userHandle}`
        window.history.pushState(null, null, newPath)
        setOldPath(oldPath)
        setNewPath(newPath)

        getScream(screamId)
        setErrors(null)

    }

    const handleClose = () => {
        toggleOpen()
        window.history.pushState(null, null, oldPath)
    }


    const dialogMarkup = screamLoading ? (
        <div className={classes.spinnerDiv}>
            <CircularProgress size={200} thickness={2} />
        </div>
    ) : (
        <Grid container spacing={16}>
            <Grid item sm={5}>
                <img src={scream.userImage} alt="profile" className={classes.profileImage} />
            </Grid >
            <Grid item sm={7} className={classes.body}>
                <Typography component={Link} color="primary" variant="h5" to={`/users/${userHandle}`} >
                    @{scream.userHandle}
                </Typography>
                <hr className={classes.invisibleSeparator} />
                <Typography variant="body2" color="textSecondary" >
                    {dayjs(scream.createdAt).format('h:mm a, MMMM DD YYYY')}
                </Typography>
                <hr className={classes.invisibleSeparator} />
                <Typography variant="body1">
                    {scream.body}
                </Typography>
                <LikeButton screamId={screamId} />
                <span>{scream.likeCount} likes</span>
                <ToolTipButton tip="Comments">
                    <ChatIcon color="primary" />
                </ToolTipButton>
                <span>{scream.commentCount} comments</span>
            </Grid>
            <hr className={classes.visibleSeparator} />
            <CommentForm screamId={screamId} />
            <Comments comments={comments} />
        </Grid >
    )

    useEffect(() => {
        if (openDialog) {
            handleOpen()

        }
    }, [])

    return (
        <Fragment>
            <ToolTipButton onClick={handleOpen} tip="Expand Scream" tipClassName={classes.expandButton}>
                <UnfoldMore color="primary" />
            </ToolTipButton>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
            >
                <ToolTipButton tip="Close" onClick={handleOpen} tipClassName={classes.closeButton}>
                    <CloseIcon />
                </ToolTipButton>
                <DialogContent className={classes.dialogContent}>
                    {dialogMarkup}
                </DialogContent>


            </Dialog>
        </Fragment>
    )
}


export default withStyles(styles)(ScreamDialog)