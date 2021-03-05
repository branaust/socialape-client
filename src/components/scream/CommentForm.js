import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { useData } from '../../contexts/DataContext'
import { useAuth } from '../../contexts/AuthContext'
import styles from '../../styles/CommentFormStyles'
import useInputState from '../../hooks/useInputState'

// MUI
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'

function CommentForm(props) {

    const { classes, screamId } = props
    const { submitComment, errors } = useData()
    const { authenticated } = useAuth()
    const [body, updateBody, resetBody] = useInputState()

    const handleSubmit = (e) => {
        e.preventDefault()
        const commentData = {
            body,
        }

        submitComment(screamId, commentData)
        resetBody()
    }

    const commentFormMarkup = authenticated ? (
        <Grid item sm={12} className={classes.formGrid}>
            <form onSubmit={handleSubmit}>
                <TextField
                    name="body"
                    type="text"
                    label="Comment on scream"
                    error={errors ? true : false}
                    helperText={errors}
                    value={body}
                    onChange={updateBody}
                    fullWidth
                    className={classes.textField}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                >Submit</Button>
            </form>
            <hr className={classes.visibleSeparator} />
        </Grid>
    ) : null

    return commentFormMarkup
}

export default withStyles(styles)(CommentForm)
