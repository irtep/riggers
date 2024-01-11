import { Container, CssBaseline, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import LeftSide from './LeftSide';
import RightSide from './RightSide';
//import { weapons, Weapon } from '../data/weapons';
//import { Ammunition, ammunitions, gunnerSpecials } from '../data/gunnerSpecials';
import { RigObject } from './Main';
import ShowRig from './ShowRig';

export interface CreateProps {
    setRigObject: any;
    rigObject: RigObject;
    hovered: any;
    setHovered: (value: any) => void;
    saveRig: any;
    setMode: (value: 'main' | 'create' | 'edit') => void;
}

const Create: React.FC<CreateProps> = (props: CreateProps): React.ReactElement => {

    return (
        <Container sx={{
            background: "rgb(80,80,80)",
            color: "rgb(180,180,180)",
            borderRadius: 2
        }}>

            <ShowRig
                rigObject={props.rigObject}
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
                    />

                    <RightSide
                        rigObject={props.rigObject}
                        setRigObject={props.setRigObject}
                        setHovered={props.setHovered}
                        hovered={props.hovered}
                        saveRig={props.saveRig}
                        setMode={props.setMode}
                    />

                </Grid>
            </Container>

        </Container>
    );
}

export default Create;