import React, { Fragment } from 'react'
import styles from '../styles/ScreamDialogStyles'
import ToolTipButton from '../components/ToolTipButton'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { useData } from '../contexts/DataContext'
import useToggleState from '../hooks/useToggleState'

// MUI
import withStyles from '@material-ui/core/styles/withStyles'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import CircularProgress from '@material-ui/core/CircularProgress'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CloseIcon from '@material-ui/icons/Close'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import UnfoldMore from '@material-ui/icons/UnfoldMore'


function ScreamDialog(props) {

    const { screamId, userHandle, classes } = props
    const { getScream, scream, screamLoading } = useData()
    const [open, toggleOpen] = useToggleState(false)

    const handleOpen = () => {
        toggleOpen()
        getScream(screamId)
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
                </Grid>
            </Grid >
        )

    return (
        <Fragment>
            <ToolTipButton onClick={handleOpen} tip="Expand Scream" tipClassName={classes.expandButton}>
                <UnfoldMore color="primary" />
            </ToolTipButton>
            <Dialog
                open={open}
                onClose={handleOpen}
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