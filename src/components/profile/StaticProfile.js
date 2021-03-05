import React, { Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import styles from '../../styles/userStyles'
import dayjs from 'dayjs'
import { useAuth } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'
import ToolTipButton from '../scream/ToolTipButton'

// MUI
import MuiLink from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'
import EditIcon from "@material-ui/icons/Edit"
import KeyboardReturn from '@material-ui/icons/KeyboardReturn'

function StaticProfile(props) {

    const { classes, profile: { handle, createdAt, imageUrl, bio, website, location } } = props
    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img src={imageUrl} alt="profile" className="profile-image" />
                </div>
                <hr />
                <div className='profile-details'>
                    <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
                        @{handle}
                    </MuiLink>
                    <hr />
                    {bio && <Typography variant="body2" component={'span'}>{bio}</Typography>}
                    <hr />
                    {location && (
                        <Fragment>
                            <LocationOn color="primary" /> <span>{location}</span>
                            <hr />
                        </Fragment>
                    )}
                    {website && (
                        <Fragment>
                            <LinkIcon color="primary" />
                            <a href={website} target="_blank" rel="noopener noreferrer" >
                                {' '}{website}
                            </a>
                            <hr />
                        </Fragment>
                    )}
                    <CalendarToday color="primary" />{' '}
                    <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                </div>
            </div>
        </Paper >
    )
}


export default withStyles(styles)(StaticProfile)