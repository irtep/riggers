import { Container } from '@mui/material';
import React from 'react';
import { RigObject } from './Main';
import LaptopCreate from './LaptopCreate';
import MobileCreate from './MobileCreate';

export interface CreateProps {
    setRigObject: any;
    rigObject: RigObject;
    hovered: any;
    setHovered: (value: any) => void;
    saveRig: any;
    setMode: (value: 'main' | 'create' | 'edit') => void;
    mode: string;
    device: 'mobile' | 'laptop';
}

const Create: React.FC<CreateProps> = (props: CreateProps): React.ReactElement => {

    return (
        <Container sx={{
            background: "rgb(80,80,80)",
            color: "rgb(180,180,180)",
            borderRadius: 2
        }}>
            {
                (props.device === 'laptop') ?
                    <LaptopCreate
                        setRigObject={props.setRigObject}
                        rigObject={props.rigObject}
                        hovered={props.hovered}
                        setHovered={props.setHovered}
                        saveRig={props.saveRig}
                        setMode={props.setMode}
                        mode={props.mode}
                        device={props.device}
                    /> :
                    <MobileCreate
                        setRigObject={props.setRigObject}
                        rigObject={props.rigObject}
                        hovered={props.hovered}
                        setHovered={props.setHovered}
                        saveRig={props.saveRig}
                        setMode={props.setMode}
                        mode={props.mode}
                        device={props.device} 
                    />
            }
        </Container>
    );
}

export default Create;