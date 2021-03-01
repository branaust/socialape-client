import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'


function Home() {

    useEffect(() => {
        axios.get('/screams')
            .then(res => {
                setScreams(res.data)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const [screams, setScreams] = useState(null)
    let recentScreamsMarkup = screams ?
        (screams.map(scream => <p>{scream.body}</p>)) : <p>Loading...</p>

    return (
        <Grid container spacing={10}>
            <Grid item sm={8} xs={12}>
                {recentScreamsMarkup}
            </Grid>
            <Grid item sm={4} xs={12}>
                <p>Profile</p>
            </Grid>
        </Grid>
    )
}





export default Home
