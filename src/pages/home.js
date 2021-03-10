import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Scream from '../components/scream/Scream.js'
import Profile from '../components/profile/Profile.js'
import { useData } from '../contexts/DataContext'
import ScreamSkeleton from '../util/ScreamSkeleton'
import ProfileSkeleton from '../util/ProfileSkeleton'

function Home() {
    const { screams, dataLoading, getScreams } = useData()

    let recentScreamsMarkup = !dataLoading ?
        (screams.map(scream => <Scream scream={scream} key={scream.screamId} />)) : <ScreamSkeleton />

    useEffect(() => {
        getScreams()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Grid container spacing={10}>
            <Grid item sm={8} xs={12}>
                {recentScreamsMarkup}
            </Grid>
            <Grid item sm={4} xs={12}>
                <Profile />
            </Grid>
        </Grid>
    )
}





export default Home