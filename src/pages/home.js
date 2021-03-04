import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import Scream from '../components/Scream.js'
import Profile from '../components/Profile.js'
import { useData } from '../contexts/DataContext'
import { useAuth } from '../contexts/AuthContext'


function Home() {


    const { screams, dataLoading, getScreams } = useData()
    const { user } = useAuth()

    let recentScreamsMarkup = !dataLoading ?
        (screams.map(scream => <Scream scream={scream} key={scream.screamId} />)) : <p>Loading...</p>

    useEffect(() => {
        getScreams()
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
