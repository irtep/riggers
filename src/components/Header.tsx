import { Container, Typography } from '@mui/material';
import React from 'react';

const Header: React.FC = (): React.ReactElement => {
    return (
        <Container sx={{
            background: "rgb(80,80,80)",
            color: "orange",
            borderRadius: 2
        }}>

            <Typography variant="h2" align='center'>
                * Steelhearts Rig Garage *
            </Typography>

        </Container>
    );
}

export default Header;