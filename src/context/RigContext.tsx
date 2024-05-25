import React, { createContext, useState } from 'react';
import { Modification } from '../data/modifications';
import { Ammunition, GunnerSpecial } from '../data/gunnerSpecials';
import { ConcealedWeapons, DriverSpecial } from '../data/driverSpecials';
import { Weapon } from '../data/weapons';
import { Mine } from '../data/mines';

export const RigContext: React.Context<any> = createContext(undefined);

export interface Tehtava {
    id: string,
    nimi: string,
    suoritettu: boolean
}

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

interface Props {
    children: React.ReactNode;
}

export interface MobileDetails {
    name: string;
    type: string;
    fullDetails: Weapon | Modification | Mine | Ammunition | GunnerSpecial | ConcealedWeapons | DriverSpecial | '';
}

export const RigProvider: React.FC<Props> = (props: Props): React.ReactElement => {

    const [device, setDevice] = useState<'mobile' | 'laptop'>('mobile');
    const [rigObject, setRigObject] = useState<RigObject>(initialObject);
    const [mode, setMode] = useState<'main' | 'create' | 'edit'>('main');
    const [hovered, setHovered] = useState<string | undefined>('');
    const [savedRigs, setSavedRigs] = useState<any[]>([]);
    const [mobileDetails, setMobileDetails] = useState<MobileDetails>({name : '', type: '', fullDetails: ''});
    const [showWeapons, setShowWeapons] = useState<boolean>(false);
    const [showMods, setShowMods] = useState<boolean>(false);
    const [showWeaponMods, setShowWeaponMods] = useState<boolean>(false);
    const [showGunnerSpecials, setShowGunnerSpecials] = useState<boolean>(false);
    const [showRightTools, setShowRightTools] = useState<boolean>(false);
    const [showFamiliarWeapons, setShowFamiliarWeapons] = useState<boolean>(false);
    const [showFamiliarMods, setShowFamiliarMods] = useState<boolean>(false);
    const [showMines, setShowMines] = useState<boolean>(false);
    const [showDriverSpecials, setShowDriverSpecials] = useState<boolean>(false);
    const [showConcealedWeapons, setShowConcealedWeapons] = useState<boolean>(false);
    const [msg, setMsg] = useState<string>('');

    const stripParentheses = (str: string): string => {
        const index = str.indexOf("(");
        if (index !== -1) {
            const endIndex = str.indexOf(")", index);
            if (endIndex !== -1) {
                return str.substring(0, index) + str.substring(endIndex + 1);
            }
        }
        return str;
    }
    

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

    return (                            // eli vielä parempi oisi nuo funktionit laittaa, jotka tallettaa
        // palvelimelle. esim. niinku tuo lisaaTehtava
        <RigContext.Provider value={{
            device, setDevice,
            rigObject,
            setRigObject,
            mode, setMode,
            hovered, setHovered,
            savedRigs, setSavedRigs,
            saveRig, overwriteRig, fetchSavedRigs, deleteRig,
            mobileDetails, setMobileDetails,
            showWeapons, setShowWeapons,
            showMods, setShowMods,
            showWeaponMods, setShowWeaponMods,
            showGunnerSpecials, setShowGunnerSpecials,
            showRightTools, setShowRightTools,
            showFamiliarWeapons, setShowFamiliarWeapons,
            showFamiliarMods, setShowFamiliarMods,
            showMines, setShowMines,
            showDriverSpecials, setShowDriverSpecials,
            showConcealedWeapons, setShowConcealedWeapons,
            msg, setMsg,
            stripParentheses,
            initialObject
        }}>
            {props.children}
        </RigContext.Provider>
    );
}
