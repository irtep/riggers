import { Button, Checkbox, Container, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Switch, TextField, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { chassises } from '../data/chassises';
import { Weapon, weapons } from '../data/weapons';
import { Modification, SpecialEffect, rigModifications, weaponModifications } from '../data/modifications';
import { Ammunition, GunnerSpecial, ammunitions, gunnerSpecials } from '../data/gunnerSpecials';
import { familiarModifications, familiarWeapons } from '../data/familiar';
import { Mine, mines } from '../data/mines';
import { ConcealedWeapons, DriverSpecial, concealedWeapons, driverSpecials } from '../data/driverSpecials';
import { RigContext, RigObject } from '../context/RigContext';

const LeftSide: React.FC = (): React.ReactElement => {

    const { rigObject,
            setRigObject,
            setMode,
            saveRig,
            overwriteRig,
            setMsg,
            mode,
            msg,
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
            setHovered
     } = useContext(RigContext);

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
            const newSlots: number = (rigObject.familiarStats.emptySlots as number) - values.slots;

            setRigObject((prevRigObject: any) => ({
                ...prevRigObject,
                familiarStats: {
                    ...prevRigObject.familiarStats,
                    emptySlots: newSlots
                }
            }));
        } else {
            const newSlots: number = (rigObject.emptySlots as number) - values.slots;

            setRigObject((prevRigObject: any) => ({
                ...prevRigObject,
                emptySlots: newSlots,
            }));
        }

    };

    const addStats = (values: Stats, familiar: boolean, negative: boolean): void => {

        if (familiar) {
            let newSpeed: number = (rigObject.familiarStats.speed as number) + (negative ? -values.speed : values.speed);
            let newArmour: number = (rigObject.familiarStats.armour as number) + (negative ? -values.armour : values.armour);

            setRigObject((prevRigObject: any) => ({
                ...prevRigObject,
                familiarStats: {
                    ...prevRigObject.familiarStats,
                    speed: newSpeed,
                    armour: newArmour
                }
            }));
        } else {
            let newSpeed: number = (rigObject.speed as number) + (negative ? -values.speed : values.speed);
            let newArmour: number = (rigObject.armour as number) + (negative ? -values.armour : values.armour);
            let newHandling: number = (rigObject.handlingMods as number) + (negative ? -values.handling : values.handling);
            let newResistanceFields: number = (rigObject.resistanceFields as number) + (negative ? -values.resistanceFields : values.resistanceFields);

            setRigObject((prevRigObject: any) => ({
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
            if (!rigObject.selectedWeapons.includes(weaponName)) {

                payPrice({ slots: weapon.costMod }, false);

                addStats(statsToAdd, false, false);

                setRigObject((prevRigObject: RigObject) => ({
                    ...prevRigObject,
                    selectedWeapons: [...prevRigObject.selectedWeapons, weaponName]
                }));
            }
        } else {

            payPrice({ slots: -weapon.costMod }, false);

            addStats(statsToAdd, false, true);

            setRigObject((prevRigObject: RigObject) => ({
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
            if (!rigObject.mines.includes(mineName)) {

                //console.log('pRml ', rigObject.mines.length);
                if (rigObject.mines.length > 0) {
                    addStats(statsToAdd, false, false);
                }

                setRigObject((prevRigObject: RigObject) => ({
                    ...prevRigObject,
                    mines: [...prevRigObject.mines, mineName]
                }));
            }
        } else {

            if (rigObject.mines.length > 1) {
                addStats(statsToAdd, false, true);
            }

            setRigObject((prevRigObject: RigObject) => ({
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

            if (!rigObject.familiar.includes(eqName)) {

                payPrice({ slots: eq.costMod }, true);

                addStats(statsToAdd, true, false);

                setRigObject((prevRigObject: RigObject) => ({
                    ...prevRigObject,
                    familiar: [...prevRigObject.familiar, eqName]
                }));
            }
        } else {

            payPrice({ slots: -eq.costMod }, true);

            addStats(statsToAdd, true, true);

            setRigObject((prevRigObject: RigObject) => ({
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
            if (!rigObject.mods.includes(modName)) {
                console.log('price to pay:', mod.costMod, mod.costSpeed);
                payPrice({ slots: mod.costMod }, false);

                addStats(statsToAdd, false, false);

                setRigObject((prevRigObject: RigObject) => ({
                    ...prevRigObject,
                    mods: [...prevRigObject.mods, modName]
                }));
            }
        } else {

            payPrice({ slots: -mod.costMod }, false);

            addStats(statsToAdd, false, true);

            setRigObject((prevRigObject: RigObject) => ({
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
                            setMode('main');
                        }
                    }
                >
                    Back to main page
                </Button>
                <Button
                    onClick={() => {
                        try {
                            if (mode === 'edit') {
                                overwriteRig(rigObject);
                                setMsg('Rig saved to your browser!');
                                setTimeout(() => {
                                    setMsg('');
                                }, 2000);
                            } else if (mode === 'create'){
                                saveRig(rigObject);
                                setMsg('Rig saved to your browser!');
                                setTimeout(() => {
                                    setMsg('');
                                }, 2000);
                            }
                        }
                        catch (e) {
                            setMsg('error, while trying to save');
                        }
                    }
                    }
                >
                    {
                        (mode === 'create') ?
                            <>
                                Save new rig
                            </> : <></>
                    }
                    {
                        (mode === 'edit') ?
                            <>
                                Save changes to rig
                            </> : <></>
                    }

                </Button>
                
                {msg}

                <FormControl sx={{ margin: 2, minWidth: '80%' }}>
                    <TextField
                        type="text"
                        value={rigObject.name}
                        label="Name your rig"
                        onChange={(e) => {
                            //rigObject.setName(e.target.value)
                            setRigObject({
                                ...rigObject,
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
                        value={rigObject.chassis}
                        label="What game?"
                        onChange={(e) => {
                            //rigObject.setChassis(e.target.value) 
                            setRigObject({
                                ...rigObject,
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
                        (rigObject.selectedWeapons.length > 0) ?
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
                        (rigObject.driverSpecial.includes('Concealed weapon')) ?
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
                        (rigObject.mods.filter((mod: string) => mod === 'Gunner').length === 1) ?
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
                        (rigObject.gunnerSpecial === 'The right tool') ?
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
                        (rigObject.mods.includes('Mine Launcher')) ?
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
                        (rigObject.gunnerSpecial === 'Familiar') ?
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
                                                setHovered(w);
                                            }}
                                            onMouseLeave={() => {
                                                setHovered(undefined);
                                            }}
                                        >

                                            {w.name}

                                            <Checkbox
                                                checked={rigObject.selectedWeapons.includes(w.name)}
                                                onChange={(event) => handleWeaponChange(event, w, 0)}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                            <Checkbox
                                                checked={rigObject.selectedWeapons.includes(`${w.name}(2)`)}
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
                                                setHovered(m);
                                            }}
                                            onMouseLeave={() => {
                                                setHovered(undefined);
                                            }}
                                        >

                                            {m.name}

                                            <Checkbox
                                                checked={rigObject.mods.includes(m.name)}
                                                onChange={(event) => handleModChange(event, m, 0)}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                            {
                                                (!m.onePerRig) ?
                                                    <>
                                                        <Checkbox
                                                            checked={rigObject.mods.includes(`${m.name}(2)`)}
                                                            onChange={(event) => handleModChange(event, m, 2)}
                                                            inputProps={{ 'aria-label': 'controlled' }}
                                                        />
                                                        <Checkbox
                                                            checked={rigObject.mods.includes(`${m.name}(3)`)}
                                                            onChange={(event) => handleModChange(event, m, 3)}
                                                            inputProps={{ 'aria-label': 'controlled' }}
                                                        />
                                                        {
                                                            (m.name === 'Armour Plating') ?
                                                            <>
                                                                                                                    <Checkbox
                                                            checked={rigObject.mods.includes(`${m.name}(4)`)}
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
                                                setHovered(wm);
                                            }}
                                            onMouseLeave={() => {
                                                setHovered(undefined);
                                            }}
                                            sx={{
                                                margin: 2,
                                                border: 2,
                                                borderColor: "darkGreen"
                                            }}
                                        >

                                            {wm.name}

                                            {
                                                rigObject.selectedWeapons.map((sw: string, ixx: number) => {
                                                    return (
                                                        <>
                                                            <br />for {sw} :
                                                            <Checkbox
                                                                checked={rigObject.mods.includes(`${wm.name}(${sw})`)}
                                                                onChange={(event) => handleModChange(event, wm, 0, sw)}
                                                                inputProps={{ 'aria-label': 'controlled' }}
                                                            />
                                                            {
                                                                (!wm.onePerWeapon) ?
                                                                    <>
                                                                        <Checkbox
                                                                            checked={rigObject.mods.includes(`${wm.name}(2)(${sw})`)}
                                                                            onChange={(event) => handleModChange(event, wm, 2, sw)}
                                                                            inputProps={{ 'aria-label': 'controlled' }}
                                                                        />
                                                                        <Checkbox
                                                                            checked={rigObject.mods.includes(`${wm.name}(3)(${sw})`)}
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
                                                setHovered(gW);
                                            }}
                                            onMouseLeave={() => {
                                                setHovered(undefined);
                                            }}
                                            sx={{
                                                margin: 2,
                                                border: 2,
                                                borderColor: "darkGreen"
                                            }}
                                        >

                                            {gW.name}

                                            <Checkbox
                                                checked={rigObject.concealedWeapon.includes(gW.name)}
                                                onChange={() => setRigObject({
                                                    ...rigObject, concealedWeapon: gW.name
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
                                                setHovered(gs);
                                            }}
                                            onMouseLeave={() => {
                                                setHovered(undefined);
                                            }}
                                            sx={{
                                                margin: 2,
                                                border: 2,
                                                borderColor: "darkGreen"
                                            }}
                                        >

                                            {gs.name}

                                            <Checkbox
                                                checked={rigObject.gunnerSpecial.includes(gs.name)}
                                                onChange={() => setRigObject({
                                                    ...rigObject, gunnerSpecial: gs.name
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
                                                setHovered(driverSpecial);
                                            }}
                                            onMouseLeave={() => {
                                                setHovered(undefined);
                                            }}
                                            sx={{
                                                margin: 2,
                                                border: 2,
                                                borderColor: "darkGreen"
                                            }}
                                        >

                                            {driverSpecial.name}

                                            <Checkbox
                                                checked={rigObject.driverSpecial.includes(driverSpecial.name)}
                                                onChange={() => setRigObject({
                                                    ...rigObject, driverSpecial: driverSpecial.name
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
                                                setHovered(mine);
                                            }}
                                            onMouseLeave={() => {
                                                setHovered(undefined);
                                            }}
                                            sx={{
                                                margin: 2,
                                                border: 2,
                                                borderColor: "darkGreen"
                                            }}
                                        >

                                            {mine.name}

                                            <Checkbox
                                                checked={rigObject.mines.includes(mine.name)}
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
                                                setHovered(ammu);
                                            }}
                                            onMouseLeave={() => {
                                                setHovered(undefined);
                                            }}
                                            sx={{
                                                margin: 2,
                                                border: 2,
                                                borderColor: "darkGreen"
                                            }}
                                        >

                                            {ammu.name}

                                            <Checkbox
                                                checked={rigObject.rightTool.includes(ammu.name)}
                                                onChange={() => setRigObject({
                                                    ...rigObject, rightTool: ammu.name
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
                                                setHovered(faWe);
                                            }}
                                            onMouseLeave={() => {
                                                setHovered(undefined);
                                            }}
                                            sx={{
                                                margin: 2,
                                                border: 2,
                                                borderColor: "darkGreen"
                                            }}
                                        >

                                            {faWe.name}

                                            <Checkbox
                                                checked={rigObject.familiar.includes(faWe.name)}
                                                onChange={(event) => handleFamiliarChange(event, faWe, 0)}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />

                                            <Checkbox
                                                checked={rigObject.familiar.includes(`${faWe.name}(2)`)}
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
                                                setHovered(faMo);
                                            }}
                                            onMouseLeave={() => {
                                                setHovered(undefined);
                                            }}
                                            sx={{
                                                margin: 2,
                                                border: 2,
                                                borderColor: "darkBlue"
                                            }}
                                        >

                                            {faMo.name}

                                            <Checkbox
                                                checked={rigObject.familiar.includes(faMo.name)}
                                                onChange={(event) => handleFamiliarChange(event, faMo, 0)}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                            {
                                                (!faMo.onePerRig) ?
                                                    <>
                                                        <Checkbox
                                                            checked={rigObject.familiar.includes(`${faMo.name}(2)`)}
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