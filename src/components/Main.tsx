import { Button, Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Create from './Create';

export interface FamiliarStats {
    speed: number;
    armour: number;
    emptySlots: number;
};

export interface RigObject {
    [key: string]: string | number | string[] | FamiliarStats;
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

const Main: React.FC = (): React.ReactElement => {
    const [rigObject, setRigObject] = useState<RigObject>({
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
    });
    const [mode, setMode] = useState<'main' | 'create' | 'edit'>('main');
    const [hovered, setHovered] = useState<string>('');
    const [savedRigs, setSavedRigs] = useState<any[]>([]);

    const saveRig = (rig: any[]) => {

        let toBeSaved = [...savedRigs, rig]

        localStorage.setItem("rigs", JSON.stringify(toBeSaved));

        setSavedRigs(toBeSaved);

    }

    const fetchSavedRigs = () => {
        const storedRigs = localStorage.getItem("rigs");

        if (storedRigs !== null) {
            setSavedRigs(JSON.parse(storedRigs));
        } else {
            setSavedRigs([]);
        }
    }

    useEffect(() => {
        let roundedSpeed;

        if (rigObject.mods.includes('Turbo Charger')) {
            // Round up to the next multiple of 5
            roundedSpeed = Math.ceil(rigObject.speed / 5) * 5;
        } else {
            // Round down to the closest multiple of 5
            roundedSpeed = Math.floor(rigObject.speed / 5) * 5;
        }

        setRigObject({
            ...rigObject,
            handling: Math.floor(rigObject.speed / 5) + rigObject.handlingMods,
            realSpeed: roundedSpeed
        });

    }, [rigObject.speed, rigObject.handlingMods]);

    useEffect(() => {
        console.log('rig Object: ', rigObject);
        console.log('saved Rigs: ', savedRigs);
    });

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
                        <Button onClick={() => { setMode('create'); }}>new rig</Button>

                        <Button>load rig</Button>
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
                        />
                    </> :
                    <></>
            }

        </Container>
    );
}

export default Main;