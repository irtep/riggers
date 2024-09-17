import { Button, Container, Typography } from '@mui/material';
import React, { useEffect, useContext } from 'react';
import Create from './createRigComponents/Create';
import { RigContext, RigObject } from '../context/RigContext';
import TestRigs from './rigTestComponents/TestRigs';
import Lore from './Lore';
import RuleIndex from './RuleIndex';

const Main: React.FC = (): React.ReactElement => {

    const { rigObject,
        setRigObject,
        fetchSavedRigs,
        mode,
        setMode,
        initialObject,
        savedRigs,
        deleteRig
    } = useContext(RigContext);

    // handle special mods like chassis specials, turbo chargers, drifters etc.
    useEffect(() => {
        let roundedSpeed;
        let extras: number = 0; // handling modificators
        let speedOfRig: number = rigObject.speed;
        let stomperSpecial: boolean = false;

        (rigObject.chassis === 'Desert spear' &&
         (!rigObject.mods.includes('Gunner'))
        ) ?
        speedOfRig = rigObject.speed + 10 : speedOfRig = rigObject.speed;

        (rigObject.chassis === 'Swamp Stomper') ?
        stomperSpecial = true : stomperSpecial = false;

        (rigObject.mods.includes('Turbo Charger')) ?
        roundedSpeed = Math.ceil(speedOfRig / 5) * 5 : roundedSpeed = Math.floor(speedOfRig / 5) * 5;

        (rigObject.driverSpecial.includes('Drifter')) ?
        extras = 1 : extras = 0;

        setRigObject({
            ...rigObject,
            handling: Math.floor(speedOfRig / 5) + rigObject.handlingMods + extras,
            realSpeed: roundedSpeed
        });

    }, [rigObject.chassis,
        rigObject.speed,
        rigObject.realSpeed,
        rigObject.handlingMods,
        rigObject.driverSpecial,
        rigObject.mods]);

    useEffect(() => {

        fetchSavedRigs();

    }, []);

    useEffect( () => {
        console.log('rigObject: ', rigObject);
    });

    return (
        <Container sx={{
            margin: 1,
            padding: 1
        }}>
            {
                (mode === 'main') ?
                    <>
                        <Button onClick={() => {
                            setRigObject(initialObject);
                            setMode('create');
                        }}>new rig</Button>

                        {
                            (savedRigs.length > 0) ?
                                <>
                                    <Typography padding={1} sx={{ color: "white" }}>
                                        saved Rigs:
                                    </Typography>
                                    {
                                        savedRigs.map((rig: RigObject, i: number) => {
                                            return (
                                                <Typography padding={1} key={`rig:${i}`}>
                                                    <Button
                                                        sx={{
                                                            background: 'darkGreen',
                                                            color: 'rgb(165,165,165)'
                                                        }}
                                                        onClick={() => {
                                                            console.log('clicked: ', rig);
                                                            const matchingRig = savedRigs.find((savedRig: RigObject) => savedRig.id === rig.id);

                                                            setRigObject({ ...matchingRig });
                                                            setMode('edit');
                                                        }}
                                                    >
                                                        Edit / Show: {rig.name}
                                                    </Button>
                                                    <Button
                                                        sx={{
                                                            background: 'darkRed',
                                                            color: 'rgb(165,165,165)',
                                                            marginLeft: 2
                                                        }}
                                                        onClick={() => {
                                                            //console.log('clicked: ', rig);
                                                            deleteRig(rig.id);
                                                        }}
                                                    >
                                                        Delete
                                                    </Button>
                                                </Typography>

                                            )
                                        })
                                    }
                                </> : <></>
                        }
                    </> :
                    <></>
            }
            {
                (mode === 'create' || mode === 'edit') ?
                    <>
                        <Create/>
                    </> :
                    <></>
            }
            {
                (mode === 'testRigs') ?
                    <>
                        <TestRigs/>
                    </> :
                    <></>
            }
            {
                (mode === 'rules') ?
                    <>
                        <RuleIndex/>
                    </> :
                    <></>
            }
            {
                (mode === 'lore') ?
                    <>
                        <Lore/>
                    </> :
                    <></>
            }

        </Container>
    );
}

export default Main;