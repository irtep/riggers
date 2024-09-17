import { Container } from '@mui/material';
import React, { useContext } from 'react';
import { RigContext } from '../../context/RigContext';
import LeftSide from './LeftSide';
import MobileShowRig from './MobileShowRig';

const MobileCreate: React.FC = (): React.ReactElement => {
    
    const { rigObject } = useContext(RigContext);

    if (rigObject) {
        return (
            <Container>
                <MobileShowRig/>
                <LeftSide/>
            </Container>
        );
    } else {
        return (
            <></>
        );
    }

}

export default MobileCreate;