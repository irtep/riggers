import { Container, CssBaseline, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import LeftSide from './LeftSide';
import RightSide from './RightSide';
import { weapons, Weapon } from '../data/weapons';

export interface CreateProps {
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
    selectedWeapons: string[];
    mods: string[];
    setSelectedWeapons: (value: string[]) => void;
    setMods: (value: string[]) => void;
}

const Create: React.FC<CreateProps> = (props: CreateProps): React.ReactElement => {

    return (
        <Container sx={{
            background: "rgb(80,80,80)",
            color: "rgb(180,180,180)",
            borderRadius: 2
        }}>
            <Grid container spacing={3} margin={3}>
                <Grid item xs={3}>
                    <Container>
                        <Typography>
                            Name of rig: <span style={{ color: "rgb(57,255,20)" }}>{props.name}</span><br />
                        </Typography>
                        <Typography>
                            Chassis: <span style={{ color: "rgb(57,255,20)" }}>{props.chassis}</span><br />
                        </Typography>
                        <Typography>
                            Speed: <span style={{ color: "rgb(57,255,20)" }}>{props.speed}</span><br />
                        </Typography>
                        <Typography>
                            Armour: <span style={{ color: "rgb(57,255,20)" }}>{props.armour}</span><br />
                        </Typography>
                        <Typography>
                            Handling: <span style={{ color: "rgb(57,255,20)" }}>{props.handling}</span><br />
                        </Typography>
                        <Typography>
                            Resistance fields: <span style={{ color: "rgb(57,255,20)" }}>{props.resistanceFields}</span><br />
                        </Typography>
                        <Typography>
                            Empty mod slots: <span style={{ color: "rgb(57,255,20)" }}>{props.emptySlots}</span><br />
                        </Typography>
                    </Container>
                </Grid>
                <Grid item xs={3}>
                    <Typography>
                        Weapons:
                        {
                            props.selectedWeapons.map( (w: string, i: number) => {
                               return(
                                <Typography 
                                    sx={{
                                        margin: 1
                                    }}
                                    key={`sW: ${i}`}
                                >
                                    {w}
                                </Typography>
                               ) 
                            })
                        }
                    </Typography>
                    <Typography>
                        Modifications:
                        {
                            props.mods.map( (m: string, i: number) => {
                               return(
                                <Typography 
                                    sx={{
                                        margin: 1
                                    }}
                                    key={`sm: ${i}`}
                                >
                                    {m}
                                </Typography>
                               ) 
                            })
                        }
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    Gunner:
                </Grid>
                <Grid item xs={3}>
                    Familiar:
                </Grid>
            </Grid>

            <Container component="main" sx={{
                minHeight: '100vh',
            }}>
                <CssBaseline />
                <Grid container spacing={3}>

                    <LeftSide
                        name={props.name}
                        chassis={props.chassis}
                        setChassis={props.setChassis}
                        setName={props.setName}
                        speed={props.speed}
                        setSpeed={props.setSpeed}
                        armour={props.armour}
                        setArmour={props.setArmour}
                        handling={props.handling}
                        resistanceFields={props.resistanceFields}
                        setResistanceFields={props.setResistanceFields}
                        emptySlots={props.emptySlots}
                        setEmptySlots={props.setEmptySlots}
                        mods={props.mods}
                        setMods={props.setMods}
                        selectedWeapons={props.selectedWeapons}
                        setSelectedWeapons={props.setSelectedWeapons} />

                    <RightSide
                        name={props.name}
                        chassis={props.chassis}
                        setChassis={props.setChassis}
                        setName={props.setName}
                        speed={props.speed}
                        setSpeed={props.setSpeed}
                        armour={props.armour}
                        setArmour={props.setArmour}
                        handling={props.handling}
                        resistanceFields={props.resistanceFields}
                        setResistanceFields={props.setResistanceFields}
                        emptySlots={props.emptySlots}
                        setEmptySlots={props.setEmptySlots}
                        mods={props.mods}
                        setMods={props.setMods}
                        selectedWeapons={props.selectedWeapons}
                        setSelectedWeapons={props.setSelectedWeapons} />

                </Grid>
            </Container>

        </Container>
    );
}

export default Create;