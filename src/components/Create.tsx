import { Container, CssBaseline, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import LeftSide from './LeftSide';
import RightSide from './RightSide';
import { weapons, Weapon } from '../data/weapons';
import { gunnerSpecials } from '../data/gunnerSpecials';

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
    hovered: any;
    setHovered: (value: any) => void;
    gunnerSpecial: string;
    setGunnerSpecial: (value: string) => void;
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
                        <Typography sx={{
                            background: "black", color: "orange", fontWeight: "strong", padding: 1
                        }}>
                            Name of rig: {props.name}<br />
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
                        <span style={{ background: "orange", color: "black", fontWeight: "strong", padding: 1 }}>
                            Weapons:
                        </span>
                        {
                            props.selectedWeapons.map((w: string, i: number) => {
                                return (
                                    <Typography
                                        onMouseEnter={() => {
                                            //  props.setHovered(w);
                                        }}
                                        onMouseLeave={() => {
                                            //  props.setHovered(undefined);
                                        }}
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
                        <span style={{ background: "orange", color: "black", fontWeight: "strong", padding: 1 }}>
                            Modifications:
                        </span>
                        {
                            props.mods.map((m: string, i: number) => {
                                return (
                                    <Typography
                                        onMouseEnter={() => {
                                            //  props.setHovered(w);
                                        }}
                                        onMouseLeave={() => {
                                            //  props.setHovered(undefined);
                                        }}
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
                    {
                        (props.mods.filter((mod: string) => mod === 'Gunner').length === 1) ?
                            <>
                                <span style={{ background: "orange", color: "black", fontWeight: "strong", padding: 1 }}>
                                    Gunner:
                                </span>
                                <br/>
                                {props.gunnerSpecial}
                            </> : <></>
                    }

                </Grid>
                <Grid item xs={3}>
                    { 
                        (props.gunnerSpecial.includes('Familiar')) ?
                            <>
                                <span style={{ background: "orange", color: "black", fontWeight: "strong", padding: 1 }}>
                                    Familiar:
                                </span>
                            </> : <></>
                    }
                    { 
                        (props.gunnerSpecial.includes('The right tool')) ?
                            <>
                                <span style={{ background: "orange", color: "black", fontWeight: "strong", padding: 1 }}>
                                    Right tool weapons:
                                </span>
                            </> : <></>
                    }
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
                        setSelectedWeapons={props.setSelectedWeapons}
                        setHovered={props.setHovered}
                        hovered={props.hovered}
                        gunnerSpecial={props.gunnerSpecial}
                        setGunnerSpecial={props.setGunnerSpecial}
                    />

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
                        setSelectedWeapons={props.setSelectedWeapons}
                        setHovered={props.setHovered}
                        hovered={props.hovered}
                        gunnerSpecial={props.gunnerSpecial}
                        setGunnerSpecial={props.setGunnerSpecial}
                    />

                </Grid>
            </Container>

        </Container>
    );
}

export default Create;