import { Container, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { MobileDetails, RigContext } from '../context/RigContext';
import { Visibility } from '@mui/icons-material';
import { Weapon, weapons } from '../data/weapons';
import ShowDetails from './ShowDetails';

const MobileShowRig: React.FC = (): React.ReactElement => {

    const { rigObject, setMobileDetails, mobileDetails } = useContext(RigContext);

    const stripParentheses = (str: string): string => {
        const index = str.indexOf("(");
        if (index !== -1) {
            return str.substring(0, index);
        }
        return str;
    }

    const handleDetails = (name: string, type: string): void => {

        let fullDetails: MobileDetails = {
            name: name,
            type: type,
            fullDetails: ''
        };

        switch (type) {
            case 'weapon':
                const getWeapon = weapons.filter( (w: Weapon) => w.name === stripParentheses(name));
                fullDetails.fullDetails = getWeapon[0]
            break;

            default: console.log('not found');
        };

        setMobileDetails(fullDetails);

        console.log('fD: ', fullDetails);
    ;}

    if (rigObject) {

        if (mobileDetails.name !== '') {
            return(
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
                                        {m} <Visibility />
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
                                        {rigObject.driverSpecial} <Visibility />
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
                                    {rigObject.gunnerSpecial} <Visibility />
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
                                                {mine} <Visibility />
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
                                                    {fa} <Visibility />
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

                                    {rigObject.concealedWeapon} <Visibility />

                                </> : <></>
                        }
                        {
                            (rigObject.gunnerSpecial.includes('The right tool')) ?
                                <>
                                    <span style={{ background: "orange", color: "black", fontWeight: "strong", padding: 1 }}>
                                        Right tool weapon:
                                    </span>

                                    <br />

                                    {rigObject.rightTool} <Visibility />

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