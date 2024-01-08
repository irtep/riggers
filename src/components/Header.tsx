import { Container, Typography } from '@mui/material';
import React from 'react';

const Header: React.FC = (): React.ReactElement => {
    return (
        <Container sx={{
            background: "darkBlue",
            color: "rgb(170,170,170)",
            borderRadius: 2
        }}>

            <Typography variant="h2">
                * Steelhearts Rig Garage *
            </Typography>

        </Container>
    );
}

export default Header;