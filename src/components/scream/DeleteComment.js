import React, { Fragment } from 'react'
import ToolTipButton from './ToolTipButton'
import { useData } from '../../contexts/DataContext'
import useToggleState from '../../hooks/useToggleState'

// MUI
import withStyles from '@material-ui/core/styles/withStyles'
import styles from '../../styles/DeleteScreamStyles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import ClearIcon from '@material-ui/icons/Clear';

function DeleteComment(props) {

    const { classes, commentId } = props
    const { deleteComment } = useData()
    const [open, toggleOpen] = useToggleState(false)

    const handleOpen = () => {
        toggleOpen()
    }

    const deleteSelectedComment = () => {
        deleteComment(props.commentId)
        handleOpen()
    }

    return (

        <Fragment>
            <ToolTipButton tip="Delete Comment" onClick={handleOpen} btnClassName={classes.deleteButton}>
                <ClearIcon color="secondary" />
            </ToolTipButton>
            <Dialog open={open} onClose={handleOpen} fullWidth maxWidth="sm">
                <DialogTitle>
                    Are you sure you want to delete this comment?
                    </DialogTitle>
                <DialogActions>
                    <Button onClick={handleOpen} color="primary">
                        Cancel
                        </Button>
                    <Button onClick={deleteSelectedComment} color="secondary">
                        Delete
                        </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default withStyles(styles)(DeleteComment)
