import React, { Fragment } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useData } from '../contexts/DataContext'
import useToggleState from '../hooks/useToggleState'
import useInputState from '../hooks/useInputState'
import ToolTipButton from '../components/ToolTipButton'
import styles from '../styles/PostScreamStyles'
// MUI
import withStyles from '@material-ui/core/styles/withStyles'
import EditIcon from '@material-ui/icons/Edit'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import CircularProgress from '@material-ui/core/CircularProgress'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'

function PostScream(props) {

    const { classes } = props
    const { user } = useAuth()
    const { postScream, errors, setErrors, dataLoading, loading } = useData()
    const [open, toggleOpen] = useToggleState()
    const [screamBody, updateScreamBody, resetScreamBody] = useInputState()

    const handleOpen = () => {
        toggleOpen()
        setErrors(null)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        postScream({ body: screamBody })
        resetScreamBody()
        if (!errors) {
            handleOpen()
        }
    }

    return (
        <Fragment>
            <ToolTipButton onClick={handleOpen} tip="Post A Scream">
                <AddIcon />
            </ToolTipButton>
            <Dialog open={open} onClose={handleOpen} fullWidth maxWidth="sm">
                <ToolTipButton onClick={handleOpen} tip="close" tipClassName={classes.closeButton}>
                    <CloseIcon color="secondary" />
                </ToolTipButton>
                <DialogTitle className={classes.title}>Post a new scream</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            name="screamBody"
                            type="text"
                            label="Scream"
                            multiline
                            rows="3"
                            placeholder="YOUR SCREAM"
                            error={errors ? true : false}
                            helperText={errors ? 'Field Required' : null}
                            className={classes.textField}
                            onChange={updateScreamBody}
                            fullWidth
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submitButton}
                            disabled={dataLoading}
                        >
                            {dataLoading && (<CircularProgress className={classes.progressSpinner} />)}
                                Submit
                                </Button>


                    </form>
                </DialogContent>

            </Dialog>
        </Fragment>
    )
}

export default withStyles(styles)(PostScream)