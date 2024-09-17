import { Container } from '@mui/material';
import React, { useContext } from 'react';
import { RigContext } from '../../context/RigContext';
import LaptopCreate from './LaptopCreate';
import MobileCreate from './MobileCreate';

const Create: React.FC = (): React.ReactElement => {

    const { device } = useContext(RigContext);

    return (
        <Container sx={{
            background: "rgb(80,80,80)",
            color: "rgb(180,180,180)",
            borderRadius: 2
        }}>
            {
                (device === 'laptop') ?
                    <LaptopCreate/> :
                    <MobileCreate/>
            }
        </Container>
    );
}

export default Create;