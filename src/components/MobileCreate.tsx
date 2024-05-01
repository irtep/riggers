import { Container } from '@mui/material';
import React from 'react';
import { RigObject } from './Main';
import LeftSide from './LeftSide';
import MobileShowRig from './MobileShowRig';

interface PropsForThis {
    setRigObject: any;
    rigObject: RigObject;
    hovered: any;
    setHovered: (value: any) => void;
    saveRig: any;
    setMode: (value: 'main' | 'create' | 'edit') => void;
    mode: string;
    device: 'mobile' | 'laptop';
}

const MobileCreate: React.FC<PropsForThis> = (props: PropsForThis): React.ReactElement => {

    if (props.rigObject) {
        return (
            <Container>
                <MobileShowRig
                    rigObject={props.rigObject}
                    setHovered={props.setHovered}
                />
                <LeftSide
                    rigObject={props.rigObject}
                    setRigObject={props.setRigObject}
                    setHovered={props.setHovered}
                    hovered={props.hovered}
                    saveRig={props.saveRig}
                    setMode={props.setMode}
                    mode={props.mode}
                    device={props.device}
                />
            </Container>
        );
    } else {
        return (
            <></>
        );
    }

}

export default MobileCreate;