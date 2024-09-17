import { Container, CssBaseline, Grid } from '@mui/material';
import React from 'react';
import LaptopShowRig from './LaptopShowRig';
import LeftSide from './LeftSide';
import RightSide from './RightSide';

const LaptopCreate: React.FC = (): React.ReactElement => {
    return (
        <>
            <LaptopShowRig/>

            <Container component="main" sx={{
                minHeight: '100vh',
            }}>
                <CssBaseline />
                <Grid container spacing={3}>
                    <LeftSide/>
                    <RightSide/>
                </Grid>
            </Container>
        </>
    );
}

export default LaptopCreate;