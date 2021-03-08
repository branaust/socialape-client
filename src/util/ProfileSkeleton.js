import React, { Fragment } from 'react'
import styles from '../styles/ScreamSkeletonStyles'

// MUI
import withStyles from '@material-ui/core/styles/withStyles'
import NoImg from '../images/no-img.png'
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'
import Paper from '@material-ui/core/Paper'


function ProfileSkeleton(props) {

    const { classes } = props

    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className={classes.wrapper}>
                    <img src={NoImg} alt="profile" className={classes.image} />
                </div>
                <hr className={classes.hr} />
                <div className={classes.details}>
                    <div className={classes.handle} />
                    <hr className={classes.hr} />
                    <div className={classes.fullLine} />
                    <div className={classes.fullLine} />
                    <hr className={classes.hr} />
                    <hr className={classes.hr} />
                    <hr className={classes.hr} />

                </div>
            </div>

        </Paper>
    )
}

export default withStyles(styles)(ProfileSkeleton)