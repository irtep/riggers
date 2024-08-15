import { Button, Container, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { rigTestConstants } from '../../data/contantsForRigTest';
import { RigContext, RigObject } from '../../context/RigContext';

const TestRigMenu: React.FC = (): React.ReactElement => {
    const {
        rigTestObject,
        setRigTestObject,
        savedRigs
    } = useContext(RigContext);

    const handleSelectChange = (index: number, value: string) => {
        const updatedPlayers = [...rigTestObject.players];
        updatedPlayers[index] = { 
            ...updatedPlayers[index], 
            rig: value,
            enabled: true
        };
        setRigTestObject({
            ...rigTestObject,
            players: updatedPlayers
        });
    };

    const handleRigAmountChange = (value: number) => {
        setRigTestObject({
            ...rigTestObject,
            rigAmount: value
        });
    };

    useEffect(() => {
        console.log('x: ', rigTestObject);
    }, [rigTestObject]);

    return (
        <Container sx={{ background: 'darkGray' }}>
            <FormControl sx={{ margin: 2, minWidth: '80%' }}>
                <InputLabel id="dropdown-label">Game type</InputLabel>
                <Select
                    labelId="dropdown-label"
                    id="gameChooser"
                    value={rigTestObject.gameType}
                    label="Type of game?"
                    onChange={(e) => {
                        setRigTestObject({
                            ...rigTestObject,
                            gameType: e.target.value
                        });
                    }}
                >
                    {rigTestConstants.gameTypes.map((value: string, index: number) => (
                        <MenuItem key={index} value={value}>
                            {value}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl sx={{ margin: 2, minWidth: '80%' }}>
                <InputLabel id="dropdown-label">How many rigs</InputLabel>
                <Select
                    labelId="dropdown-label"
                    id="rigNumberChooser"
                    value={rigTestObject.rigAmount}
                    label="How many rigs?"
                    onChange={(e) => {
                        handleRigAmountChange(e.target.value as number);
                    }}
                >
                    {rigTestConstants.rigs.map((value: number, index: number) => (
                        <MenuItem key={index} value={value}>
                            {value}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl sx={{ margin: 2, minWidth: '80%' }}>
                <InputLabel id="dropdown-label">Choose World</InputLabel>
                <Select
                    labelId="dropdown-label"
                    id="worldChooser"
                    value={rigTestObject.world}
                    label="World"
                    onChange={(e) => {
                        setRigTestObject({
                            ...rigTestObject,
                            world: e.target.value
                        });
                    }}
                >
                    {rigTestConstants.worlds.map((value: string, index: number) => (
                        <MenuItem key={index} value={value}>
                            {value}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl sx={{ margin: 2, minWidth: '80%' }}>
                <InputLabel id="dropdown-label">Choose map</InputLabel>
                <Select
                    labelId="dropdown-label"
                    id="mapChooser"
                    value={rigTestObject.map || ''}
                    label="World"
                    onChange={(e) => {
                        setRigTestObject({
                            ...rigTestObject,
                            map: e.target.value
                        });
                    }}
                >
                    {rigTestConstants.maps.map((value: string, index: number) => (
                        <MenuItem key={index} value={value}>
                            {value}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {(rigTestObject.rigAmount > 0) &&
                Array.from({ length: rigTestObject.rigAmount }, (_, index: number) => (
                    <div key={`selectRig ${index}`}>
                        <FormControl sx={{ margin: 2, minWidth: '80%' }}>
                            <InputLabel id={`dropdown-label-${index}`}>{`choose rig ${index}`}</InputLabel>
                            <Select
                                labelId={`dropdown-label-${index}`}
                                id={`dropdown-${index}`}
                                value={rigTestObject.players[index]?.rig || ''}
                                label="Choose a rig"
                                onChange={(e) => {
                                    handleSelectChange(index, e.target.value as string);
                                }}
                            >
                                {savedRigs.map((rig: RigObject, ix: number) => (
                                    <MenuItem key={`mapped rigs: ${ix}`} value={rig.name}>
                                        {rig.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                ))
            }
        </Container>
    );
}

export default TestRigMenu;
