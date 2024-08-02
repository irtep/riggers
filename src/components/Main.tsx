import { Button, Container, Typography } from '@mui/material';
import React, { useEffect, useContext } from 'react';
import Create from './Create';
import { RigContext, RigObject } from '../context/RigContext';
import TestRigs from './TestRigs';

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

    useEffect(() => {
        let roundedSpeed;
        let extras = 0;

        if (rigObject.mods.includes('Turbo Charger')) {
            // Round up to the next multiple of 5
            roundedSpeed = Math.ceil(rigObject.speed / 5) * 5;
        } else {
            // Round down to the closest multiple of 5
            roundedSpeed = Math.floor(rigObject.speed / 5) * 5;
        }

        // temporary fix, need to make so, that comes from all other... maybe
        if (rigObject.driverSpecial.includes('Drifter')) {
            extras = 1;
        } else {
            extras = 0;
        }

        setRigObject({
            ...rigObject,
            handling: Math.floor(rigObject.realSpeed / 5) + rigObject.handlingMods + extras,
            realSpeed: roundedSpeed
        });

    }, [rigObject.speed, rigObject.realSpeed, rigObject.handlingMods, rigObject.driverSpecial]);

    useEffect(() => {

        fetchSavedRigs();

    }, []);

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

        </Container>
    );
}

export default Main;