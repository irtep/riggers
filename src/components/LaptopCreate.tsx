import { Container, CssBaseline, Grid } from '@mui/material';
import React from 'react';
import LaptopShowRig from './LaptopShowRig';
import { RigObject } from './Main';
import LeftSide from './LeftSide';
import RightSide from './RightSide';

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

const LaptopCreate: React.FC<PropsForThis> = (props: PropsForThis): React.ReactElement => {
    return (
        <>
            <LaptopShowRig
                rigObject={props.rigObject}
                setHovered={props.setHovered}
            />

            <Container component="main" sx={{
                minHeight: '100vh',
            }}>
                <CssBaseline />
                <Grid container spacing={3}>
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
                    <RightSide
                        rigObject={props.rigObject}
                        setRigObject={props.setRigObject}
                        setHovered={props.setHovered}
                        hovered={props.hovered}
                        saveRig={props.saveRig}
                        setMode={props.setMode}
                        mode={props.mode}
                        device={props.device}
                    />
                </Grid>
            </Container>
        </>
    );
}

export default LaptopCreate;