import { Button, Checkbox, Container, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Switch, TextField, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { Chassis, chassises } from '../../data/chassises';
import { Weapon, weapons } from '../../data/weapons';
import { Modification, SpecialEffect, rigModifications, weaponModifications } from '../../data/modifications';
import { Ammunition, GunnerSpecial, ammunitions, gunnerSpecials } from '../../data/gunnerSpecials';
import { familiarModifications, familiarWeapons } from '../../data/familiar';
import { Mine, mines } from '../../data/mines';
import { ConcealedWeapons, DriverSpecial, concealedWeapons, driverSpecials } from '../../data/driverSpecials';
import { MobileDetails, RigContext, RigObject } from '../../context/RigContext';
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

    interface Prices {
        slots: number;
    }

    interface Stats {
        speed: number;
        armour: number;
        handling: number;
        resistanceFields: number;
    }

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

    const handleWeaponChange = (event: React.ChangeEvent<HTMLInputElement>, weapon: Weapon, dublicates: number) => {
        let prevRigObject = { ...rigObject };
        const isChecked = event.target.checked;
        let weaponName = weapon.name;

        if (isChecked) {
            prevRigObject = {
                ...prevRigObject,
                selectedWeapons: [...prevRigObject.selectedWeapons, weaponName]
            };
        } else {
            prevRigObject = {
                ...prevRigObject,
                selectedWeapons: prevRigObject.selectedWeapons.filter((name: string) => name !== weaponName)
            };
        }
        setRigObject(updateRig(prevRigObject));
    };

    const handleMineChange = (event: React.ChangeEvent<HTMLInputElement>, mine: Mine, dublicates: number) => {
        let prevRigObject = { ...rigObject };
        let mineName = mine.name;
        const isChecked = event.target.checked;

        if (isChecked) {
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

    const handleFamiliarChange = (event: React.ChangeEvent<HTMLInputElement>, eq: any, dublicates: number) => {
        let prevRigObject = { ...rigObject };
        let eqName = eq.name;
        const isChecked = event.target.checked;

        if (isChecked) {
            prevRigObject = {
                ...prevRigObject,
                familiar: [...prevRigObject.familiar, eqName]
            };
        } else {

            prevRigObject = {
                ...prevRigObject,
                familiar: prevRigObject.familiar.filter((name: string) => name !== eqName)
            };
        }
        setRigObject(updateRig(prevRigObject));
    };

    const handleModChange = (event: React.ChangeEvent<HTMLInputElement>, mod: Modification, dublicates: number, forWho?: string) => {
        let prevRigObject = { ...rigObject };
        let modName = mod.name;
        const isChecked = event.target.checked;

        if (isChecked) {
            prevRigObject = {
                ...prevRigObject,
                mods: [...prevRigObject.mods, modName]
            };
        } else {
            prevRigObject = {
                ...prevRigObject,
                mods: prevRigObject.mods.filter((name: string) => name !== modName)
            };
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
                        label="What game?"
                        onChange={(e) => {
                            setRigObject({
                                ...rigObject,
                                chassis: e.target.value
                            });
                            updateRig({
                                ...rigObject,
                                chassis: e.target.value
                            });
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
                                                                : <></>
                                                        }
                                                        {
                                                            (device === 'mobile') ?
                                                                <Visibility
                                                                    onClick={() => {
                                                                        handleDetails(m.name, 'modification');
                                                                    }}
                                                                /> :
                                                                <></>
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
                                                            {
                                                                (device === 'mobile') ?
                                                                    <Visibility
                                                                        onClick={() => {
                                                                            handleDetails(wm.name, 'modification');
                                                                        }}
                                                                    /> :
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
                                                onChange={() => setRigObject({
                                                    ...rigObject, driverSpecial: driverSpecial.name
                                                })}
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

                                            <Checkbox
                                                checked={rigObject.mines.includes(mine.name)}
                                                onChange={(event) => handleMineChange(event, mine, 0)}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
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