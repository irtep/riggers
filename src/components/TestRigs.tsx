import React, { useContext, useEffect, useRef, useState } from 'react';
import { RigContext, Player } from '../context/RigContext';
import TestRigMenu from './TestRigMenu';
import { Button } from '@mui/material';
import GameOptions from './GameOptions';

const TestRigs: React.FC = (): React.ReactElement => {
    const [testState, setTestState] = useState<string>('setup');
    const [msg, setMgs] = useState<string>('');
    const {
        rigTestObject,
        setRigTestObject,
        selectingPlace,
        setSelectingPlace
    } = useContext(RigContext);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const setupDone = (): void => {
        let namelessRig: boolean = false;

        for (let i = 0; i < rigTestObject.rigAmount; i++) {
            if (rigTestObject.players[i].rig === '') {
                namelessRig = true;
            }
        }
        
        if (namelessRig) {
             setMgs('choose all rigs');
        } else {
            setTestState('play');
        }
    };

    const draw = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

                rigTestObject.players.forEach( (player: Player) => {
                    if (player.x !== undefined && player.y !== undefined) {
                        ctx.beginPath();
                        ctx.arc(player.x, player.y, 25, 0, 2 * Math.PI); // Draw a 50 size circle
                        ctx.fillStyle = 'red'; // Fill color for the circle
                        ctx.fill();
                        ctx.stroke();
                    }
                });
            }
        }
    };

    useEffect(() => {
        draw();
        console.log('rto: ', rigTestObject, ' selecting: ', rigTestObject.selectingPlace);
    }, [rigTestObject, rigTestObject.selectingPlace]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const handleCanvasClick = (event: MouseEvent) => {
            if (canvas) {
                const rect = canvas.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                if (rigTestObject.selectingPlace && rigTestObject.selectedRig > 0) {
                    console.log('selecting true and selected rig');
                    const updatedPlayers = [...rigTestObject.players];
                    updatedPlayers[rigTestObject.selectedRig-1].x = x;
                    updatedPlayers[rigTestObject.selectedRig-1].y = y;
                    setRigTestObject({ 
                        ...rigTestObject, 
                        selectingPlace: false,
                        players: updatedPlayers
                     });
                } else {
                    console.log('no: ', rigTestObject.selectingPlace, rigTestObject.selectedRig);
                }
            }
        };
        canvas?.addEventListener('click', handleCanvasClick);

        return () => {
            canvas?.removeEventListener('click', handleCanvasClick);
        };
    }, [rigTestObject]);

    return (
        <div style={{
            display: 'flex',
            height: '100vh',
            color: 'white'
        }}>

            <div style={{
                width: '50%',
                background: 'darkGray',
                color: 'black'
            }}>
                {
                    testState === 'setup' ?
                        <>
                            <TestRigMenu />
                            {
                            (rigTestObject.gameType !== '' &&
                                rigTestObject.rigAmount !== 0 &&
                                rigTestObject.world !== '' &&
                                rigTestObject.map !== '') ?
                            <>
                            {msg}<br/>
                            <Button
                                onClick={ () => {
                                    setupDone();
                                }}
                            >start test</Button>
                            </> :
                            <>
                            </>
                        }
                        </> :
                        <></>
                }
                {
                    testState === 'play' ?
                    <>
                        <GameOptions/>
                    </>:
                    <></>
                }
            </div>
            <div style={{
                width: '50%',
                justifyContent: 'center'
            }}>
                <canvas
                    ref={canvasRef}
                    width="500"
                    height="500"
                    style={{
                        border: '1px solid black',
                        background: 'gray'
                    }}>
                </canvas>
            </div>
        </div>
    );
}

export default TestRigs;