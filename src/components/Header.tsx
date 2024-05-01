import { Container, Typography } from '@mui/material';
import React from 'react';
import ModeButton from './ModeButton';

interface HeaderProps {
    device: 'mobile' | 'laptop';
    setDevice: (value: any) => void;
}

const Header: React.FC<HeaderProps> = (props: HeaderProps): React.ReactElement => {

    return (

        <Container sx={{
            background: "rgb(80,80,80)",
            color: "orange",
            borderRadius: 2
        }}>

            {
                (props.device === 'mobile') ?
                    <>
                        <ModeButton
                            activateWhat='mobile'
                            device={props.device}
                            setDevice={props.setDevice}
                        />

                        <ModeButton
                            activateWhat='laptop'
                            device={props.device}
                            setDevice={props.setDevice}
                        />

                        <Typography align='center'>
                            * R  I  G _ G  A  R  A  G  E *
                        </Typography>
                    </> :
                    <>
                        <ModeButton
                            activateWhat='mobile'
                            device={props.device}
                            setDevice={props.setDevice}
                        />

                        <ModeButton
                            activateWhat='laptop'
                            device={props.device}
                            setDevice={props.setDevice}
                        />

                        <Typography variant="h3" align='center' sx={{ 'padding': 3 }}>
                            * Rig Garage *
                        </Typography>
                    </>
            }

        </Container>
    );
}

export default Header;