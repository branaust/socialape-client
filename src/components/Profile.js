import React, { Fragment } from 'react'
import { useAuth } from '../contexts/AuthContext'
import styles from '../styles/ProfileStyles'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

// MUI
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import MuiLink from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'
import IconButton from "@material-ui/core/IconButton"
import EditIcon from "@material-ui/icons/Edit"
import Tooltip from '@material-ui/core/Tooltip';


function Profile(props) {
    const { classes } = props
    const { user, loading, setLoading, authenticated, logoutUser, uploadImage } = useAuth()
    const { credentials } = user
    // TODO: Destructure ^^^ 

    const handleImageChange = (e) => {
        const image = e.target.files[0]
        const formData = new FormData();
        formData.append('image', image, image.name);
        uploadImage(formData)
        setLoading(false)
    }

    const handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput')
        fileInput.click()
    }

    let profileMarkup = !loading ? (authenticated ? (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img src={credentials.imageUrl} alt="profile" className="profile-image" />
                    <input type="file" id="imageInput" onChange={handleImageChange} hidden="hidden" />
                    <Tooltip title="Edit Image" placement="top-end">
                        <IconButton onClick={handleEditPicture} className="button">
                            <EditIcon color="primary" />
                        </IconButton>
                    </Tooltip>
                </div>
                <hr />
                <div className='profile-details'>
                    <MuiLink component={Link} to={`/users/${credentials.handle}`} color="primary" variant="h5">
                        @{credentials.handle}
                    </MuiLink>
                    <hr />
                    {credentials.bio && <Typography variant="body2">{credentials.bio}</Typography>}
                    <hr />
                    {credentials.location && (
                        <Fragment>
                            <LocationOn color="primary" /> <span>{credentials.location}</span>
                            <hr />
                        </Fragment>
                    )}
                    {credentials.website && (
                        <Fragment>
                            <LinkIcon color="primary" />
                            <a href={credentials.website} target="_blank" rel="noopener noreferrer" >
                                {' '}{credentials.website}
                            </a>
                            <hr />
                        </Fragment>
                    )}
                    <CalendarToday color="primary" />{' '}
                    <span>Joined {dayjs(credentials.createdAt).format('MMM YYYY')}</span>
                </div>
            </div>
        </Paper >
    ) : (
            <Paper className={classes.paper}>
                <Typography variant="body2" align="center">
                    No Profile Found, Please login again
                    <div className={classes.buttons}>
                        <Button variant="contained" color="primary" component={Link} to="/login">
                            Login
                        </Button>
                        <Button variant="contained" color="secondary" component={Link} to="/signup">
                            Signup
                        </Button>
                    </div>
                </Typography>
            </Paper>
        )) : (<p>loading...</p>)

    return (
        <div>
            {profileMarkup}
        </div>
    )
}

export default withStyles(styles)(Profile)