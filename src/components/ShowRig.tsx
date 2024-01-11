import { Container, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { RigObject } from './Main';

interface LocalProps {
    rigObject: RigObject;
}

const ShowRig: React.FC<LocalProps> = (props: LocalProps): React.ReactElement => {

    useEffect(() => {
        console.log('show loaded: ', props.rigObject);
    }, []);

    if (props.rigObject) {
        return (
            <Grid container spacing={3} margin={3}>
                <Grid item xs={3}>
                    <Container>
                        <Typography sx={{
                            background: "black", color: "orange", fontWeight: "strong", padding: 1
                        }}>
                            Name of rig: {props.rigObject.name}<br />
                        </Typography>
                        <Typography>
                            Chassis: <span style={{ color: "rgb(57,255,20)" }}>{props.rigObject.chassis}</span><br />
                        </Typography>
                        <Typography>
                            Speed: <span style={{ color: "rgb(57,255,20)" }}>{props.rigObject.speed}</span><br />
                            Speed in game: <span style={{ color: "rgb(57,255,20)" }}>{props.rigObject.realSpeed}</span><br />
                        </Typography>
                        <Typography>
                            Armour: <span style={{ color: "rgb(57,255,20)" }}>{props.rigObject.armour}</span><br />
                        </Typography>
                        <Typography>
                            Handling: <span style={{ color: "rgb(57,255,20)" }}>{props.rigObject.handling}</span><br />
                        </Typography>
                        <Typography>
                            Resistance fields: <span style={{ color: "rgb(57,255,20)" }}>{props.rigObject.resistanceFields}</span><br />
                        </Typography>
                        <Typography>
                            Empty mod slots: <span style={{ color: "rgb(57,255,20)" }}>{props.rigObject.emptySlots}</span><br />
                        </Typography>
                    </Container>
                </Grid>
                <Grid item xs={3}>
                    <Container>
                        <span style={{ background: "orange", color: "black", fontWeight: "strong", padding: 1 }}>
                            Weapons:
                        </span>
                        {
                            props.rigObject.selectedWeapons.map((w: string, i: number) => {
                                return (
                                    <Typography
                                        onMouseEnter={() => {
                                            //  props.rigObject.setHovered(w);
                                        }}
                                        onMouseLeave={() => {
                                            //  props.rigObject.setHovered(undefined);
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
                    </Container>
                    <Container>
                        <span style={{ background: "orange", color: "black", fontWeight: "strong", padding: 1 }}>
                            Modifications:
                        </span>
                        {
                            props.rigObject.mods.map((m: string, i: number) => {
                                return (
                                    <Typography
                                        onMouseEnter={() => {
                                            //  props.rigObject.setHovered(w);
                                        }}
                                        onMouseLeave={() => {
                                            //  props.rigObject.setHovered(undefined);
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
                    </Container>
                </Grid>
                <Grid item xs={2}>
                    {
                        (props.rigObject.driverSpecial.length > 0) ?
                            <>
                                <span style={{ background: "orange", color: "black", fontWeight: "strong", padding: 1 }}>
                                    Driver special:
                                </span>
                                <br />
                                {props.rigObject.driverSpecial}
                                <br />
                            </> : <></>
                    }
                    {
                        (props.rigObject.mods.filter((mod: string) => mod === 'Gunner').length === 1) ?
                            <>
                                <span style={{ background: "orange", color: "black", fontWeight: "strong", padding: 1 }}>
                                    Gunner:
                                </span>
                                <br />
                                {props.rigObject.gunnerSpecial}
                            </> : <></>
                    }
                    {
                        (props.rigObject.mods.filter((mod: string) => mod === 'Mine Launcher').length === 1) ?
                            <>
                                <br />
                                <span style={{ background: "orange", color: "black", fontWeight: "strong", padding: 1 }}>
                                    Mines:
                                </span>
                                <br />
                                {props.rigObject.mines.map((mine: string, indx) => {
                                    return (
                                        <Typography key={`mine:${indx}`}>
                                            {mine}
                                        </Typography>
                                    )
                                })}
                            </> : <></>
                    }
                </Grid>
                <Grid item xs={4}>
                    {
                        (props.rigObject.gunnerSpecial.includes('Familiar') && props.rigObject.mods.filter((mod: string) => mod === 'Gunner').length === 1) ?
                            <>
                                <span style={{ background: "orange", color: "black", fontWeight: "strong", padding: 1 }}>
                                    Familiar:
                                </span>
                                <Typography>
                                    Speed: <span style={{ color: "navy" }}>{props.rigObject.familiarStats.speed}</span> Armour: <span style={{ color: "navy" }}>{props.rigObject.familiarStats.armour}</span> Empty slots: <span style={{ color: "navy" }}>{props.rigObject.familiarStats.emptySlots}</span>
                                </Typography>
                                {
                                    props.rigObject.familiar?.map((fa: string, indx: number) => {
                                        return (
                                            <Typography key={`faStuff ${indx}`}>
                                                {fa}
                                            </Typography>
                                        )
                                    })
                                }
                            </> : <></>
                    }
                    {
                        (props.rigObject.concealedWeapon.length > 0) ?
                            <>
                                <span style={{ background: "orange", color: "black", fontWeight: "strong", padding: 1 }}>
                                    Concealed weapon:
                                </span>

                                <br />

                                {props.rigObject.concealedWeapon}

                            </> : <></>
                    }
                    {
                        (props.rigObject.gunnerSpecial.includes('The right tool')) ?
                            <>
                                <span style={{ background: "orange", color: "black", fontWeight: "strong", padding: 1 }}>
                                    Right tool weapon:
                                </span>

                                <br />

                                {props.rigObject.rightTool}

                            </> : <></>
                    }
                </Grid>
            </Grid>
        );
    } else {
        return (<></>);
    }


}

export default ShowRig;