import { Checkbox, Container, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Switch, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { CreateProps } from './Create';
import { chassises } from '../data/chassises';
import { Weapon, weapons } from '../data/weapons';
import { Modification, rigModifications, weaponModifications } from '../data/modifications';
import { Ammunition, GunnerSpecial, ammunitions, gunnerSpecials } from '../data/gunnerSpecials';
import { familiarModifications, familiarWeapons } from '../data/familiar';
import { Mine, mines } from '../data/mines';
import { RigObject } from './Main';

const LeftSide: React.FC<CreateProps> = (props: CreateProps): React.ReactElement => {
    const [showWeapons, setShowWeapons] = useState<boolean>(false);
    const [showMods, setShowMods] = useState<boolean>(false);
    const [showWeaponMods, setShowWeaponMods] = useState<boolean>(false);
    const [showGunnerSpecials, setShowGunnerSpecials] = useState<boolean>(false);
    const [showRightTools, setShowRightTools] = useState<boolean>(false);
    const [showFamiliarWeapons, setShowFamiliarWeapons] = useState<boolean>(false);
    const [showFamiliarMods, setShowFamiliarMods] = useState<boolean>(false);
    const [showMines, setShowMines] = useState<boolean>(false);

    interface Prices {
        slots: number;
        speed: number;
    }

    const payPrice = (values: Prices): void => {
        let newSlots: number = (props.rigObject.emptySlots as number) - values.slots;
        let newSpeed: number = (props.rigObject.speed as number) - values.speed;

        //console.log('what: ', props.rigObject[what]);
        //console.log('pay called: ', what, value);
        //console.log('new value: ', newValue);
        
        props.setRigObject((prevRigObject: any) => ({
            ...prevRigObject,
            emptySlots: newSlots,
            speed: newSpeed
        }));
        /*
        props.setRigObject({
            ...props.rigObject,
            [what]: newValue
        });
        */
    };

    const handleWeaponChange = (event: React.ChangeEvent<HTMLInputElement>, weapon: Weapon, dublicates: number) => {
        let weaponName = weapon.name;
        const isChecked = event.target.checked;
        //const prevSelectedWeapons = [...props.rigObject.selectedWeapons];

        if (dublicates !== 0) {
            weaponName = `${weapon.name}(${dublicates})`;
        }

        if (isChecked) {
            if (!props.rigObject.selectedWeapons.includes(weaponName)) {

                payPrice({
                    slots: weapon.costMod,
                    speed: weapon.costSpeed
                });
        
                props.setRigObject((prevRigObject: RigObject) => ({
                    ...prevRigObject,
                    selectedWeapons: [...prevRigObject.selectedWeapons, weaponName]
                }));
            }
        } else {

            payPrice({
                slots: -weapon.costMod,
                speed: -weapon.costSpeed
            });

            props.setRigObject((prevRigObject: RigObject) => ({
                ...prevRigObject,
                selectedWeapons: prevRigObject.selectedWeapons.filter((name: string) => name !== weaponName)
            }));
        }

    };

    const handleMineChange = (event: React.ChangeEvent<HTMLInputElement>, mine: Mine, dublicates: number) => {
        let mineName = mine.name;
        const isChecked = event.target.checked;

        if (isChecked) {
            if (!props.rigObject.mines.includes(mineName)) {

                console.log('pRml ', props.rigObject.mines.length);
                if (props.rigObject.mines.length > 0) {
                    payPrice({
                        slots: mine.costMod,
                        speed: mine.costSpeed
                    });
                }

                props.setRigObject((prevRigObject: RigObject) => ({
                    ...prevRigObject,
                    mines: [...prevRigObject.mines, mineName]
                }));
            }
        } else {
            console.log('pRml ', props.rigObject.mines.length);
            if (props.rigObject.mines.length > 1) {
                payPrice({
                    slots: -mine.costMod,
                    speed: -mine.costSpeed
                });
            }

            props.setRigObject((prevRigObject: RigObject) => ({
                ...prevRigObject,
                mines: prevRigObject.mines.filter((name: string) => name !== mineName)
            }));
        }

    };

    const handleFamiliarChange = (event: React.ChangeEvent<HTMLInputElement>, eq: Weapon | Modification, dublicates: number) => {
        let eqName = eq.name;
        const isChecked = event.target.checked;
        //const prevFamiliar = [...props.rigObject.familiar];

        if (dublicates !== 0) {
            eqName = `${eq.name}(${dublicates})`;
        }

        if (isChecked) {
            if (!props.rigObject.familiar.includes(eqName)) {
                //props.rigObject.setFamiliar([...prevFamiliar, eqName]);
                props.setRigObject({
                    ...props.rigObject,
                    familiar: [...props.rigObject.familiar, eqName]
                });
            }
        } else {
            //props.rigObject.setFamiliar(prevFamiliar.filter((name: string) => name !== eqName));
            props.setRigObject({
                ...props.rigObject,
                familiar: props.rigObject.familiar.filter((name: string) => name !== eqName)
            })
        }

    };

    const handleModChange = (event: React.ChangeEvent<HTMLInputElement>, mod: Modification, dublicates: number, forWho?: string) => {
        let modName = mod.name;
        const isChecked = event.target.checked;
        //const prevRigObject = {...props.rigObject];

        if (dublicates !== 0) {
            modName = `${mod.name}(${dublicates})`;
        }

        if (forWho) {
            modName = `${mod.name}(${forWho})`;
        }

        if (isChecked) {
            if (!props.rigObject.mods.includes(modName)) {
                //props.rigObject.setMods([...prevMods, modName]);
                props.setRigObject({
                    ...props.rigObject,
                    mods: [...props.rigObject.mods, modName]
                });
            }
        } else {
            //props.rigObject.setMods(prevMods.filter((name: string) => name !== modName));
            props.setRigObject({
                ...props.rigObject,
                mods: props.rigObject.mods.filter((name: string) => name !== modName)
            });
        }

    };

    return (
        <Grid item xs={6}>
            <Paper sx={{
                padding: 2,
                textAlign: 'center',
                background: "rgb(70,70,70)",
                color: "rgb(150,150,150)"
            }}>

                <FormControl sx={{ margin: 2, minWidth: '80%' }}>
                    <TextField
                        type="text"
                        value={props.rigObject.name}
                        label="Name your rig"
                        onChange={(e) => {
                            //props.rigObject.setName(e.target.value)
                            props.setRigObject({
                                ...props.rigObject,
                                name: e.target.value
                            });
                        }}
                    />
                </FormControl>

                <br />

                <FormControl sx={{ margin: 2, minWidth: '80%' }}>
                    <InputLabel id="dropdown-label">
                        Choose chassis
                    </InputLabel>
                    <Select
                        labelId="dropdown-label"
                        id="dropdown"
                        value={props.rigObject.chassis}
                        label="What game?"
                        onChange={(e) => { 
                            //props.rigObject.setChassis(e.target.value) 
                            props.setRigObject({
                                ...props.rigObject,
                                chassis: e.target.value
                            });
                        }}
                    >
                        {chassises.map((value: string, index: number) => (
                            <MenuItem key={index} value={value}>
                                {value}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <br />

                <Typography>
                    Show weapons:
                    <Switch
                        checked={showWeapons}
                        onChange={(e) => {
                            setShowWeapons(e.target.checked);
                        }}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                    Show modifications:
                    <Switch
                        checked={showMods}
                        onChange={(e) => {
                            setShowMods(e.target.checked);
                        }}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                    {
                        (props.rigObject.selectedWeapons.length > 0) ?
                            <>
                                <br />
                                Show weapon modifications:
                                <Switch
                                    checked={showWeaponMods}
                                    onChange={(e) => {
                                        setShowWeaponMods(e.target.checked);
                                    }}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </> : <></>
                    }
                    {
                        (props.rigObject.mods.filter((mod: string) => mod === 'Gunner').length === 1) ?
                            <>
                                <br />
                                Show gunner specials:
                                <Switch
                                    checked={showGunnerSpecials}
                                    onChange={(e) => {
                                        setShowGunnerSpecials(e.target.checked);
                                    }}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </> : <></>
                    }
                    {
                        (props.rigObject.gunnerSpecial === 'The right tool') ?
                            <>
                                <br />
                                Show "right tools" :
                                <Switch
                                    checked={showRightTools}
                                    onChange={(e) => {
                                        setShowRightTools(e.target.checked);
                                    }}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </> : <></>
                    }
                                        {
                        (props.rigObject.mods.includes('Mine Launcher')) ?
                            <>
                                <br />
                                Show mines :
                                <Switch
                                    checked={showMines}
                                    onChange={(e) => {
                                        setShowMines(e.target.checked);
                                    }}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </> : <></>
                    }
                    {
                        (props.rigObject.gunnerSpecial === 'Familiar') ?
                            <>
                                <br />
                                Show familiar weapons:
                                <Switch
                                    checked={showFamiliarWeapons}
                                    onChange={(e) => {
                                        setShowFamiliarWeapons(e.target.checked);
                                    }}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                                <br />
                                Show familiar modifications:
                                <Switch
                                    checked={showFamiliarMods}
                                    onChange={(e) => {
                                        setShowFamiliarMods(e.target.checked);
                                    }}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </> : <></>
                    }
                </Typography>
                {
                    showWeapons ?
                        <>
                            {
                                weapons.map((w: Weapon, i: number) => {
                                    return (
                                        <Container
                                            key={`w ${i}`}
                                            onMouseEnter={() => {
                                                props.setHovered(w);
                                            }}
                                            onMouseLeave={() => {
                                                props.setHovered(undefined);
                                            }}
                                        >

                                            {w.name}

                                            <Checkbox
                                                checked={props.rigObject.selectedWeapons.includes(w.name)}
                                                onChange={(event) => handleWeaponChange(event, w, 0)}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                            <Checkbox
                                                checked={props.rigObject.selectedWeapons.includes(`${w.name}(2)`)}
                                                onChange={(event) => handleWeaponChange(event, w, 2)}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                        </Container>
                                    )
                                })
                            }
                        </> : <></>
                }
                {
                    showMods ?
                        <>
                            {
                                rigModifications.map((m: Modification, i: number) => {
                                    return (
                                        <Container
                                            key={`mx ${i}`}
                                            onMouseEnter={() => {
                                                props.setHovered(m);
                                            }}
                                            onMouseLeave={() => {
                                                props.setHovered(undefined);
                                            }}
                                        >

                                            {m.name}

                                            <Checkbox
                                                checked={props.rigObject.mods.includes(m.name)}
                                                onChange={(event) => handleModChange(event, m, 0)}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                            {
                                                (!m.onePerRig) ?
                                                    <>
                                                        <Checkbox
                                                            checked={props.rigObject.mods.includes(`${m.name}(2)`)}
                                                            onChange={(event) => handleModChange(event, m, 2)}
                                                            inputProps={{ 'aria-label': 'controlled' }}
                                                        />
                                                        <Checkbox
                                                            checked={props.rigObject.mods.includes(`${m.name}(3)`)}
                                                            onChange={(event) => handleModChange(event, m, 3)}
                                                            inputProps={{ 'aria-label': 'controlled' }}
                                                        />
                                                    </> :
                                                    <></>
                                            }

                                        </Container>
                                    )
                                })
                            }
                        </> : <></>
                }
                {
                    showWeaponMods ?
                        <>
                            {
                                weaponModifications.map((wm: Modification, i: number) => {
                                    return (
                                        <Container
                                            key={`wmx ${i}`}
                                            onMouseEnter={() => {
                                                props.setHovered(wm);
                                            }}
                                            onMouseLeave={() => {
                                                props.setHovered(undefined);
                                            }}
                                            sx={{
                                                margin: 2,
                                                border: 2,
                                                borderColor: "darkGreen"
                                            }}
                                        >

                                            {wm.name}

                                            {
                                                props.rigObject.selectedWeapons.map((sw: string, ixx: number) => {
                                                    return (
                                                        <>
                                                            <br />for {sw} :
                                                            <Checkbox
                                                                checked={props.rigObject.mods.includes(`${wm.name}(${sw})`)}
                                                                onChange={(event) => handleModChange(event, wm, 0, sw)}
                                                                inputProps={{ 'aria-label': 'controlled' }}
                                                            />
                                                            {
                                                                (!wm.onePerWeapon) ?
                                                                    <>
                                                                        <Checkbox
                                                                            checked={props.rigObject.mods.includes(`${wm.name}(2)(${sw})`)}
                                                                            onChange={(event) => handleModChange(event, wm, 2, sw)}
                                                                            inputProps={{ 'aria-label': 'controlled' }}
                                                                        />
                                                                        <Checkbox
                                                                            checked={props.rigObject.mods.includes(`${wm.name}(3)(${sw})`)}
                                                                            onChange={(event) => handleModChange(event, wm, 3, sw)}
                                                                            inputProps={{ 'aria-label': 'controlled' }}
                                                                        />
                                                                    </> :
                                                                    <></>
                                                            }
                                                        </>
                                                    )
                                                })
                                            }
                                        </Container>
                                    )
                                })
                            }
                        </> : <></>
                }
                {
                    showGunnerSpecials ?
                        <>
                            {
                                gunnerSpecials.map((gs: GunnerSpecial, i: number) => {
                                    return (
                                        <Container
                                            key={`gsx ${i}`}
                                            onMouseEnter={() => {
                                                props.setHovered(gs);
                                            }}
                                            onMouseLeave={() => {
                                                props.setHovered(undefined);
                                            }}
                                            sx={{
                                                margin: 2,
                                                border: 2,
                                                borderColor: "darkGreen"
                                            }}
                                        >

                                            {gs.name}

                                            <Checkbox
                                                checked={props.rigObject.gunnerSpecial.includes(gs.name)}
                                                onChange={() => props.setRigObject({
                                                    ...props.rigObject, gunnerSpecial: gs.name
                                                })}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                        </Container>
                                    )
                                })
                            }
                        </> : <></>
                }
                                {
                    showMines ?
                        <>
                            {
                                mines.map((mine: Mine, i: number) => {
                                    return (
                                        <Container
                                            key={`minex ${i}`}
                                            onMouseEnter={() => {
                                                props.setHovered(mine);
                                            }}
                                            onMouseLeave={() => {
                                                props.setHovered(undefined);
                                            }}
                                            sx={{
                                                margin: 2,
                                                border: 2,
                                                borderColor: "darkGreen"
                                            }}
                                        >

                                            {mine.name}

                                            <Checkbox
                                                checked={props.rigObject.mines.includes(mine.name)}
                                                onChange={(event) => handleMineChange(event, mine, 0)}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                        </Container>
                                    )
                                })
                            }
                        </> : <></>
                }
                {
                    showRightTools ?
                        <>
                            {
                                ammunitions.map((ammu: Ammunition, i: number) => {
                                    return (
                                        <Container
                                            key={`ammux ${i}`}
                                            onMouseEnter={() => {
                                                props.setHovered(ammu);
                                            }}
                                            onMouseLeave={() => {
                                                props.setHovered(undefined);
                                            }}
                                            sx={{
                                                margin: 2,
                                                border: 2,
                                                borderColor: "darkGreen"
                                            }}
                                        >

                                            {ammu.name}

                                            <Checkbox
                                                checked={props.rigObject.rightTool.includes(ammu.name)}
                                                onChange={() => props.setRigObject({
                                                    ...props.rigObject, rightTool: ammu.name
                                                })}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                        </Container>
                                    )
                                })
                            }
                        </> : <></>
                }
                {
                    showFamiliarWeapons ?
                        <>
                            {
                                familiarWeapons.map((faWe: Weapon, i: number) => {
                                    return (
                                        <Container
                                            key={`faWex ${i}`}
                                            onMouseEnter={() => {
                                                props.setHovered(faWe);
                                            }}
                                            onMouseLeave={() => {
                                                props.setHovered(undefined);
                                            }}
                                            sx={{
                                                margin: 2,
                                                border: 2,
                                                borderColor: "darkGreen"
                                            }}
                                        >

                                            {faWe.name}

                                            <Checkbox
                                                checked={props.rigObject.familiar.includes(faWe.name)}
                                                onChange={(event) => handleFamiliarChange(event, faWe, 0)}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />

                                            <Checkbox
                                                checked={props.rigObject.familiar.includes(`${faWe.name}(2)`)}
                                                onChange={(event) => handleFamiliarChange(event, faWe, 2)}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />

                                        </Container>
                                    )
                                })
                            }
                        </> : <></>
                }
                {
                    showFamiliarMods ?
                        <>
                            {
                                familiarModifications.map((faMo: Modification, i: number) => {
                                    return (
                                        <Container
                                            key={`faMox ${i}`}
                                            onMouseEnter={() => {
                                                props.setHovered(faMo);
                                            }}
                                            onMouseLeave={() => {
                                                props.setHovered(undefined);
                                            }}
                                            sx={{
                                                margin: 2,
                                                border: 2,
                                                borderColor: "darkBlue"
                                            }}
                                        >

                                            {faMo.name}

                                            <Checkbox
                                                checked={props.rigObject.familiar.includes(faMo.name)}
                                                onChange={(event) => handleFamiliarChange(event, faMo, 0)}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                            {
                                                (!faMo.onePerRig) ?
                                                    <>
                                                        <Checkbox
                                                            checked={props.rigObject.familiar.includes(`${faMo.name}(2)`)}
                                                            onChange={(event) => handleFamiliarChange(event, faMo, 2)}
                                                            inputProps={{ 'aria-label': 'controlled' }}
                                                        />
                                                    </> : <></>
                                            }
                                        </Container>
                                    )
                                })
                            }
                        </> : <></>
                }
            </Paper>
        </Grid>
    );
}

export default LeftSide;