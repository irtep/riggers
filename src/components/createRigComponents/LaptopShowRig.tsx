import { Container, Grid, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { RigContext } from '../../context/RigContext';
import { Weapon, weapons } from '../../data/weapons';
import { Modification, rigModifications, weaponModifications } from '../../data/modifications';
import { Chassis, chassises } from '../../data/chassises';

const LaptopShowRig: React.FC = (): React.ReactElement => {

    const [matchingChassis, setMatchingChassis] = useState<Chassis>({
        name: '',
        specials: '',
        desc: '',
        type: 'car'
    });

    const { rigObject,
            setHovered,
            stripParentheses
     } = useContext(RigContext);

    useEffect( () => {
        if (rigObject.chassis !== matchingChassis.name) {
            const matchedChassis = chassises.find(chassis => chassis.name === rigObject.chassis);

            if (matchedChassis) {
                setMatchingChassis(matchedChassis);
            }
            
        }
    }, [rigObject]);

    if (rigObject) {
        return (
            <Grid container spacing={3} margin={3}>
                <Grid item xs={3}>
                    <Container>
                        <Typography sx={{
                            background: "black", color: "orange", fontWeight: "strong", padding: 1
                        }}>
                            Name of rig: {rigObject.name}<br />
                        </Typography>
                        <Typography>
                            Chassis: <span style={{ color: "rgb(57,255,20)" }}>{rigObject.chassis}</span><br />
                        </Typography>
                        <Typography>
                            Chassis special: <span style={{ color: "rgb(57,255,20)" }}>{matchingChassis.specials}</span><br />
                        </Typography>
                        <Typography>
                            Speed: <span style={{ color: "rgb(57,255,20)" }}>{rigObject.speed}</span><br />
                            Speed in game: <span style={{ color: "rgb(57,255,20)" }}>{rigObject.realSpeed}</span><br />
                        </Typography>
                        <Typography>
                            Armour: <span style={{ color: "rgb(57,255,20)" }}>{rigObject.armour}</span><br />
                        </Typography>
                        <Typography>
                            Handling: <span style={{ color: "rgb(57,255,20)" }}>{rigObject.handling}</span><br />
                        </Typography>
                        <Typography>
                            Resistance fields: <span style={{ color: "rgb(57,255,20)" }}>{rigObject.resistanceFields}</span><br />
                        </Typography>
                        <Typography>
                            Empty mod slots: <span style={{ color: "rgb(57,255,20)" }}>{rigObject.emptySlots}</span><br />
                        </Typography>
                    </Container>
                </Grid>
                <Grid item xs={3}>

                    <Container>
                        <span style={{ background: "orange", color: "black", fontWeight: "strong", padding: 1 }}>
                            Weapons:
                        </span>
                        {
                            rigObject.selectedWeapons.map((w: string, i: number) => {
                                return (
                                    <Typography
                                        onMouseEnter={() => {
                                            // find details of this weapon
                                            const foundWeapon: Weapon[] = weapons.filter( (wep: Weapon) => wep.name === stripParentheses(w) ); 
                                            setHovered(foundWeapon[0]);
                                        }}
                                        onMouseLeave={() => {
                                            setHovered(undefined);
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
                            rigObject.mods.map((m: string, i: number) => {
                                return (
                                    <Typography
                                        onMouseEnter={() => {
                                            // find details of this Modification
                                            const foundMod: Modification[] = rigModifications.concat(weaponModifications).filter( (modi: Modification) => modi.name === stripParentheses(m) ); 
                                            setHovered(foundMod[0]);
                                        }}
                                        onMouseLeave={() => {
                                            setHovered(undefined);
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
                        (rigObject.driverSpecial.length > 0) ?
                            <>
                                <span style={{ background: "orange", color: "black", fontWeight: "strong", padding: 1 }}>
                                    Driver special:
                                </span>
                                <br />
                                {rigObject.driverSpecial}
                                <br />
                            </> : <></>
                    }
                    {
                        (rigObject.mods.filter((mod: string) => mod === 'Gunner').length === 1) ?
                            <>
                                <span style={{ background: "orange", color: "black", fontWeight: "strong", padding: 1 }}>
                                    Gunner:
                                </span>
                                <br />
                                {rigObject.gunnerSpecial}
                            </> : <></>
                    }
                    {
                        (rigObject.mods.filter((mod: string) => mod === 'Mine Launcher').length === 1) ?
                            <>
                                <br />
                                <span style={{ background: "orange", color: "black", fontWeight: "strong", padding: 1 }}>
                                    Mines:
                                </span>
                                <br />
                                {rigObject.mines.map((mine: string, indx: number) => {
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
                        (rigObject.gunnerSpecial.includes('Familiar') && rigObject.mods.filter((mod: string) => mod === 'Gunner').length === 1) ?
                            <>
                                <span style={{ background: "orange", color: "black", fontWeight: "strong", padding: 1 }}>
                                    Familiar:
                                </span>
                                <Typography>
                                    Speed: <span style={{ color: "navy" }}>{rigObject.familiarStats.speed}</span> Armour: <span style={{ color: "navy" }}>{rigObject.familiarStats.armour}</span> Empty slots: <span style={{ color: "navy" }}>{rigObject.familiarStats.emptySlots}</span>
                                </Typography>
                                {
                                    rigObject.familiar?.map((fa: string, indx: number) => {
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
                        (rigObject.concealedWeapon.length > 0) ?
                            <>
                                <span style={{ background: "orange", color: "black", fontWeight: "strong", padding: 1 }}>
                                    Concealed weapon:
                                </span>

                                <br />

                                {rigObject.concealedWeapon}

                            </> : <></>
                    }
                    {
                        (rigObject.gunnerSpecial.includes('The right tool')) ?
                            <>
                                <span style={{ background: "orange", color: "black", fontWeight: "strong", padding: 1 }}>
                                    Right tools:
                                </span>

                                <br />

                                {rigObject.rightTool.map((tool: string, indx: number) => {
                                    return (
                                        <Typography key={`tool:${indx}`}>
                                            {tool}
                                        </Typography>
                                    )
                                })}

                            </> : <></>
                    }
                </Grid>
            </Grid>
        );
    } else {
        return (<></>);
    }


}

export default LaptopShowRig;