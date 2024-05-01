import { Button, Checkbox, Container, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Switch, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { CreateProps } from './Create';
import { chassises } from '../data/chassises';
import { Weapon, weapons } from '../data/weapons';
import { Modification, SpecialEffect, rigModifications, weaponModifications } from '../data/modifications';
import { Ammunition, GunnerSpecial, ammunitions, gunnerSpecials } from '../data/gunnerSpecials';
import { familiarModifications, familiarWeapons } from '../data/familiar';
import { Mine, mines } from '../data/mines';
import { RigObject } from './Main';
import { ConcealedWeapons, DriverSpecial, concealedWeapons, driverSpecials } from '../data/driverSpecials';

const LeftSide: React.FC<CreateProps> = (props: CreateProps): React.ReactElement => {
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

    interface Prices {
        slots: number;
    }

    interface Stats {
        speed: number;
        armour: number;
        handling: number;
        resistanceFields: number;
    }

    const payPrice = (values: Prices, familiar: boolean): void => {


        if (familiar) {
            const newSlots: number = (props.rigObject.familiarStats.emptySlots as number) - values.slots;

            props.setRigObject((prevRigObject: any) => ({
                ...prevRigObject,
                familiarStats: {
                    ...prevRigObject.familiarStats,
                    emptySlots: newSlots
                }
            }));
        } else {
            const newSlots: number = (props.rigObject.emptySlots as number) - values.slots;

            props.setRigObject((prevRigObject: any) => ({
                ...prevRigObject,
                emptySlots: newSlots,
            }));
        }

    };

    const addStats = (values: Stats, familiar: boolean, negative: boolean): void => {

        if (familiar) {
            let newSpeed: number = (props.rigObject.familiarStats.speed as number) + (negative ? -values.speed : values.speed);
            let newArmour: number = (props.rigObject.familiarStats.armour as number) + (negative ? -values.armour : values.armour);

            props.setRigObject((prevRigObject: any) => ({
                ...prevRigObject,
                familiarStats: {
                    ...prevRigObject.familiarStats,
                    speed: newSpeed,
                    armour: newArmour
                }
            }));
        } else {
            let newSpeed: number = (props.rigObject.speed as number) + (negative ? -values.speed : values.speed);
            let newArmour: number = (props.rigObject.armour as number) + (negative ? -values.armour : values.armour);
            let newHandling: number = (props.rigObject.handlingMods as number) + (negative ? -values.handling : values.handling);
            let newResistanceFields: number = (props.rigObject.resistanceFields as number) + (negative ? -values.resistanceFields : values.resistanceFields);

            props.setRigObject((prevRigObject: any) => ({
                ...prevRigObject,
                speed: newSpeed,
                armour: newArmour,
                handlingMods: newHandling, // useEffect at Main.tsx handles the calculation
                resistanceFields: newResistanceFields
            }));
        }
    };

    const handleWeaponChange = (event: React.ChangeEvent<HTMLInputElement>, weapon: Weapon, dublicates: number) => {
        let weaponName = weapon.name;
        const isChecked = event.target.checked;
        let statsToAdd = {
            speed: -weapon.costSpeed,
            armour: 0,
            handling: 0,
            resistanceFields: 0
        }

        if (dublicates !== 0) {
            weaponName = `${weapon.name}(${dublicates})`;
        }

        if (isChecked) {
            if (!props.rigObject.selectedWeapons.includes(weaponName)) {

                payPrice({ slots: weapon.costMod }, false);

                addStats(statsToAdd, false, false);

                props.setRigObject((prevRigObject: RigObject) => ({
                    ...prevRigObject,
                    selectedWeapons: [...prevRigObject.selectedWeapons, weaponName]
                }));
            }
        } else {

            payPrice({ slots: -weapon.costMod }, false);

            addStats(statsToAdd, false, true);

            props.setRigObject((prevRigObject: RigObject) => ({
                ...prevRigObject,
                selectedWeapons: prevRigObject.selectedWeapons.filter((name: string) => name !== weaponName)
            }));
        }

    };

    const handleMineChange = (event: React.ChangeEvent<HTMLInputElement>, mine: Mine, dublicates: number) => {
        let mineName = mine.name;
        const isChecked = event.target.checked;
        let statsToAdd = {
            speed: -mine.costSpeed,
            armour: 0,
            handling: 0,
            resistanceFields: 0
        }

        if (isChecked) {
            if (!props.rigObject.mines.includes(mineName)) {

                //console.log('pRml ', props.rigObject.mines.length);
                if (props.rigObject.mines.length > 0) {
                    addStats(statsToAdd, false, false);
                }

                props.setRigObject((prevRigObject: RigObject) => ({
                    ...prevRigObject,
                    mines: [...prevRigObject.mines, mineName]
                }));
            }
        } else {

            if (props.rigObject.mines.length > 1) {
                addStats(statsToAdd, false, true);
            }

            props.setRigObject((prevRigObject: RigObject) => ({
                ...prevRigObject,
                mines: prevRigObject.mines.filter((name: string) => name !== mineName)
            }));
        }

    };

    const handleFamiliarChange = (event: React.ChangeEvent<HTMLInputElement>, eq: any, dublicates: number) => {
        let eqName = eq.name;
        const isChecked = event.target.checked;
        let statsToAdd = {
            speed: 0,
            armour: 0,
            handling: 0,
            resistanceFields: 0
        }

        if (eq.specialEffect) {
            eq.specialEffect.forEach((spessu: SpecialEffect) => {
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
                    default: console.log('spessu.prop not found: ', spessu.prop);
                }
            });
        }

        if (eq.costSpeed > 0) {
            statsToAdd.speed = -eq.costSpeed;
        }

        if (dublicates !== 0) {
            eqName = `${eq.name}(${dublicates})`;
        }

        if (isChecked) {

            if (!props.rigObject.familiar.includes(eqName)) {

                payPrice({ slots: eq.costMod }, true);

                addStats(statsToAdd, true, false);

                props.setRigObject((prevRigObject: RigObject) => ({
                    ...prevRigObject,
                    familiar: [...prevRigObject.familiar, eqName]
                }));
            }
        } else {

            payPrice({ slots: -eq.costMod }, true);

            addStats(statsToAdd, true, true);

            props.setRigObject((prevRigObject: RigObject) => ({
                ...prevRigObject,
                familiar: prevRigObject.familiar.filter((name: string) => name !== eqName)
            }));
        }

    };

    const handleModChange = (event: React.ChangeEvent<HTMLInputElement>, mod: Modification, dublicates: number, forWho?: string) => {
        let modName = mod.name;
        const isChecked = event.target.checked;
        let statsToAdd = {
            speed: 0,
            armour: 0,
            handling: 0,
            resistanceFields: 0
        }

        if (mod.specialEffect) {
            mod.specialEffect.forEach((spessu: SpecialEffect) => {
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
                    default: console.log('spessu.prop not found: ', spessu.prop);
                }
            });
        }

        if (mod.costSpeed > 0) {
            statsToAdd.speed = -mod.costSpeed;
        }

        if (dublicates !== 0) {
            modName = `${mod.name}(${dublicates})`;
        }

        if (forWho) {
            modName = `${mod.name}(${forWho})`;
        }

        if (isChecked) {
            if (!props.rigObject.mods.includes(modName)) {
                console.log('price to pay:', mod.costMod, mod.costSpeed);
                payPrice({ slots: mod.costMod }, false);

                addStats(statsToAdd, false, false);

                props.setRigObject((prevRigObject: RigObject) => ({
                    ...prevRigObject,
                    mods: [...prevRigObject.mods, modName]
                }));
            }
        } else {

            payPrice({ slots: -mod.costMod }, false);

            addStats(statsToAdd, false, true);

            props.setRigObject((prevRigObject: RigObject) => ({
                ...prevRigObject,
                mods: prevRigObject.mods.filter((name: string) => name !== modName)
            }));
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
                <Button
                    onClick={
                        () => {
                            props.setMode('main');
                        }
                    }
                >
                    Back to main page
                </Button>
                <Button
                    onClick={() => {
                        try {
                            props.saveRig(props.rigObject);
                            setMsg('Rig saved to your browser!');
                            setTimeout(() => {
                                setMsg('');
                            }, 2000);
                        }
                        catch (e) {
                            setMsg('error, while trying to save');
                        }
                    }
                    }
                >
                    {
                        (props.mode === 'create') ?
                            <>
                                Save new rig
                            </> : <></>
                    }
                    {
                        (props.mode === 'edit') ?
                            <>
                                Save changes to rig
                            </> : <></>
                    }

                </Button>
                
                {msg}

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

                <Typography sx={{borderBottom: " 1px solid green"}}>
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
                    <br />
                    Show driver specials:
                    <Switch
                        checked={showDriverSpecials}
                        onChange={(e) => {
                            setShowDriverSpecials(e.target.checked);
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
                        (props.rigObject.driverSpecial.includes('Concealed weapon')) ?
                            <>
                                <br />
                                Show weapon concealed weapons:
                                <Switch
                                    checked={showConcealedWeapons}
                                    onChange={(e) => {
                                        setShowConcealedWeapons(e.target.checked);
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
                                                        {
                                                            (m.name === 'Armour Plating') ?
                                                            <>
                                                                                                                    <Checkbox
                                                            checked={props.rigObject.mods.includes(`${m.name}(4)`)}
                                                            onChange={(event) => handleModChange(event, m, 4)}
                                                            inputProps={{ 'aria-label': 'controlled' }}
                                                        />
                                                            </>
                                                            :<></>
                                                        }
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
                    showConcealedWeapons ?
                        <>
                            {
                                concealedWeapons.map((gW: ConcealedWeapons, i: number) => {
                                    return (
                                        <Container
                                            key={`gWx ${i}`}
                                            onMouseEnter={() => {
                                                props.setHovered(gW);
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

                                            {gW.name}

                                            <Checkbox
                                                checked={props.rigObject.concealedWeapon.includes(gW.name)}
                                                onChange={() => props.setRigObject({
                                                    ...props.rigObject, concealedWeapon: gW.name
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
                    showDriverSpecials ?
                        <>
                            {
                                driverSpecials.map((driverSpecial: DriverSpecial, i: number) => {
                                    return (
                                        <Container
                                            key={`minex ${i}`}
                                            onMouseEnter={() => {
                                                props.setHovered(driverSpecial);
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

                                            {driverSpecial.name}

                                            <Checkbox
                                                checked={props.rigObject.driverSpecial.includes(driverSpecial.name)}
                                                onChange={() => props.setRigObject({
                                                    ...props.rigObject, driverSpecial: driverSpecial.name
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