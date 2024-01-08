import { Container, CssBaseline, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import LeftSide from './LeftSide';
import RightSide from './RightSide';

interface CreateProps {
    name: string;
    chassis: string;
    setChassis: (value: string) => void;
    setName: (value: string) => void;
    speed: number;
    setSpeed: (value: number) => void;
    armour: number;
    setArmour: (value: number) => void;
    handling: number;
    resistanceFields: number;
    setResistanceFields: (value: number) => void;
    emptySlots: number;
    setEmptySlots: (value: number) => void;
}

const Create: React.FC<CreateProps> = (props: CreateProps): React.ReactElement => {

    return (
        <Container sx={{
            background: "rgb(80,80,80)",
            color: "rgb(180,180,180)",
            borderRadius: 2
        }}>

            <Container>
                <Typography>
                    Name of rig: {props.name}<br />
                </Typography>
                <Typography>
                    Chassis: {props.chassis}<br />
                </Typography>
                <Typography>
                    Speed: {props.speed}<br />
                </Typography>
                <Typography>
                    Armour: {props.armour}<br />
                </Typography>
                <Typography>
                    Handling: {props.handling}<br />
                </Typography>
                <Typography>
                    Resistance fields: {props.resistanceFields}<br />
                </Typography>
                <Typography>
                    Empty mod slots: {props.emptySlots}<br />
                </Typography>
            </Container>

            <Container component="main" sx={{
                minHeight: '100vh',
            }}>
                <CssBaseline />
                <Grid container spacing={3}>
                    
                    <LeftSide/>

                    <RightSide/>

                </Grid>
            </Container>

        </Container>
    );
}

export default Create;