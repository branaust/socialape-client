import React, { useState } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import AppIcon from '../images/icon.png'
import useInputState from '../hooks/useInputState'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styles from '../styles/FormStyles'

// MUI
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress';


function Login(props) {
    const { classes } = props
    const [email, updateEmail] = useInputState("")
    const [password, updatePassword] = useInputState("")
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        const userData = {
            email,
            password
        }
        axios.post('/login', userData)
            .then(res => {
                console.log(res.data)
                localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`)
                setLoading(false)
                props.history.push('/')
            })
            .catch(err => {
                setErrors(err.response.data)
                setLoading(false)
                console.log(err.response.data)
            })
    }

    return (
        <Grid container className={classes.form}>
            <Grid item sm />
            <Grid item sm>
                <img className={classes.image} src={AppIcon} alt="monkey" />
                <Typography variant="h2" className={classes.pageTitle}>
                    Login
                </Typography>
                <form noValidate onSubmit={handleSubmit}>
                    <TextField
                        className={classes.textField}
                        onChange={updateEmail}
                        id="email"
                        name="email"
                        label="Email"
                        value={email}
                        helperText={errors.email}
                        error={errors.email ? true : false}
                        fullWidth
                    />
                    <TextField
                        className={classes.textField}
                        onChange={updatePassword}
                        id="password"
                        name="password"
                        label="Password"
                        value={password}
                        helperText={errors.password}
                        error={errors.password ? true : false}
                        type="password"
                        fullWidth
                    />
                    {errors.general && (
                        <Typography variant="body2" className={classes.customError}>
                            {errors.general}
                        </Typography>
                    )}
                    {!loading &&
                        <Button
                            className={classes.button}
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loading}
                        >Login  </Button>
                    }
                    {loading && (
                        <CircularProgress className={classes.progress} />
                    )}
                    <br />
                    <small className={classes.smallLink}>Don't have an account? <Link to="/signup"> Sign Up</Link></small>
                </form>
            </Grid>
            <Grid item sm />
        </Grid>
    )

}

Login.propTypes = {
    classes: PropTypes.object.isRequired
}


export default withStyles(styles)(Login)
