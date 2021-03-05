import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Scream from '../components/scream/Scream'
import { useData } from '../contexts/DataContext'
import styles from '../styles/userStyles'
import StaticProfile from '../components/profile/StaticProfile'
import withStyles from '@material-ui/core/styles/withStyles'

// MUI
import Grid from '@material-ui/core/Grid'

function User(props) {

    const { classes } = props
    const { getUserProfile, screams, dataLoading } = useData()
    const [profile, setProfile] = useState(null)

    let screamsMarkup = !dataLoading ? (screams === null ? (<p>This User Has Not Posted Any Scream</p>) :
        (screams.map(scream => <Scream scream={scream} key={scream.screamId} />))) : <p>Loading...</p>

    useEffect(() => {
        const handle = props.match.params.handle
        getUserProfile(handle)
        axios.get(`/user/${handle}`)
            .then(res => {
                setProfile(res.data.userData.user)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <Grid container spacing={10}>
            <Grid item sm={8} xs={12}>
                {screamsMarkup}
            </Grid>
            <Grid item sm={4} xs={12}>
                {profile === null ? (
                    <p>Loading Profile...</p>
                ) : <StaticProfile profile={profile} />}
            </Grid>
        </Grid>
    )
}


export default withStyles(styles)(User)