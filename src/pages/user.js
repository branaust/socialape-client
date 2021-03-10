import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Scream from '../components/scream/Scream'
import { useData } from '../contexts/DataContext'
import styles from '../styles/userStyles'
import StaticProfile from '../components/profile/StaticProfile'
import withStyles from '@material-ui/core/styles/withStyles'
import ScreamSkeleton from '../util/ScreamSkeleton'
import ProfileSkeleton from '../util/ProfileSkeleton'

// MUI
import Grid from '@material-ui/core/Grid'

function User(props) {

    const { classes } = props
    const { getUserProfile, screams, dataLoading } = useData()
    const [profile, setProfile] = useState(null)
    const [screamIdParam, setScreamIdParam] = useState(null)

    let screamsMarkup = dataLoading ? (
        <ScreamSkeleton />
    ) : screams === null ? (
        <p>This User Has Not Yet Posted Any Screams</p>
    ) : !screamIdParam ? (
        screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
    ) : (
        screams.map(scream => {
            if (scream.screamId !== screamIdParam)
                return <Scream key={scream.screamId} scream={scream} />
            else {
                return <Scream key={scream.screamId} scream={scream} openDialog />
            }
        })
    )

    useEffect(() => {
        const handle = props.match.params.handle
        const screamId = props.match.params.screamId

        if (screamId) setScreamIdParam(screamId)
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
                    <ProfileSkeleton />
                ) : <StaticProfile profile={profile} />}
            </Grid>
        </Grid>
    )
}


export default withStyles(styles)(User)