import { Container, Typography } from '@mui/material';
import React, { useContext } from 'react';
import ModeButton from './ModeButton';
import { RigContext } from '../context/RigContext';

const Header: React.FC = (): React.ReactElement => {
    const { device } = useContext(RigContext);

    return (
        <Container sx={{
            background: "rgb(80,80,80)",
            color: "orange",
            borderRadius: 2
        }}>
            {device === 'mobile' ? (
                <>
                    <ModeButton activateWhat='mobile' />
                    <ModeButton activateWhat='laptop' />
                    <Typography align='center'>* R  I  G _ G  A  R  A  G  E *</Typography>
                </>
            ) : (
                <>
                    <ModeButton activateWhat='mobile' />
                    <ModeButton activateWhat='laptop' />
                    <Typography variant="h3" align='center' sx={{ 'padding': 3 }}>* Rig Garage *</Typography>
                </>
            )}
        </Container>
    );
}

export default Header;