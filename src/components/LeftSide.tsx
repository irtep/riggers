import { Checkbox, Container, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Switch, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { CreateProps } from './Create';
import { chassises } from '../data/chassises';
import { Weapon, weapons } from '../data/weapons';

const LeftSide: React.FC<CreateProps> = (props: CreateProps): React.ReactElement => {
    const [hovered, setHovered] = useState<string>('');
    const [showWeapons, setShowWeapons] = useState<boolean>(true);

    const handleWeaponChange = (event: React.ChangeEvent<HTMLInputElement>, weaponName: string) => {
        const isChecked = event.target.checked;
        const prevSelectedWeapons = [...props.selectedWeapons];

        if (isChecked) {
            if (!prevSelectedWeapons.includes(weaponName)) {
                props.setSelectedWeapons([...prevSelectedWeapons, weaponName]);
            }
        } else {
            props.setSelectedWeapons(prevSelectedWeapons.filter((name: string) => name !== weaponName));
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
                        value={props.name}
                        label="Name your rig"
                        onChange={(e) => {
                            props.setName(e.target.value)
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
                        value={props.chassis}
                        label="What game?"
                        onChange={(e) => { props.setChassis(e.target.value) }}
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
                        onChange={ (e) => {
                            setShowWeapons(e.target.checked);
                        }}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </Typography>
                {
                    showWeapons ?
                        <>
                            {
                                weapons.map((w: Weapon, i: number) => {
                                    return (
                                        <Container key={`w ${i}`}>

                                            {w.name}

                                            <Checkbox
                                                checked={props.selectedWeapons.includes(w.name)}
                                                onChange={(event) => handleWeaponChange(event, w.name)}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                            <Checkbox
                                                checked={props.selectedWeapons.includes(`${w.name}(2)`)}
                                                onChange={(event) => handleWeaponChange(event, `${w.name}(2)`)}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
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