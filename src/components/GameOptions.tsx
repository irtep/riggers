import { Container } from '@mui/material';
import React, { useContext, useState } from 'react';
import { Player, RigContext, RigObject, RigTestObject, TurnOrder } from '../context/RigContext';
import ShowRigInGame from './ShowRigInGame';
import DicePool from './DicePool';

const GameOptions: React.FC = (): React.ReactElement => {
    const [revealedIndices, setRevealedIndices] = useState<number>(0);
    const {
        rigTestObject,
        setRigTestObject,
        savedRigs,
        turnOrder,
        setTurnOrder
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

    const revealNext = () => {
        setRevealedIndices(prevNumber => prevNumber + 1);
    };

    const shuffleArray = (array: number[]): number[] => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const createTurnOrder = (numPlayers: number): TurnOrder => {
        const players = Array.from({ length: numPlayers }, (_, i) => i + 1);
    
        // Shuffle the player IDs to create two random pools
        const pool1 = shuffleArray([...players]);
        const pool2 = shuffleArray([...players]);
    
        return { pool1, pool2 };
    };
    

    const generateTurnOrder = () => {
        const newTurnOrder = createTurnOrder(rigTestObject.rigAmount);
        setTurnOrder(newTurnOrder);
        setRevealedIndices(0);
    };

    const combinedPools = turnOrder.pool1.concat(turnOrder.pool2);
    const revealedItems = combinedPools.slice(0, revealedIndices);

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
                <br/>
                <button
                    onClick={generateTurnOrder}
                >generate new turn order</button>
                <button onClick={revealNext}>Reveal next turn token</button>
            </p>
            
            {`turn sequence: `}

            {revealedItems}
            
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
                                            index={i}
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