import React, { Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import ToolTipButton from './ToolTipButton'
import { useData } from '../../contexts/DataContext'
import styles from '../../styles/DeleteScreamStyles'
import useToggleState from '../../hooks/useToggleState'

// MUI
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DeleteOutline from '@material-ui/icons/DeleteOutline'



function DeleteScream(props) {
    const { classes } = props
    const { deleteScream } = useData()
    const [open, toggleOpen] = useToggleState(false)

    const handleOpen = () => {
        toggleOpen()
    }

    const deleteSelectedScream = () => {
        deleteScream(props.screamId)
        handleOpen()
    }

    return (
        <Fragment>
            <ToolTipButton tip="Delete Scream" onClick={handleOpen} btnClassName={classes.deleteButton}>
                <DeleteOutline color="secondary" />
            </ToolTipButton>
            <Dialog open={open} onClose={handleOpen} fullWidth maxWidth="sm">
                <DialogTitle>
                    Are you sure you want to delete this scream?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleOpen} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={deleteSelectedScream} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default withStyles(styles)(DeleteScream)
