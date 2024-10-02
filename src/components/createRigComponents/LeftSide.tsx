import { Button, Checkbox, Container, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Switch, TextField, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { Chassis, chassises } from '../../data/chassises';
import { Weapon, weapons } from '../../data/weapons';
import { Modification, rigModifications, weaponModifications } from '../../data/modifications';
import { Ammunition, GunnerSpecial, ammunitions, gunnerSpecials } from '../../data/gunnerSpecials';
import { familiarModifications, familiarWeapons } from '../../data/familiar';
import { Mine, mines } from '../../data/mines';
import { ConcealedWeapons, DriverSpecial, concealedWeapons, driverSpecials } from '../../data/driverSpecials';
import { MobileDetails, RigContext } from '../../context/RigContext';
import { Visibility } from '@mui/icons-material';

const LeftSide: React.FC = (): React.ReactElement => {

    const { rigObject,
        setRigObject,
        setMode,
        saveRig,
        overwriteRig,
        setMsg,
        mode,
        msg,
        device,
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
        setHovered,
        stripParentheses,
        setMobileDetails,
        updateRig
    } = useContext(RigContext);

    const handleDetails = (name: string, type: string): void => {

        let fullDetails: MobileDetails = {
            name: name,
            type: type,
            fullDetails: ''
        };

        switch (type) {
            case 'weapon':
                const getWeapon = weapons.filter((w: Weapon) => w.name === stripParentheses(name));
                fullDetails.fullDetails = getWeapon[0]
                break;
            case 'modification':
                const getMod = rigModifications.concat(weaponModifications).filter((w: Modification) => w.name === stripParentheses(name));
                fullDetails.fullDetails = getMod[0]
                break;
            case 'driverSpecial':
                const driSpecial = driverSpecials.filter((w: DriverSpecial) => w.name === stripParentheses(name));
                fullDetails.fullDetails = driSpecial[0]
                break;
            case 'gunnerSpecial':
                const gunnerSpecial = gunnerSpecials.filter((w: GunnerSpecial) => w.name === stripParentheses(name));
                fullDetails.fullDetails = gunnerSpecial[0]
                break;
            case 'mine':
                const mine = mines.filter((w: Mine) => w.name === stripParentheses(name));
                fullDetails.fullDetails = mine[0]
                break;
            case 'familiarStuff':
                const famStuff: (Weapon | Modification)[] = ([] as (Weapon | Modification)[]).concat(familiarWeapons, familiarModifications).filter((w: Weapon | Modification) => w.name === stripParentheses(name));
                fullDetails.fullDetails = famStuff[0];
                break;
            case 'concealedWeapon':
                const concealedW = concealedWeapons.filter((w: ConcealedWeapons) => w.name === stripParentheses(name));
                fullDetails.fullDetails = concealedW[0]
                break;

            default: console.log('not found: ', type);
        };

        window.scrollTo({ top: 0, behavior: 'smooth' });
        setMobileDetails(fullDetails);
    }

    const handleWeaponChange = (weapon: Weapon, add: boolean) => {
        let prevRigObject = { ...rigObject };
        let weaponName = weapon.name;

        if (add) {
            prevRigObject = {
                ...prevRigObject,
                selectedWeapons: [...prevRigObject.selectedWeapons, weaponName]
            };
        } else {
            const weaponIndex = prevRigObject.selectedWeapons.indexOf(weaponName);
            if (weaponIndex !== -1) {
                prevRigObject = {
                    ...prevRigObject,
                    selectedWeapons: [
                        ...prevRigObject.selectedWeapons.slice(0, weaponIndex),
                        ...prevRigObject.selectedWeapons.slice(weaponIndex + 1)
                    ]
                };
            }
        }

        setRigObject(updateRig(prevRigObject));
    };

    const handleMineChange = (mine: Mine, add: boolean) => {
        let prevRigObject = { ...rigObject };
        let mineName = mine.name;

        if (add) {
            prevRigObject = {
                ...prevRigObject,
                mines: [...prevRigObject.mines, mineName]
            };
        } else {
            prevRigObject = {
                ...prevRigObject,
                mines: prevRigObject.mines.filter((name: string) => name !== mineName)
            };
        }
        setRigObject(updateRig(prevRigObject));
    };

    const handleDriverSpecial = (special: string, add: boolean) => {
        let prevRigObject = { ...rigObject };

        if (add) {
            prevRigObject = {
                ...prevRigObject,
                driverSpecial: special
            };
        }

        setRigObject(updateRig(prevRigObject));
    };

    const handleRightToolChange = (tool: any, add: boolean) => {
        let prevRigObject = { ...rigObject };
        let selectedTool = tool.name;

        if (add) {
            prevRigObject = {
                ...prevRigObject,
                rightTool: [...prevRigObject.rightTool, selectedTool]
            };
        } else {
            const rtIndex = prevRigObject.rightTool.indexOf(selectedTool);
            if (rtIndex !== -1) {
                prevRigObject = {
                    ...prevRigObject,
                    rightTool: [
                        ...prevRigObject.rightTool.slice(0, rtIndex),
                        ...prevRigObject.rightTool.slice(rtIndex + 1)
                    ]
                };
            }
        }
        setRigObject(updateRig(prevRigObject));
    };

    const handleFamiliarChange = (eq: any, add: boolean) => {
        let prevRigObject = { ...rigObject };
        let eqName = eq.name;

        if (add) {
            prevRigObject = {
                ...prevRigObject,
                familiar: [...prevRigObject.familiar, eqName]
            };
        } else {
            const famEqIndex = prevRigObject.familiar.indexOf(eqName);
            if (famEqIndex !== -1) {
                prevRigObject = {
                    ...prevRigObject,
                    familiar: [
                        ...prevRigObject.familiar.slice(0, famEqIndex),
                        ...prevRigObject.familiar.slice(famEqIndex + 1)
                    ]
                };
            }
        }
        setRigObject(updateRig(prevRigObject));
    };

    const handleChassisChange = (newValue: React.ChangeEvent<HTMLInputElement>) => {
        let chassisAdded = {
            ...rigObject,
            chassis: newValue
        };

        setRigObject(updateRig(chassisAdded));
    };

    const handleModChange = (mod: Modification, add: boolean) => {
        let prevRigObject = { ...rigObject };
        let modName = mod.name;

        if (add) {
            prevRigObject = {
                ...prevRigObject,
                mods: [...prevRigObject.mods, modName]
            };
        } else {
            const modIndex = prevRigObject.mods.indexOf(modName);
            if (modIndex !== -1) {
                prevRigObject = {
                    ...prevRigObject,
                    mods: [
                        ...prevRigObject.mods.slice(0, modIndex),
                        ...prevRigObject.mods.slice(modIndex + 1)
                    ]
                };
            }
        }

        setRigObject(updateRig(prevRigObject));
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
                            } else if (mode === 'create') {
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
                        onChange={(e) => {
                            handleChassisChange(e.target.value);
                        }}
                    >
                        {chassises.map((value: Chassis, index: number) => (
                            <MenuItem key={`chassis ${index}`} value={value.name}>
                                {value.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <br />

                <Typography sx={{ borderBottom: " 1px solid green" }}>
                    Show weapons:
                    <Switch
                        checked={showWeapons}
                        onChange={(e) => {
                            setShowWeapons(e.target.checked);
                        }}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                    <br />
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

                                            <Button
                                                sx={{
                                                    background: 'darkGreen',
                                                    color: 'white',
                                                    margin: 0.5,
                                                    width: 20,
                                                    height: 20
                                                }}
                                                onClick={() => {
                                                    handleWeaponChange(w, true);
                                                }}
                                            >
                                                +
                                            </Button>

                                            <Button
                                                sx={{
                                                    background: 'darkRed',
                                                    color: 'white',
                                                    margin: 0.5,
                                                    width: 20,
                                                    height: 20
                                                }}
                                                onClick={() => {
                                                    handleWeaponChange(w, false);
                                                }}
                                            >
                                                -
                                            </Button>

                                            {
                                                (device === 'mobile') ?
                                                    <Visibility
                                                        onClick={() => {
                                                            handleDetails(w.name, 'weapon');
                                                        }}
                                                    /> :
                                                    <></>
                                            }
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

                                            <Button
                                                sx={{
                                                    background: 'darkGreen',
                                                    color: 'white',
                                                    margin: 0.5,
                                                    width: 20,
                                                    height: 20
                                                }}
                                                onClick={() => {
                                                    handleModChange(m, true);
                                                }}
                                            >
                                                +
                                            </Button>

                                            <Button
                                                sx={{
                                                    background: 'darkRed',
                                                    color: 'white',
                                                    margin: 0.5,
                                                    width: 20,
                                                    height: 20
                                                }}
                                                onClick={() => {
                                                    handleModChange(m, false);
                                                }}
                                            >
                                                -
                                            </Button>
                                            {
                                                (device === 'mobile') ?
                                                    <Visibility
                                                        onClick={() => {
                                                            handleDetails(m.name, 'modification');
                                                        }}
                                                    /> :
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

                                            <strong>{wm.name}</strong><br />

                                            {
                                                rigObject.selectedWeapons.map((sw: string, ixx: number) => {
                                                    return (
                                                        <span key={` swM ${ixx}`}>
                                                            {` for ${sw}`}
                                                            <Button
                                                                sx={{
                                                                    background: 'darkGreen',
                                                                    color: 'white',
                                                                    margin: 0.5,
                                                                    width: 20,
                                                                    height: 20
                                                                }}
                                                                onClick={() => {
                                                                    handleModChange(wm, true);
                                                                }}
                                                            >
                                                                +
                                                            </Button>

                                                            <Button
                                                                sx={{
                                                                    background: 'darkRed',
                                                                    color: 'white',
                                                                    margin: 0.5,
                                                                    width: 20,
                                                                    height: 20
                                                                }}
                                                                onClick={() => {
                                                                    handleModChange(wm, false);
                                                                }}
                                                            >
                                                                -
                                                            </Button>
                                                            {
                                                                (device === 'mobile') ?
                                                                    <Visibility
                                                                        onClick={() => {
                                                                            handleDetails(wm.name, 'modification');
                                                                        }}
                                                                    /> :
                                                                    <></>
                                                            }
                                                            <br />
                                                        </span>
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
                                            {
                                                (device === 'mobile') ?
                                                    <Visibility
                                                        onClick={() => {
                                                            handleDetails(gW.name, 'concealedWeapon');
                                                        }}
                                                    /> :
                                                    <></>
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
                                            {
                                                (device === 'mobile') ?
                                                    <Visibility
                                                        onClick={() => {
                                                            handleDetails(gs.name, 'gunnerSpecial');
                                                        }}
                                                    /> :
                                                    <></>
                                            }
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
                                                onChange={() => {
                                                    handleDriverSpecial(driverSpecial.name, true);
                                                }}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                            {
                                                (device === 'mobile') ?
                                                    <Visibility
                                                        onClick={() => {
                                                            handleDetails(driverSpecial.name, 'driverSpecial');
                                                        }}
                                                    /> :
                                                    <></>
                                            }
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

                                            <Button
                                                sx={{
                                                    background: 'darkGreen',
                                                    color: 'white',
                                                    margin: 0.5,
                                                    width: 20,
                                                    height: 20
                                                }}
                                                onClick={() => {
                                                    handleMineChange(mine, true);
                                                }}
                                            >
                                                +
                                            </Button>

                                            <Button
                                                sx={{
                                                    background: 'darkRed',
                                                    color: 'white',
                                                    margin: 0.5,
                                                    width: 20,
                                                    height: 20
                                                }}
                                                onClick={() => {
                                                    handleMineChange(mine, false);
                                                }}
                                            >
                                                -
                                            </Button>
                                            {
                                                (device === 'mobile') ?
                                                    <Visibility
                                                        onClick={() => {
                                                            handleDetails(mine.name, 'mine');
                                                        }}
                                                    /> :
                                                    <></>
                                            }
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

                                            <Button
                                                sx={{
                                                    background: 'darkGreen',
                                                    color: 'white',
                                                    margin: 0.5,
                                                    width: 20,
                                                    height: 20
                                                }}
                                                onClick={() => {
                                                    handleRightToolChange(ammu, true);
                                                }}
                                            >
                                                +
                                            </Button>

                                            <Button
                                                sx={{
                                                    background: 'darkRed',
                                                    color: 'white',
                                                    margin: 0.5,
                                                    width: 20,
                                                    height: 20
                                                }}
                                                onClick={() => {
                                                    handleRightToolChange(ammu, false);
                                                }}
                                            >
                                                -
                                            </Button>
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

                                            <Button
                                                sx={{
                                                    background: 'darkGreen',
                                                    color: 'white',
                                                    margin: 0.5,
                                                    width: 20,
                                                    height: 20
                                                }}
                                                onClick={() => {
                                                    handleFamiliarChange(faWe, true);
                                                }}
                                            >
                                                +
                                            </Button>

                                            <Button
                                                sx={{
                                                    background: 'darkRed',
                                                    color: 'white',
                                                    margin: 0.5,
                                                    width: 20,
                                                    height: 20
                                                }}
                                                onClick={() => {
                                                    handleFamiliarChange(faWe, false);
                                                }}
                                            >
                                                -
                                            </Button>
                                            {
                                                (device === 'mobile') ?
                                                    <Visibility
                                                        onClick={() => {
                                                            handleDetails(faWe.name, 'familiarStuff');
                                                        }}
                                                    /> :
                                                    <></>
                                            }
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

                                            <Button
                                                sx={{
                                                    background: 'darkGreen',
                                                    color: 'white',
                                                    margin: 0.5,
                                                    width: 20,
                                                    height: 20
                                                }}
                                                onClick={() => {
                                                    handleFamiliarChange(faMo, true);
                                                }}
                                            >
                                                +
                                            </Button>

                                            <Button
                                                sx={{
                                                    background: 'darkRed',
                                                    color: 'white',
                                                    margin: 0.5,
                                                    width: 20,
                                                    height: 20
                                                }}
                                                onClick={() => {
                                                    handleFamiliarChange(faMo, false);
                                                }}
                                            >
                                                -
                                            </Button>
                                            {
                                                (device === 'mobile') ?
                                                    <Visibility
                                                        onClick={() => {
                                                            handleDetails(faMo.name, 'familiarStuff');
                                                        }}
                                                    /> :
                                                    <></>
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