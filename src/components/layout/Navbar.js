import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import ToolTipButton from '../scream/ToolTipButton'
import PostScream from '../scream/PostScream'
import Notifications from './Notifications'

// MUI
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import HomeIcon from '@material-ui/icons/Home'


export default function Navbar() {

    const { authenticated } = useAuth()

    return (
        <AppBar>
            <Toolbar className="nav-container">
                {authenticated ? (
                    <Fragment>
                        <PostScream />
                        <ToolTipButton tip="Home">
                            <Link to="/">
                                <HomeIcon color="primary" />
                            </Link>
                        </ToolTipButton>
                        <Notifications />
                    </Fragment>
                ) : (
                    <Fragment>
                        <Button color="inherit" component={Link} to="/">Home</Button>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                        <Button color="inherit" component={Link} to="/signup">Signup</Button>
                    </Fragment>
                )
                }
            </Toolbar >
        </AppBar >
    )
}
