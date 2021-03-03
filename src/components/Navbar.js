import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import ToolTipButton from './ToolTipButton'

// MUI
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import HomeIcon from '@material-ui/icons/Home'
import Notifications from '@material-ui/icons/Notifications'

export default function Navbar() {

    const { authenticated } = useAuth()

    return (
        <AppBar>
            <Toolbar className="nav-container">
                {authenticated ? (
                    <Fragment>
                        <ToolTipButton tip="Post New Scream">
                            <AddIcon color="primary" />
                        </ToolTipButton>
                        <ToolTipButton tip="Home">
                            <Link to="/">
                                <HomeIcon color="Primary" />
                            </Link>
                        </ToolTipButton>
                        <ToolTipButton tip="Notifications">
                            <Notifications color="primary" />
                        </ToolTipButton>
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
