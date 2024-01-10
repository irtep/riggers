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
    name: string;
    chassis: string;
    speed: number;
    armour: number;
    handling: number;
    resistanceFields: number;
    emptySlots: number;
    selectedWeapons: string[];
    mods: string[];
    gunnerSpecial: string;
    rightTool: string;
    familiar: string[];
    familiarStats: FamiliarStats;
    mines: string[];
}

const Main: React.FC = (): React.ReactElement => {
    const [rigObject, setRigObject] = useState<RigObject>({
        name: '',
        chassis: '',
        speed: 30,
        armour: 0,
        handling: 6,
        resistanceFields: 0,
        emptySlots: 6,
        selectedWeapons: [],
        mods: [],
        gunnerSpecial: '',
        rightTool: '',
        familiar: [],
        familiarStats: {
            speed: 10,
            armour: 2,
            emptySlots: 3
        },
        mines: []
    });
    const [mode, setMode] = useState<'main' | 'create'>('main');
    //const [name, setName] = useState<string>('');
    //const [chassis, setChassis] = useState<string>('');
    const [speed, setSpeed] = useState<number>(30);
    //const [armour, setArmour] = useState<number>(0);
    //const [handling, setHandling] = useState<number>(6);
    //const [resistanceFields, setResistanceFields] = useState<number>(0);
    //const [emptySlots, setEmptySlots] = useState<number>(6);
    //const [specials, setSpecials] = useState<string>('');
    //const [selectedWeapons, setSelectedWeapons] = useState<string[]>([]);
    //const [mods, setMods] = useState<string[]>([]);
    const [hovered, setHovered] = useState<string>('');
    //const [gunnerSpecial, setGunnerSpecial] = useState<string>('');
    //const [rightTool, setRightTool] = useState<string>('');
    //const [familiar, setFamiliar] = useState<string[]>([]);
    //const [familiarStats,setFamiliarStats] = useState<any>({
    //    speed: 10,
    //    armour: 2,
    //    emptySlots: 3
    // });

    useEffect(() => {

        // handling is 1 per 5 speed
        //setHandling(Math.floor(speed / 5));
        setRigObject({
            ...rigObject,
            handling: Math.floor(speed / 5)
        });

    }, [rigObject.speed]);

    useEffect(() => {
        console.log('selected weapons: ', rigObject);
    });

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
                        />
                    </> :
                    <></>
            }

        </Container>
    );
}

export default Main;