import { Container } from '@mui/material';
import React, { useContext } from 'react';
import { Player, RigContext, RigObject, RigTestObject } from '../context/RigContext';
import ShowRigInGame from './ShowRigInGame';
import DicePool from './DicePool';

const GameOptions: React.FC = (): React.ReactElement => {
    const {
        rigTestObject,
        setRigTestObject,
        savedRigs
    } = useContext(RigContext);

    const moveRigToSelectedPlace = () => {
        setRigTestObject({
            ...rigTestObject,
            selectingPlace: true
        });
    };

    const moveRigByDistance = () => {
        const distance: number = 50;
        const updatedPlayers = [...rigTestObject.players];
        const player = updatedPlayers[rigTestObject.selectedRig - 1];

        if (player.x !== undefined && player.y !== undefined && player.heading !== undefined) {
            player.x += distance * Math.cos(player.heading * (Math.PI / 180));
            player.y += distance * Math.sin(player.heading * (Math.PI / 180));
            setRigTestObject({ ...rigTestObject, players: updatedPlayers });
        }
    };

    const reverseRig = () => {
        const distance: number = 50;
        const updatedPlayers = [...rigTestObject.players];
        const player = updatedPlayers[rigTestObject.selectedRig - 1];

        if (player.x !== undefined && player.y !== undefined && player.heading !== undefined) {
            player.x -= distance * Math.cos(player.heading * (Math.PI / 180));
            player.y -= distance * Math.sin(player.heading * (Math.PI / 180));
            setRigTestObject({ ...rigTestObject, players: updatedPlayers });
        }
    };

    const turnRig = (angle: number) => {
        const updatedPlayers = [...rigTestObject.players];
        const player = updatedPlayers[rigTestObject.selectedRig - 1];
        if (player.heading !== undefined) {
            player.heading += angle;
            setRigTestObject({ ...rigTestObject, players: updatedPlayers });
        }
    };

    const handlePrimerOneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRigTestObject((prevState: RigTestObject) => ({
            ...prevState,
            primerOneCharged: event.target.checked
        }));
    };

    const handlePrimerTwoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRigTestObject((prevState: RigTestObject) => ({
            ...prevState,
            primerTwoCharged: event.target.checked
        }));
    };

    const handlePrimerThreeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRigTestObject((prevState: RigTestObject) => ({
            ...prevState,
            primerThreeCharged: event.target.checked
        }));
    };

    return (
        <Container>
            <p style={{ fontSize: 12 }}>
                {rigTestObject.gameType} at {rigTestObject.world}
            </p>
            <p style={{ fontSize: 12 }}>
                Round: <input type="number" style={{ width: 35, margin: 1 }} />
                Primers (charged):
                <input type="checkbox" checked={rigTestObject.primerOneCharged} onChange={handlePrimerOneChange} /> 1
                <input type="checkbox" checked={rigTestObject.primerTwoCharged} onChange={handlePrimerTwoChange} /> 2
                <input type="checkbox" checked={rigTestObject.primerThreeCharged} onChange={handlePrimerThreeChange} /> 3
            </p>

            <DicePool />

            <div>
                <button
                    onClick={() => {
                        setRigTestObject({
                            ...rigTestObject,
                            selectedRig: 1
                        });
                    }}
                    style={{
                        color: 'white',
                        background: 'darkRed'
                    }}
                >select rig 1</button>
                <button
                    onClick={() => {
                        setRigTestObject({
                            ...rigTestObject,
                            selectedRig: 2
                        });
                    }}
                    style={{
                        color: 'white',
                        background: 'navy'
                    }}
                >select rig 2</button>
                {
                    rigTestObject.familiarOne.enabled ?
                        <>
                            <button
                                onClick={() => {
                                    setRigTestObject({
                                        ...rigTestObject,
                                        selectedRig: 3
                                    });
                                }}
                                style={{
                                    color: 'black',
                                    background: 'red'
                                }}
                            >select familiar 1</button>
                        </> : <></>
                }
                {
                    rigTestObject.familiarTwo.enabled ?
                        <>
                            <button
                                onClick={() => {
                                    setRigTestObject({
                                        ...rigTestObject,
                                        selectedRig: 4
                                    });
                                }}
                                style={{
                                    color: 'white',
                                    background: 'blue'
                                }}
                            >select familiar 2</button>
                        </> : <></>
                }
                <button
                    onClick={() => {
                        setRigTestObject({
                            ...rigTestObject,
                            showDistances: !rigTestObject.showDistances
                        });
                    }}
                    style={{
                        color: 'black',
                        background: 'yellow'
                    }}
                >show distances</button>
            </div>
            {
                rigTestObject.selectedRig > 0 ?
                    <>
                        <button onClick={moveRigToSelectedPlace}>move rig to selected place</button>
                        <button onClick={() => moveRigByDistance()}>move rig 5 cm</button>
                        <button onClick={() => reverseRig()}>reverse rig 5 cm</button>
                        <button onClick={() => turnRig(15)}>turn rig to right</button>
                        <button onClick={() => turnRig(-15)}>turn rig to left</button>
                    </>
                    : <></>
            }
            {
                rigTestObject.players.map((player: Player, i: number) => {
                    const findHisRig: RigObject[] = savedRigs.filter((rig: RigObject) => rig.name === player.rig);

                    return (
                        <Container key={`playerStats ${i}`}>
                            {
                                (findHisRig.length > 0) ?
                                    <>
                                        <ShowRigInGame
                                            selectedRig={findHisRig[0]}
                                        />
                                    </> : <></>
                            }
                        </Container>
                    )
                })
            }
        </Container>
    );
}

export default GameOptions;