import { Container, Grid, Paper, Typography } from '@mui/material';
import React from 'react';

const LeftSide: React.FC = (): React.ReactElement => {
    return (
        <Grid item xs={6}>
            <Paper sx={{
                padding: 2,
                textAlign: 'center',
            }}>
                {/* Your content for the left side goes here */}
                Left Side
            </Paper>
        </Grid>
    );
}

export default LeftSide;