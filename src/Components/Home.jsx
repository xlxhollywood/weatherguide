import React from 'react';
import { Container, Typography, Box } from '@material-ui/core';


const Home = () => {
    return (
        <Container maxWidth="lg">
            <Box my={5}>
                <Typography variant="h3" component="h2" align="center">Weather in K-Landmarks</Typography>
                <Typography component="h2" align="center">developed by Yonggi</Typography>

                <Box my={2}>
                    <Typography component="h3" align="center">Team Project</Typography>
                </Box>

            </Box>
        </Container>
    )
}

export default Home;