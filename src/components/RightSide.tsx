import { Container, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { CreateProps } from './Create';

const RightSide: React.FC<CreateProps> = (props: CreateProps): React.ReactElement => {
    return (
        <Grid item xs={6}>
            <Paper sx={{
                padding: 2,
                textAlign: 'center',
            }}>
                {/* Your content for the right side goes here */}
                Right Side
            </Paper>
        </Grid>
    );
}

export default RightSide;