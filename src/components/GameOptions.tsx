import { Container } from '@mui/material';
import React, { useContext } from 'react';
import { Player, RigContext, RigObject } from '../context/RigContext';
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
        console.log('set this to true');
        // Update rig position
        /*
        const updatedPlayers = [...rigTestObject.players];
        updatedPlayers[rigTestObject.selectedRig].x = 250; // Example position
        updatedPlayers[rigTestObject.selectedRig].y = 250; // Example position
        setRigTestObject({ ...rigTestObject, players: updatedPlayers });
        */
    };

    const moveRigByDistance = () => {
        const distance: number = 50;
        const updatedPlayers = [...rigTestObject.players];
        const player = updatedPlayers[rigTestObject.selectedRig];
        if (player.x !== undefined && player.y !== undefined && player.heading !== undefined) {
            player.x += distance * Math.cos(player.heading * (Math.PI / 180));
            player.y += distance * Math.sin(player.heading * (Math.PI / 180));
            setRigTestObject({ ...rigTestObject, players: updatedPlayers });
        }
    };

    const turnRig = (angle: number) => {
        const updatedPlayers = [...rigTestObject.players];
        const player = updatedPlayers[rigTestObject.selectedRig];
        if (player.heading !== undefined) {
            player.heading += angle;
            setRigTestObject({ ...rigTestObject, players: updatedPlayers });
        }
    };

    return (
        <Container>
            <p style={{ fontSize: 12 }}>
                {rigTestObject.gameType}
            </p>
            <p style={{ fontSize: 12 }}>
                Round: <input type="number" style={{ width: 35, margin: 1 }} />
                Primers (charged): 1: <input type="checkbox" /> 2: <input type="checkbox" /> 3: <input type="checkbox" />
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
                >select rig 1</button>
                <button
                    onClick={() => {
                        setRigTestObject({
                            ...rigTestObject,
                            selectedRig: 2
                        });
                    }}
                >select rig 2</button>
            </div>
            {
                rigTestObject.selectedRig > 0 ?
                    <>
                        <button onClick={moveRigToSelectedPlace}>move rig to selected place</button>
                        <button onClick={() => moveRigByDistance}>move rig 5 cm</button>
                        <button onClick={() => turnRig(15)}>turn rig to right</button>
                        <button onClick={() => turnRig(-15)}>turn rig to left</button>
                    </>
                    : <></>
            }
            {
                rigTestObject.players.map((player: Player, i: number) => {
                    const findHisRig: RigObject[] = savedRigs.filter((rig: RigObject) => rig.name === player.rig);
                    console.log('fhr: ', findHisRig);
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