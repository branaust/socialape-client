import { useAuth } from '../contexts/AuthContext'
import React, { useState, useEffect } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import AppIcon from '../images/icon.png'
import { Link } from 'react-router-dom'
import styles from '../styles/FormStyles'

// MUI
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress';

function Login(props) {

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.UI.errors) {
    //         setErrors(nexProps.UI.errors)
    //     }
    // }

    useEffect(() => {
        setErrors(props.UI.errors)
    }, [props.UI.errors])


    return (
        <Grid container className={classes.form}>
            <Grid item sm />
            <Grid item sm>
                <img className={classes.image} src={AppIcon} alt="monkey" />
                <Typography variant="h2" className={classes.pageTitle}>
                    Login
                </Typography>
                <form noValidate onSubmit={handleLogin}>
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
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Login))
