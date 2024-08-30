import { Button, Container, Typography } from '@mui/material';
import React, { useContext } from 'react';
import ModeButton from './ModeButton';
import Links from './Links';
import { RigContext } from '../context/RigContext';

const Header: React.FC = (): React.ReactElement => {
    const { device, setMode, mode } = useContext(RigContext);

    return (
        <Container sx={{
            background: "rgb(80,80,80)",
            color: "orange",
            borderRadius: 2
        }}> 
            {
                mode === 'testRigs' ?
                    <>
                        <Button
                            onClick={() => {
                                setMode('main');
                            }}
                        >Back to main menu</Button>
                    </> :
                    <>
                        {
                            device === 'mobile' ? (
                                <>
                                    <ModeButton activateWhat='mobile' />
                                    <ModeButton activateWhat='laptop' />
                                    <Links/>
                                    <Typography align='center'>* R  I  G _ G  A  R  A  G  E *</Typography>
                                </>
                            ) : (
                                <>
                                    <ModeButton activateWhat='mobile' />
                                    <ModeButton activateWhat='laptop' />
                                    <Button
                                        sx={{
                                            color: 'black',
                                            background: 'darkRed'
                                        }}
                                        onClick={() => {
                                            setMode('testRigs');
                                        }}
                                    >Test rigs</Button>
                                    <Links/>
                                    <Typography variant="h3" align='center' sx={{ 'padding': 3 }}>* Rig Garage *</Typography>
                                </>
                            )
                        }
                    </>
            }
        </Container>
    );
}

export default Header;