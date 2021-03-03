import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import Scream from '../components/Scream.js'
import Profile from '../components/Profile.js'


function Home() {

    useEffect(() => {
        axios.get('/screams')
            .then(res => {
                setScreams(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const [screams, setScreams] = useState(null)
    let recentScreamsMarkup = screams ?
        (screams.map(scream => <Scream scream={scream} key={scream.screamId} />)) : <p>Loading...</p>

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
