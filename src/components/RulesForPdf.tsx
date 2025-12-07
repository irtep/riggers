import { Container, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { RigContext } from '../context/RigContext';
import { weapons } from '../data/weapons';
import { Modification, rigModifications, weaponModifications } from '../data/modifications';
import { Mine, mines } from '../data/mines';
import { concealedWeapons, ConcealedWeapons, DriverSpecial, driverSpecials } from '../data/driverSpecials';
import { Ammunition, ammunitions, GunnerSpecial, gunnerSpecials } from '../data/gunnerSpecials';
import { familiarModifications, familiarWeapons } from '../data/familiar';

const RulesForPdf: React.FC = (): React.ReactElement => {

    const {
        rigObject,
        stripParentheses
    } = useContext(RigContext);

    const uniqueByName = <T extends { name: string }>(arr: T[]) =>
        Array.from(
            new Map(arr.map(item => [item.name, item])).values()
        );

    const weaponRules = uniqueByName(
        rigObject.selectedWeapons
            .map((name: any) => weapons.find(w => w.name === stripParentheses(name)))
            .filter(Boolean)
    );

    const modRules = uniqueByName(
        rigObject.mods
            .map((name: any) => rigModifications.find(w => w.name === stripParentheses(name)))
            .filter(Boolean)
    );

    const driverSpecialRules = uniqueByName(
        driverSpecials
            .filter((ds: DriverSpecial) => ds.name === rigObject.driverSpecial)
    );

    const gunnerSpecialRules = uniqueByName(
        gunnerSpecials
            .filter((gs: GunnerSpecial) => gs.name === rigObject.gunnerSpecial)
    );

    const concealedWeaponRules = uniqueByName(
        concealedWeapons
            .filter((gw: ConcealedWeapons) => gw.name === rigObject.concealedWeapon)
    );

    const rightToolRules = uniqueByName(
        rigObject.rightTool
            .map((name: any) => ammunitions.find(amm => amm.name === stripParentheses(name)))
            .filter(Boolean)
    );

    const familiarWepsAndMods = uniqueByName(
        [
            ...familiarWeapons,
            ...familiarModifications
        ].filter(fwm => rigObject.familiar.includes(fwm.name))
    );

    if (rigObject) {
        return (
            <Container
                sx={{
                    background: "white",
                    padding: 2
                }}
            >
                {/* RULES SECTION */}

                <div style={{ marginTop: "40px" }}>
                    <Typography sx={{
                        background: "black",
                        color: "orange",
                        padding: 1,
                        margin: 1
                    }}>
                        RULES SUMMARY
                    </Typography>

                    {/* WEAPONS */}
                    <Typography sx={{ background: "orange", color: "black", fontWeight: "strong" }}>Weapons:</Typography>
                    {
                        weaponRules.map((w: any, i: number) => {
                            return (
                                <Typography key={i} sx={{ ml: 2 }}>
                                    <strong>{`${w.name}: `}</strong><br />
                                    {`impact power:  ${w.impactPower}. `}<br />
                                    {`range:  ${w.range}. `}<br />
                                    {`specialities:  ${w.specialties}. `}<br />
                                    {`Primed:  ${w.primed}. `}
                                </Typography>
                            )
                        })
                    }

                    {/* MINES */}
                    {
                        rigObject.mods.includes("Mine Launcher") && rigObject.mines.length > 0 &&
                        <>
                            <Typography sx={{ background: "orange", color: "black", fontWeight: "strong" }}>Mines:</Typography>
                            {

                                rigObject.mines.map((name: string, i: number) => {
                                    const mineData = mines
                                        .find((m: Mine) => m.name === stripParentheses(name));
                                    return (
                                        <Typography key={`rm${i}`} sx={{ marginLeft: 2 }}>
                                            <strong>{`${mineData?.name} mine:`}</strong><br />
                                            {`impact power:  ${mineData?.impactPower}. `}<br />
                                            {`range:  ${mineData?.range}. `}<br />
                                            {`effects:  ${mineData?.effects}. `}<br />
                                        </Typography>
                                    );
                                })
                            }
                        </>
                    }

                    {/* MODIFICATIONS */}
                    <Typography sx={{ background: "orange", color: "black", fontWeight: "strong" }}>Modifications:</Typography>
                    {modRules.map((m: any, i: number) => {
                        return (
                            <Typography key={i} sx={{ ml: 2 }}>
                                <strong>{`${m.name}: `}</strong>
                                {`effect:  ${m.effect}. `}
                            </Typography>
                        )
                    })}

                    {/* DRIVER SPECIAL */}
                    {
                        rigObject.driverSpecial.length > 0 &&
                        <>
                            <Typography sx={{ background: "orange", color: "black", fontWeight: "strong" }}>Driver Special:</Typography>
                            {driverSpecialRules.map((ds: any, i: number) => {
                                return (
                                    <Typography key={i} sx={{ ml: 2 }}>
                                        <strong>{`${ds.name}: `}</strong>
                                        {`${ds.desc}. `}
                                    </Typography>
                                )
                            })}
                        </>
                    }

                    {/* GUNNER SPECIAL */}
                    {
                        rigObject.mods.includes("Gunner") &&
                        <>
                            <Typography sx={{ background: "orange", color: "black", fontWeight: "strong" }}>Gunner Special:</Typography>
                            {gunnerSpecialRules.map((gs: any, i: number) => {
                                return (
                                    <Typography key={i} sx={{ ml: 2 }}>
                                        <strong>{`${gs.name}: `}</strong>
                                        {`${gs.desc}. `}
                                    </Typography>
                                )
                            })}
                        </>
                    }

                    {/* FAMILIAR */}
                    {
                        rigObject.gunnerSpecial.includes("Familiar") &&
                        <>
                            <Typography sx={{ background: "orange", color: "black", fontWeight: "strong" }}>Familiar:</Typography>
                            {familiarWepsAndMods.map((w: any, i: number) => {
                                return (
                                    <Typography key={i} sx={{ ml: 2 }}>
                                        <strong>{`${w.name}: `}</strong><br />
                                        {
                                            (w.whatIsThis === 'weapon') ?
                                                <>
                                                    {`impact power:  ${w.impactPower}. `}<br />
                                                    {`range:  ${w.range}. `}<br />
                                                    {`specialities:  ${w.specialties}. `}<br />
                                                    {`Primed:  ${w.primed}. `}<br />
                                                </> :
                                                <>
                                                    {`effect:  ${w.effect}. `}
                                                </>
                                        }
                                    </Typography>
                                )
                            })}
                        </>
                    }

                    {/* CONCEALED */}
                    {
                        rigObject.concealedWeapon.length > 0 &&
                        <>
                            <Typography sx={{ background: "orange", color: "black", fontWeight: "strong" }}>Concealed Weapon:</Typography>
                            {
                                concealedWeaponRules.map((w: any, i: number) => {
                                    return (
                                        <Typography key={i} sx={{ ml: 2 }}>
                                            <strong>{`${w.name}: `}</strong><br />
                                            {`impact power:  ${w.impactPower}. `}<br />
                                            {`range:  ${w.range}. `}<br />
                                            {`specialities:  ${w.effects}. `}
                                        </Typography>
                                    )
                                })
                            }
                        </>
                    }

                    {/* RIGHT TOOLS */}
                    {
                        rigObject.rightTool.length > 0 &&
                        <>
                            <Typography sx={{ background: "orange", color: "black", fontWeight: "strong" }}>Right tools:</Typography>
                            {
                                rightToolRules.map((w: any, i: number) => {
                                    return (
                                        <Typography key={i} sx={{ ml: 2 }}>
                                            <strong>{`${w.name}: `}</strong><br />
                                            {`desc:  ${w.desc}. `}<br />
                                        </Typography>
                                    )
                                })
                            }
                        </>
                    }

                </div>

            </Container>
        );
    } else {
        return (<></>);
    }
}

export default RulesForPdf;