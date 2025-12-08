import { Button, Container, Typography } from '@mui/material';
import React, { useContext } from 'react';
import ModeButton from './ModeButton';
import Links from './Links';
import { RigContext } from '../context/RigContext';

const UserControlButtons: React.FC = (): React.ReactElement => {
    const {
        setMode,
        userDetails,
        logUserOut
    } = useContext(RigContext);

    return (
        <Container sx={{
            background: "rgb(80,80,80)",
            color: "orange",
            borderRadius: 2
        }}>
            {
                userDetails.username ?
                    <>
                        {`username: ${userDetails.username}`}
                        <Button
                            onClick={logUserOut}
                        >log out</Button>
                        <Button
                            onClick={() => {
                                setMode('controlUsers');
                            }}
                        >
                            settings
                        </Button>
                    </> :
                    <>
                        <Button
                            sx={{ color: 'white' }}
                            onClick={() => {
                                setMode('login');
                            }}
                        >
                            login
                        </Button>

                        <Button
                            sx={{ color: 'white' }}
                            onClick={() => {
                                setMode('register');
                            }}
                        >
                            register
                        </Button>
                    </>
            }

        </Container>
    );
}

export default UserControlButtons;