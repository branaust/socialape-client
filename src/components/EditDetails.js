import React, { useState, useEffect, Fragment } from 'react'
import styles from '../styles/EditDetailsStyles'
import { useAuth } from '../contexts/AuthContext'
import useToggleState from '../hooks/useToggleState'
import useInputState from '../hooks/useInputState'
import ToolTipButton from '../components/ToolTipButton'
// MUI
import withStyles from '@material-ui/core/styles/withStyles'
import EditIcon from '@material-ui/icons/Edit'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

function EditDetails(props) {
    const { classes } = props
    const { user, editUserDetails } = useAuth()
    const [bio, updateBio] = useInputState(user.credentials.bio ? user.credentials.bio : '')
    const [website, updateWebsite] = useInputState(user.credentials.website ? user.credentials.website : '')
    const [location, updateLocation] = useInputState(user.credentials.location ? user.credentials.location : '')
    const [open, toggleOpen] = useToggleState(false)


    const handleOpen = () => {
        toggleOpen()
    }

    const handleSubmit = () => {
        const userDetails = {
            bio,
            website,
            location
        }
        editUserDetails(userDetails)
        handleOpen()
    }

    return (
        <Fragment>
            <ToolTipButton tip="Edit Details" placement="top" onClick={handleOpen} tipClassName={classes.button}>
                <EditIcon color="primary" />
            </ToolTipButton>
            <Dialog
                open={open}
                onClose={handleOpen}
                fullWidth
                maxWidth="sm">
                <DialogTitle>Edit Your Details</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField
                            name="bio"
                            type="text"
                            label="bio"
                            multiline
                            rows="3"
                            placeholder="A short bio about yourself"
                            className={classes.textField}
                            value={bio}
                            onChange={updateBio}
                            fullWidth
                        >
                        </TextField>
                        <TextField
                            name="website"
                            type="text"
                            label="Website"
                            placeholder="Your personal/professional website"
                            className={classes.textField}
                            value={website}
                            onChange={updateWebsite}
                            fullWidth
                        >
                        </TextField>
                        <TextField
                            name="location"
                            type="text"
                            label="Location"
                            placeholder="Where you live"
                            className={classes.textField}
                            value={location}
                            onChange={updateLocation}
                            fullWidth
                        >
                        </TextField>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleOpen} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default withStyles(styles)(EditDetails)