import React, { createContext, useEffect, useState } from 'react';
import { Modification, rigModifications, SpecialEffect, weaponModifications } from '../data/modifications';
import { Ammunition, GunnerSpecial } from '../data/gunnerSpecials';
import { ConcealedWeapons, DriverSpecial } from '../data/driverSpecials';
import { Weapon, weapons } from '../data/weapons';
import { Mine, mines } from '../data/mines';
import { familiarModifications, familiarWeapons } from '../data/familiar';
import userIsMobile from '../customHooks/userIsMobile';
import { v4 as uuidv4 } from 'uuid';

export const RigContext: React.Context<any> = createContext(undefined);

interface Stats {
    speed: number;
    armour: number;
    handling: number;
    resistanceFields: number;
}

interface Prices {
    slots: number;
}

export interface FamiliarStats {
    speed: number;
    armour: number;
    emptySlots: number;
};

export interface RigObject {
    //[key: string]: string | number | string[] | FamiliarStats;
    id: number | string; // used to have numbers in old system, were rigs were only in browser. switched to string now, but i keep number type here too
    userId?: number; // those that are saved to database should have this, but to browser will not have
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
    rightTool: string[];
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
    rightTool: [],
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

export interface RigTestObject {
    primerOneCharged: boolean;
    primerTwoCharged: boolean;
    primerThreeCharged: boolean;
    showDistances: boolean;
    selectingPlace: boolean;
    selectedRig: number;
    round: number;
    gameType: string;
    world: string;
    rigAmount: number;
    map: string;
    players: (Player | Familiar)[];
    familiarOne: Familiar;
    familiarTwo: Familiar;
};

export interface Player {
    type: 'player';
    enabled: boolean;
    points: number;
    damage: number;
    momentum: number;
    charred: boolean;
    rig?: string;
    x?: number;
    y?: number;
    heading?: number;
};

const initialPlayer: Player = {
    type: 'player',
    enabled: false,
    points: 0,
    damage: 0,
    momentum: 0,
    charred: false,
    rig: '',
    x: undefined,
    y: undefined,
    heading: 0
};

const initialFamiliar: Familiar = {
    type: 'familiar',
    x: 0,
    y: 0,
    heading: 0,
    charred: false,
    enabled: false,
    name: ''
};

export interface Familiar {
    type: 'familiar';
    x: number;
    y: number;
    heading: number;
    charred: boolean;
    enabled: boolean;
    name: string;
};

export interface UserDetails {
    id: number;
    username: string;
    token: string;
    admin: boolean;
};

export interface TurnOrder {
    pool1: number[];
    pool2: number[];
}
export const RigProvider: React.FC<Props> = (props: Props): React.ReactElement => {
    const isMobile: boolean = userIsMobile();
    const [device, setDevice] = useState<'mobile' | 'laptop'>((isMobile
        ? 'mobile'
        : 'laptop'));
    const [rigObject, setRigObject] = useState<RigObject>(initialObject);
    const [mode, setMode] = useState<
        'main' |
        'create' |
        'edit' |
        'testRigs' |
        'lore' |
        'rules' |
        'bookEditor' |
        'login' |
        'register' |
        'controlUsers' |
        'showPdf'
    >('main');
    const [hovered, setHovered] = useState<string | undefined>('');
    const [savedRigs, setSavedRigs] = useState<RigObject[]>([]);
    const [mobileDetails, setMobileDetails] = useState<MobileDetails>({ name: '', type: '', fullDetails: '' });
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
    const [turnOrder, setTurnOrder] = useState<TurnOrder>({
        pool1: [],
        pool2: []
    });
    const [rigTestObject, setRigTestObject] = useState<RigTestObject>(
        {
            primerOneCharged: false,
            primerTwoCharged: false,
            primerThreeCharged: false,
            showDistances: false,
            selectingPlace: false,
            selectedRig: 0,
            round: 0,
            gameType: '',
            world: '',
            rigAmount: 0,
            map: '',
            players: [initialPlayer, initialPlayer],
            familiarOne: initialFamiliar,
            familiarTwo: initialFamiliar
        }
    );
    const [userDetails, setUserDetails] = useState<UserDetails>({
        id: 5000,
        username: '',
        token: '',
        admin: false
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [anteriorMode, setAnteriorMode] = useState<string>('');
    const BASEURL: string = `http://localhost:5510/api/`;

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


    const payPrice = (values: Prices, familiar: boolean, rigATM: RigObject): RigObject => {

        if (familiar) {
            const newSlots: number = (rigATM.familiarStats.emptySlots as number) - values.slots;

            rigATM = {
                ...rigATM,
                familiarStats: {
                    ...rigATM.familiarStats,
                    emptySlots: newSlots
                }
            };
        } else {
            const newSlots: number = (rigATM.emptySlots as number) - values.slots;

            rigATM = {
                ...rigATM,
                emptySlots: newSlots,
            };
        }

        return rigATM;

    };

    const addStats = (values: Stats, familiar: boolean, negative: boolean, rigATM: RigObject): RigObject => {
        // negative atm. not used, but maybe good to keep the parametre here, for possible later use.
        if (familiar) {
            let newSpeed: number = (rigATM.familiarStats.speed as number) + (negative ? -values.speed : values.speed);
            let newArmour: number = (rigATM.familiarStats.armour as number) + (negative ? -values.armour : values.armour);

            rigATM = {
                ...rigATM,
                familiarStats: {
                    ...rigATM.familiarStats,
                    speed: newSpeed,
                    armour: newArmour
                }
            };
        } else {
            let newSpeed: number = (rigATM.speed as number) + (negative ? -values.speed : values.speed);
            let newArmour: number = (rigATM.armour as number) + (negative ? -values.armour : values.armour);
            let newHandling: number = (rigATM.handling as number) + (negative ? -values.handling : values.handling);
            let newResistanceFields: number = (rigATM.resistanceFields as number) + (negative ? -values.resistanceFields : values.resistanceFields);

            rigATM = {
                ...rigATM,
                speed: newSpeed,
                armour: newArmour,
                handling: newHandling,
                resistanceFields: newResistanceFields
            };
        }

        return rigATM;
    };

    // Update for stats of rigs and familiars
    const updateRig = (oldRigObject: RigObject): RigObject => {
        //console.log('update called with: ', oldRigObject);
        // Rigs:
        // reset to update all correctly
        let rigNow = {
            ...oldRigObject,
            speed: 30,
            realSpeed: 0,
            armour: 0,
            handling: 0,
            resistanceFields: 0,
            emptySlots: 6,
            familiarStats: {
                speed: 10,
                armour: 2,
                emptySlots: 3
            },
            handlingMods: 0 // not used atm. updateRig does this
        };

        // update stats, based on chassis, not in use now
        if ( // bikes
            rigNow.chassis === 'Desert spear'
        ) {
            /*
            rigNow.speed = 40;
            rigNow.emptySlots = 5;
            */
        }
        if ( // tanks
            rigNow.chassis === 'All terrain roller'
        ) {
            /*
            rigNow.speed = 25;
            */
        }
        if ( // walkers
            rigNow.chassis === 'Swamp stomper'
        ) {
            rigNow.speed = 20;
            // add inbuilt computer assisted steering, and mod point, to pay for it
            /* changed to 0.8.3, but i save the code, just in case
            const checkIfHasCAS = rigNow.mods.filter((mod: string) => mod === 'Computer Assisted Steering');
            if (checkIfHasCAS.length === 0) {
                rigNow.mods.push('Computer Assisted Steering');
                rigNow.emptySlots = 7;
            } else {
                rigNow.emptySlots = 7;
            }
            */
        }

        // rig modifications
        rigNow.mods.forEach((rigMod: string, i: number) => {
            let statsToAdd = {
                speed: 0,
                armour: 0,
                handling: 0,
                resistanceFields: 0
            }
            const foundMod = rigModifications
                .concat(weaponModifications)
                .filter((listMod: Modification) => listMod.name === rigMod);

            if (foundMod[0] && foundMod[0].specialEffect) {
                foundMod[0].specialEffect.forEach((spessu: SpecialEffect) => {
                    switch (spessu.prop) {
                        case 'speed':
                            statsToAdd.speed = spessu.value;
                            break;
                        case 'armour':
                            statsToAdd.armour = spessu.value;
                            break;
                        case 'handling':
                            statsToAdd.handling = spessu.value;
                            break;
                        case 'resistanceFields':
                            statsToAdd.resistanceFields = spessu.value;
                            break;
                        default: //console.log('spessu.prop not found: ', spessu.prop);
                    }
                });
            }

            if (foundMod[0] && foundMod[0].costSpeed > 0) {
                statsToAdd.speed = -foundMod[0].costSpeed;
            }
            // (values: Stats, familiar: boolean, negative: boolean, rigATM: RigObject)
            // addStats(statsToAdd, false, true);
            if (foundMod[0]) {
                rigNow = payPrice({ slots: foundMod[0].costMod }, false, rigNow);
                rigNow = addStats(statsToAdd, false, false, rigNow);
            }
        });

        // weapons
        rigNow.selectedWeapons.forEach((w: string, i: number) => {
            const foundWeapon = weapons.filter((listWep: Weapon) => listWep.name === w);
            let statsToAdd = {
                speed: -foundWeapon[0].costSpeed,
                armour: 0,
                handling: 0,
                resistanceFields: 0
            }
            rigNow = payPrice({ slots: foundWeapon[0].costMod }, false, rigNow);
            rigNow = addStats(statsToAdd, false, false, rigNow);
        });

        // familiar
        rigNow.familiar.forEach((fEq: String, i: number) => {
            const foundWeapon = familiarWeapons.filter((listWep: Weapon) => listWep.name === fEq);
            const foundMod = familiarModifications.filter((listMod: Modification) => listMod.name === fEq);

            if (foundWeapon.length > 0) {
                rigNow = payPrice({ slots: foundWeapon[0].costMod }, true, rigNow);
            }

            if (foundMod.length > 0) {
                const eq = foundMod[0];
                let statsToAdd = {
                    speed: 0,
                    armour: 0,
                    handling: 0,
                    resistanceFields: 0
                };

                if (eq.specialEffect) {
                    eq.specialEffect.forEach((spessu: SpecialEffect) => {
                        switch (spessu.prop) {
                            case 'speed':
                                statsToAdd.speed = spessu.value;
                                break;
                            case 'armour':
                                statsToAdd.armour = spessu.value;
                                break;
                            default: //console.log('spessu.prop not found: ', spessu.prop);
                        }
                    });
                }
                rigNow = payPrice({ slots: foundMod[0].costMod }, true, rigNow);
                rigNow = addStats(statsToAdd, true, false, rigNow);
            }
        });
        // mines
        rigNow.mines.forEach((m: string, i: number) => {
            const foundMine = mines.filter((listMine: Mine) => listMine.name === m);
            let statsToAdd = {
                speed: -foundMine[0].costSpeed,
                armour: 0,
                handling: 0,
                resistanceFields: 0
            };
            // first mine is free of charge
            if (i > 0) {
                // all cost 0 mods, so only stat deductions:
                rigNow = addStats(statsToAdd, false, false, rigNow);
            }
        });

        // Apply speed bonus from Catapult Thrusters, sadly hard coded here
        if (rigNow.mods.includes('Catapult Thrusters')) {
            rigNow.speed += 2;
        }

        // specials like, turbo chargers, drifters etc.
        let roundedSpeed;
        let speedOfRig: number = rigNow.speed;

        // Round speed based on Turbo Charger presence
        if (rigNow.mods.includes('Turbo Charger')) {
            roundedSpeed = Math.ceil(speedOfRig / 5) * 5;
        } else {
            roundedSpeed = Math.floor(speedOfRig / 5) * 5;
        }

        // Calculate base handling from realSpeed
        let baseHandling = Math.floor(roundedSpeed / 5);

        // Apply Drifter modifier (+1 handling)
        if (rigNow.driverSpecial.includes('Drifter')) {
            baseHandling += 1;
        }

        // hardcoding some handling modifiers... should change to something dynamic at some point

        // Apply Turbo Charger modifier (-2 handling)
        if (rigNow.mods.includes('Turbo Charger')) {
            baseHandling -= 2;
        }
        // Apply Computer Assistant Steering
        if (rigNow.mods.includes('Computer Assisted Steering')) {
            baseHandling += 1;
        }
        // Apply Catapult Thrusters
        if (rigNow.mods.includes('Catapult Thrusters')) {
            baseHandling -= 1;
        }

        // Update rigNow with the final values
        rigNow = {
            ...rigNow,
            handling: baseHandling,
            realSpeed: roundedSpeed
        };

        return rigNow;
    };
    /*
        const apiCall = (action: 'update' | 'new', id?: string, payload?: RigObject) => {
            // if logged in, save to database
            try {
                const baseUrl: string = "http://localhost:5509/api/rigs";
                let response: Response;
    
                if (action === 'update') {
    
    
                } else {
    
                }
    
            } catch {
    
            }
        };
    */
    const saveRig = async (rig: RigObject) => {

        // Find the maximum ID in the existing rigs (will be used only when saving to browser, in database gets id from back end)
        //const maxId = savedRigs.reduce((max, rig) => (rig.id > max ? rig.id : max), 0);

        // Assign a new unique ID
        //rig.id = maxId + 1;
        rig.id = uuidv4();
        // Create a new array with the rig and save it
        const toBeSaved = [...savedRigs, rig];

        // if not logged in, save to browser:
        if (userDetails.username === '') {
            //console.log('not logged in, saving to localstorage');
            localStorage.setItem("rigs", JSON.stringify(toBeSaved))
        } else {
            let response: Response;
            //console.log('sending to backend');
            // Create new rig
            response = await fetch(`${BASEURL}rigs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userDetails.token}`
                },
                body: JSON.stringify({
                    ...rig,
                    userId: userDetails.id
                })
            });
            //console.log('response: ', response);
        }
        setSavedRigs(toBeSaved);
        setMode('edit');
    };

    const overwriteRig = async (rigToSave: RigObject) => {
        setLoading(true);
        // Find the index of the rig with the same ID in savedRigs array
        const indexToUpdate = savedRigs.findIndex((rig) => rig.id === rigToSave.id);

        // If the rig with the same ID is found, update it; otherwise, add the new rig
        if (indexToUpdate !== -1) {
            // Create a new array with the updated rig
            const updatedRigs = [...savedRigs];
            updatedRigs[indexToUpdate] = rigToSave;

            // Update localStorage and state with the updated array if not logged in:
            if (userDetails.username === '') {
                localStorage.setItem("rigs", JSON.stringify(updatedRigs));
            } else {
                try {
                    let response: Response;
                    response = await fetch(`${BASEURL}rigs/${rigToSave.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${userDetails.token}`
                        },
                        body: JSON.stringify(rigToSave)
                    });
                    //console.log('response: ', response.status);
                } catch (err) {
                    console.error('Error updating rig:', err);
                } finally {
                    setLoading(false);
                }
            }
            setSavedRigs(updatedRigs);
        } else {
            // If the rig with the same ID is not found, add the new rig to the array
            const updatedRigs = [...savedRigs, rigToSave];

            // Update localStorage and state with the updated array
            localStorage.setItem("rigs", JSON.stringify(updatedRigs));
            setSavedRigs(updatedRigs);
        }
    };

    const fetchSavedRigs = async () => {
        //console.log('fetching rigs');

        // Get from localStorage first
        let storedRigs = localStorage.getItem("rigs");
        let localRigs: RigObject[] = [];

        if (storedRigs !== null) {
            if (typeof storedRigs === 'string') {
                storedRigs = storedRigs.replace(/\(2\)/g, '').replace(/\(3\)/g, '').replace(/\(4\)/g, '');
            }
            localRigs = JSON.parse(storedRigs);
        }

        // Get from database if logged in
        if (userDetails.username !== '') {
            //console.log('username found');
            setLoading(true);
            try {
                const response = await fetch(`${BASEURL}rigs`, {
                    headers: {
                        'Authorization': `Bearer ${userDetails.token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    //console.log('data', data);

                    // Merge local and remote rigs, deduplicate by id
                    const rigMap = new Map(localRigs.map(rig => [rig.id, rig]));
                    data.forEach((rig: RigObject) => {
                        rigMap.set(rig.id, rig);
                    });

                    setSavedRigs(Array.from(rigMap.values()));
                } else {
                    //console.log('Failed to load saved rigs');
                    setSavedRigs(localRigs); // Fallback to local
                }
            } catch (err) {
                console.error('Error fetching rigs:', err);
                setSavedRigs(localRigs); // Fallback to local
            } finally {
                setLoading(false);
                //console.log('finalized fetch');
            }
        } else {
            //console.log('username not found', userDetails);
            setSavedRigs(localRigs); // Just use local rigs
        }
    }

    const deleteRig = async (id: number | string) => {
        const foundRig = savedRigs.find((rig) => rig.id === id);
        //console.log('found rig: ', foundRig);

        // logged in and database rig - delete from server
        if (userDetails.username !== '' && foundRig && foundRig.userId !== undefined) {
            //console.log('deleting from database');
            setLoading(true);
            try {
                const response = await fetch(`${BASEURL}rigs/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userDetails.token}`
                    }
                });

                if (!response.ok) {
                    console.error('Failed to delete rig from server');
                    return;
                }

                const updatedRigs = savedRigs.filter((rig) => rig.id !== id);
                setSavedRigs(updatedRigs);

            } catch (err) {
                console.error('Error deleting the rig:', err);
            } finally {
                setLoading(false);
            }
        } else {
            // Browser-only rig or not logged in - delete from localStorage
            const updatedRigs = savedRigs.filter((rig) => rig.id !== id);
            localStorage.setItem("rigs", JSON.stringify(updatedRigs));
            setSavedRigs(updatedRigs);
        }
    };

    const logUserOut = () => {
        //setUsername('');
        //setToken('');
        setUserDetails({
            id: 0,
            username: '',
            token: '',
            admin: false
        });
        localStorage.setItem("uDetails", '');
    }

    useEffect(() => {
        // logs in, if user did not logged out
        const loggedUserJSON = window.localStorage.getItem('uDetails');

        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            //console.log('user from storage: ', user);
            setUserDetails({
                id: user.id,
                username: user.username,
                admin: false, // admin false always when comes from here, to avoid hacking, by changing localStorage value
                token: user.token
            });

            // fetches users saved rigs
            //apiCall(undefined, undefined, user.token);
        }
    }, []);

    return (
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
            initialObject,
            rigTestObject, setRigTestObject,
            turnOrder, setTurnOrder,
            updateRig, addStats, payPrice,
            isMobile,
            /*username, setUsername, admin, setAdmin, token, setToken,*/ logUserOut,
            userDetails, setUserDetails,
            loading, setLoading,
            anteriorMode, setAnteriorMode,
            BASEURL
        }}>
            {props.children}
        </RigContext.Provider>
    );
}
