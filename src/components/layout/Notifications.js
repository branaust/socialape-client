import React, { useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import styles from '../../styles/NotificationStyles'
import { useAuth } from '../../contexts/AuthContext'
import useToggleState from '../../hooks/useToggleState'


// MUI
import withStyles from '@material-ui/core/styles/withStyles'
import NotificationsIcon from '@material-ui/icons/Notifications'
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Badge from '@material-ui/core/Badge'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ChatIcon from '@material-ui/icons/Chat'

function Notifications(props) {
    const { classes } = props
    const { markNotificationsRead, user } = useAuth()
    const [open, toggleOpen] = useToggleState(false)
    const [anchorEl, setAnchorEl] = useState(null)

    const handleOpen = (e) => {
        toggleOpen()
        setAnchorEl(e.target)
    }

    const onMenuOpened = () => {
        let unreadNotificationIds = user.notifications.filter(n => !n.read).map(n => n.notificationId);
        markNotificationsRead(unreadNotificationIds)
    }

    const notifications = user.notifications
    let notificationsIcon;
    if (user.notifications && user.notifications.length > 0) {
        notifications.filter(n => n.read === false).length > 0 ? (notificationsIcon = (
            <Badge badgeContent={notifications.filter(n => n.read === false).length} color="secondary">
                <NotificationsIcon />
            </Badge>
        )) : (notificationsIcon = (
            <NotificationsIcon />
        ))
    } else {
        notificationsIcon = <NotificationsIcon />
    }

    let notificationsMarkup =
        user.notifications && user.notifications.length > 0 ? (
            user.notifications.map(n => {
                const verb = n.type === 'like' ? 'liked' : 'commented on'
                const time = dayjs(n.createdAt).fromNow()
                const iconColor = n.read ? 'primary' : 'secondary'
                const icon = n.type === 'like' ?
                    (<FavoriteIcon color={iconColor} className={classes.icon} />) :
                    (<ChatIcon color={iconColor} className={classes.icon} />)

                return (
                    <MenuItem key={n.createdAt} onClick={handleOpen}>
                        {icon}
                        <Typography
                            component={Link}
                            color="primary"
                            variant="body1"
                            to={`/users/${n.recipient}/scream/${n.screamId}`}
                        >
                            {n.sender} {verb} your scream {time}
                        </Typography>
                    </MenuItem>
                )
            })
        ) : (
            <MenuItem onClick={handleOpen}>
                You have no notifications
            </MenuItem>
        )

    return (
        <Fragment>
            <Tooltip placement="top" title="Notifications">
                <IconButton aria-owns={anchorEl ? 'simple-menu' : undefined} aria-haspopup="true" onClick={handleOpen}>
                    {notificationsIcon}
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleOpen}
                onEntered={onMenuOpened}
            >
                {notificationsMarkup}
            </Menu>

        </Fragment>
    )
}

export default withStyles(styles)(Notifications)
