import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
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


function Signup(props) {
    const { classes } = props
    const { email,
        updateEmail,
        handle,
        updateHandle,
        password,
        updatePassword,
        confirmPassword,
        updateConfirmPassword,
        loading,
        errors,
        handleSignup
    } = useAuth()



    return (
        <Grid container className={classes.form}>
            <Grid item sm />
            <Grid item sm>
                <img className={classes.image} src={AppIcon} alt="monkey" />
                <Typography variant="h2" className={classes.pageTitle}>
                    Signup
                </Typography>
                <form noValidate onSubmit={handleSignup}>
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
                    <TextField
                        className={classes.textField}
                        onChange={updateConfirmPassword}
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirm Password"
                        value={confirmPassword}
                        helperText={errors.confirmPassword}
                        error={errors.confirmPassword ? true : false}
                        type="password"
                        fullWidth
                    />
                    <TextField
                        className={classes.textField}
                        onChange={updateHandle}
                        name="handle"
                        label="User Handle"
                        value={handle}
                        helperText={errors.hHandle}
                        error={errors.handle ? true : false}
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
                        >Signup  </Button>
                    }
                    {loading && (
                        <CircularProgress className={classes.progress} />
                    )}
                    <br />
                    <small className={classes.smallLink}>Already have an account? <Link to="/login">Login</Link></small>
                </form>
            </Grid>
            <Grid item sm />
        </Grid>
    )

}

Signup.propTypes = {
    classes: PropTypes.object.isRequired
}


export default withStyles(styles)(Signup)
