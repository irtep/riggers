import { Container, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { MobileDetails, RigContext } from '../context/RigContext';
import { Visibility } from '@mui/icons-material';
import { Weapon, weapons } from '../data/weapons';
import ShowDetails from './ShowDetails';
import { Modification, rigModifications, weaponModifications } from '../data/modifications';
import { ConcealedWeapons, DriverSpecial, concealedWeapons, driverSpecials } from '../data/driverSpecials';
import { GunnerSpecial, gunnerSpecials } from '../data/gunnerSpecials';
import { Mine, mines } from '../data/mines';
import { familiarModifications, familiarWeapons } from '../data/familiar';

const MobileShowRig: React.FC = (): React.ReactElement => {

    const { rigObject,
        setMobileDetails,
        mobileDetails,
        stripParentheses
    } = useContext(RigContext);

    const handleDetails = (name: string, type: string): void => {

        let fullDetails: MobileDetails = {
            name: name,
            type: type,
            fullDetails: ''
        };

        switch (type) {
            case 'weapon':
                const getWeapon = weapons.filter((w: Weapon) => w.name === stripParentheses(name));
                fullDetails.fullDetails = getWeapon[0]
                break;
            case 'modification':
                const getMod = rigModifications.concat(weaponModifications).filter((w: Modification) => w.name === stripParentheses(name));
                fullDetails.fullDetails = getMod[0]
                break;
            case 'driverSpecial':
                const driSpecial = driverSpecials.filter((w: DriverSpecial) => w.name === stripParentheses(name));
                fullDetails.fullDetails = driSpecial[0]
                break;
            case 'gunnerSpecial':
                const gunnerSpecial = gunnerSpecials.filter((w: GunnerSpecial) => w.name === stripParentheses(name));
                fullDetails.fullDetails = gunnerSpecial[0]
                break;
            case 'mine':
                const mine = mines.filter((w: Mine) => w.name === stripParentheses(name));
                fullDetails.fullDetails = mine[0]
                break;
            case 'familiarStuff':
                const famStuff: (Weapon | Modification)[] = ([] as (Weapon | Modification)[]).concat(familiarWeapons, familiarModifications).filter((w: Weapon | Modification) => w.name === stripParentheses(name));
                fullDetails.fullDetails = famStuff[0];
                break;
            case 'concealedWeapon':
                const concealedW = concealedWeapons.filter((w: ConcealedWeapons) => w.name === stripParentheses(name));
                fullDetails.fullDetails = concealedW[0]
                break;

            default: console.log('not found: ', type);
        };

        window.scrollTo({ top: 0, behavior: 'smooth' });
        setMobileDetails(fullDetails);
    }

    if (rigObject) {

        if (mobileDetails.name !== '') {
            return (
                <Container>
                    <ShowDetails
                        item={mobileDetails.fullDetails}
                    />
                </Container>
            )
        } else {
            return (
                <>
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
                    <Container>
                        <span style={{ background: "orange", color: "black", fontWeight: "strong", padding: 1 }}>
                            Weapons:
                        </span>
                        {
                            rigObject.selectedWeapons.map((w: string, i: number) => {
                                return (
                                    <Typography
                                        sx={{
                                            margin: 1
                                        }}
                                        key={`sW: ${i}`}
                                    >
                                        {w}
                                        <Visibility
                                            onClick={() => {
                                                handleDetails(w, 'weapon');
                                            }}
                                        />
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
                                        sx={{
                                            margin: 1
                                        }}
                                        key={`sm: ${i}`}
                                    >
                                        {m}
                                        <Visibility
                                            onClick={() => {
                                                handleDetails(m, 'modification');
                                            }}
                                        />
                                    </Typography>
                                )
                            })
                        }
                    </Container>
                    <Container>
                        {
                            (rigObject.driverSpecial.length > 0) ?
                                <>
                                    <span style={{ background: "orange", color: "black", fontWeight: "strong", padding: 1 }}>
                                        Driver special:
                                    </span>
                                    <Typography>
                                        {rigObject.driverSpecial}
                                        <Visibility
                                            onClick={() => {
                                                handleDetails(rigObject.driverSpecial, 'driverSpecial');
                                            }}
                                        />
                                    </Typography>
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
                                    <Visibility
                                        onClick={() => {
                                            handleDetails(rigObject.gunnerSpecial, 'gunnerSpecial');
                                        }}
                                    />
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
                                                <Visibility
                                                    onClick={() => {
                                                        handleDetails(mine, 'mine');
                                                    }}
                                                />
                                            </Typography>
                                        )
                                    })}
                                </> : <></>
                        }
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
                                                    <Visibility
                                                        onClick={() => {
                                                            handleDetails(fa, 'familiarStuff');
                                                        }}
                                                    />
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
                                    <Visibility
                                        onClick={() => {
                                            handleDetails(rigObject.concealedWeapon, 'concealedWeapon');
                                        }}
                                    />

                                </> : <></>
                        }
                        {
                            (rigObject.gunnerSpecial.includes('The right tool')) ?
                                <>
                                    <span style={{ background: "orange", color: "black", fontWeight: "strong", padding: 1 }}>
                                        Right tool weapon:
                                    </span>

                                    <br />

                                    {rigObject.rightTool}
                                    <Visibility
                                        onClick={() => {
                                            handleDetails(rigObject.rightTool, 'rightTool');
                                        }}
                                    />

                                </> : <></>
                        }
                    </Container>
                </>
            );
        }
    } else {
        return (<></>);
    }
}

export default MobileShowRig;