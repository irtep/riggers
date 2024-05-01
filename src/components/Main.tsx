import { Button, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Create from './Create';

export interface FamiliarStats {
    speed: number;
    armour: number;
    emptySlots: number;
};

export interface RigObject {
    [key: string]: string | number | string[] | FamiliarStats;
    id: number;
    name: string;
    chassis: string;
    speed: number;
    realSpeed: number;
    armour: number;
    handling: number;
    resistanceFields: number;
    emptySlots: number;
    selectedWeapons: string[];
    mods: string[];
    gunnerSpecial: string;
    driverSpecial: string;
    rightTool: string;
    concealedWeapon: string;
    familiar: string[];
    familiarStats: FamiliarStats;
    mines: string[];
    handlingMods: number;
}

const initialObject: RigObject = {
    id: 0,
    name: '',
    chassis: '',
    speed: 30,
    realSpeed: 30,
    armour: 0,
    handling: 6,
    resistanceFields: 0,
    emptySlots: 6,
    selectedWeapons: [],
    mods: [],
    gunnerSpecial: '',
    driverSpecial: '',
    rightTool: '',
    concealedWeapon: '',
    familiar: [],
    familiarStats: {
        speed: 10,
        armour: 2,
        emptySlots: 3
    },
    mines: [],
    handlingMods: 0
};

interface MainProps {
    device: 'mobile' | 'laptop';
};

const Main: React.FC<MainProps> = (props: MainProps): React.ReactElement => {
    const [rigObject, setRigObject] = useState<RigObject>(initialObject);
    const [mode, setMode] = useState<'main' | 'create' | 'edit'>('main');
    const [hovered, setHovered] = useState<string | undefined>('');
    const [savedRigs, setSavedRigs] = useState<any[]>([]);

    const saveRig = (rig: RigObject) => {
        // Find the maximum ID in the existing rigs
        const maxId = savedRigs.reduce((max, rig) => (rig.id > max ? rig.id : max), 0);
    
        // Assign a new unique ID
        rig.id = maxId + 1;
    
        // Create a new array with the rig and save it
        const toBeSaved = [...savedRigs, rig];
        localStorage.setItem("rigs", JSON.stringify(toBeSaved));
        setSavedRigs(toBeSaved);
        setMode('edit');
    };

    const overwriteRig = (rigToSave: RigObject) => {
        // Find the index of the rig with the same ID in savedRigs array
        const indexToUpdate = savedRigs.findIndex((rig) => rig.id === rigToSave.id);

        // If the rig with the same ID is found, update it; otherwise, add the new rig
        if (indexToUpdate !== -1) {
            // Create a new array with the updated rig
            const updatedRigs = [...savedRigs];
            updatedRigs[indexToUpdate] = rigToSave;

            // Update localStorage and state with the updated array
            localStorage.setItem("rigs", JSON.stringify(updatedRigs));
            setSavedRigs(updatedRigs);
        } else {
            // If the rig with the same ID is not found, add the new rig to the array
            const updatedRigs = [...savedRigs, rigToSave];

            // Update localStorage and state with the updated array
            localStorage.setItem("rigs", JSON.stringify(updatedRigs));
            setSavedRigs(updatedRigs);
        }
    };

    const fetchSavedRigs = () => {
        const storedRigs = localStorage.getItem("rigs");

        if (storedRigs !== null) {
            setSavedRigs(JSON.parse(storedRigs));
        } else {
            setSavedRigs([]);
        }
    }

    const deleteRig = (id: number): void => {
        // Create a new array excluding the rig with the specified ID
        const updatedRigs = savedRigs.filter((rig) => rig.id !== id);
    
        // Update localStorage and state with the modified array
        localStorage.setItem("rigs", JSON.stringify(updatedRigs));
        setSavedRigs(updatedRigs);
    };

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
                                                            const matchingRig = savedRigs.find(savedRig => savedRig.id === rig.id);

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
                                                            console.log('clicked: ', rig);
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
                (mode === 'create') ?
                    <>
                        <Create
                            setRigObject={setRigObject}
                            rigObject={rigObject}
                            hovered={hovered}
                            setHovered={setHovered}
                            saveRig={saveRig}
                            setMode={setMode}
                            mode={mode}
                            device={props.device}
                        />
                    </> :
                    <></>
            }
            {
                (mode === 'edit') ?
                    <>
                        <Create
                            setRigObject={setRigObject}
                            rigObject={rigObject}
                            hovered={hovered}
                            setHovered={setHovered}
                            saveRig={overwriteRig}
                            setMode={setMode}
                            mode={mode}
                            device={props.device}
                        />
                    </> :
                    <></>
            }
        </Container>
    );
}

export default Main;