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

                // Draw players and their heading indicators
                rigTestObject.players.forEach((player: Player, i: number) => {
                    let fillColor: string = 'red';
                    i === 1 ? fillColor = 'navy' : fillColor = 'red';

                    if (player.x !== undefined &&
                        player.y !== undefined &&
                        player.heading !== undefined) {

                        // Draw the main circle
                        ctx.beginPath();
                        ctx.arc(player.x, player.y, 25, 0, 2 * Math.PI); // Draw a 50 size circle
                        ctx.fillStyle = fillColor; // Fill color for the circle
                        ctx.strokeStyle = 'black';
                        ctx.fill();
                        ctx.stroke();

                        // Draw the heading indicator
                        const headingRadians = player.heading * (Math.PI / 180); // Convert heading to radians
                        const indicatorX = player.x + 25 * Math.cos(headingRadians); // 25 is the radius of the circle
                        const indicatorY = player.y + 25 * Math.sin(headingRadians);

                        ctx.beginPath();
                        ctx.arc(indicatorX, indicatorY, 3, 0, 2 * Math.PI); // Draw a small dot
                        ctx.fillStyle = 'lightGreen'; // Fill color for the indicator
                        ctx.fill();
                        ctx.stroke();

                        // Draw the rig text
                        ctx.font = '10px Arial';
                        ctx.fillStyle = 'white';
                        ctx.fillText(rigTestObject.players[i].rig, rigTestObject.players[i].x - 20, rigTestObject.players[i].y);

                        // if this is selected, then draw circle around it
                        if (rigTestObject.selectedRig -1 === i) {
                            ctx.beginPath();
                            ctx.arc(player.x, player.y, 30, 0, 2 * Math.PI); // Draw a 50 size circle
                            ctx.strokeStyle = 'cyan';
                            ctx.stroke();
                        }
                    }
                });

                // Draw lines and distances between players
                for (let i = 0; i < rigTestObject.players.length; i++) {
                    const player1 = rigTestObject.players[i];
                    for (let j = i + 1; j < rigTestObject.players.length; j++) {
                        const player2 = rigTestObject.players[j];

                        if (player1.x !== undefined && player1.y !== undefined &&
                            player2.x !== undefined && player2.y !== undefined) {
                            // Draw the line
                            ctx.beginPath();
                            ctx.moveTo(player1.x, player1.y);
                            ctx.lineTo(player2.x, player2.y);
                            ctx.strokeStyle = 'gray';
                            ctx.lineWidth = 1;
                            ctx.stroke();

                            if (rigTestObject.showDistances) {
                                // Calculate and draw the distance text
                                const distance = (Math.sqrt(Math.pow(player2.x - player1.x, 2) + Math.pow(player2.y - player1.y, 2)) - 50) * 0.1;
                                const midX = (player1.x + player2.x) / 2;
                                const midY = (player1.y + player2.y) / 2;
                                ctx.font = '10px Arial';
                                ctx.fillStyle = 'white';
                                ctx.fillText(Math.round(distance).toString(), midX, midY);
                            }
                        }
                    }
                }

                // draw primer pads
                // charred axle
                if (rigTestObject.gameType === 'charred axle') {
                    ctx.beginPath();
                    ctx.arc(125, 125, 20, 0, 2 * Math.PI);
                    if (rigTestObject.primerTwoCharged) {
                        ctx.strokeStyle = 'lightGreen';
                    } else {
                        ctx.strokeStyle = 'black';
                    }
                    ctx.stroke();
                    ctx.font = '10px Arial';
                    ctx.fillStyle = 'white';
                    ctx.fillText('pad 2', 115, 125);

                    ctx.beginPath();
                    ctx.arc(375, 125, 20, 0, 2 * Math.PI);
                    if (rigTestObject.primerThreeCharged) {
                        ctx.strokeStyle = 'lightGreen';
                    } else {
                        ctx.strokeStyle = 'black';
                    }
                    ctx.stroke();
                    ctx.font = '10px Arial';
                    ctx.fillStyle = 'white';
                    ctx.fillText('pad 3', 365, 125);

                    ctx.beginPath();
                    ctx.arc(125, 375, 20, 0, 2 * Math.PI);
                    if (rigTestObject.primerOneCharged) {
                        ctx.strokeStyle = 'lightGreen';
                    } else {
                        ctx.strokeStyle = 'black';
                    }
                    ctx.stroke();
                    ctx.font = '10px Arial';
                    ctx.fillStyle = 'white';
                    ctx.fillText('pad 1', 115, 375);
                }

                // obstacles
                if (rigTestObject.map === 'test 1') {
                    ctx.beginPath();
                    ctx.rect(155, 155, 50, 50);
                    ctx.fillStyle = 'black';
                    ctx.fill();
                    ctx.fillStyle = 'white';
                    ctx.fillText('obstacle', 158, 165);

                    ctx.beginPath();
                    ctx.rect(355, 255, 70, 50);
                    ctx.fillStyle = 'black';
                    ctx.fill();
                    ctx.fillStyle = 'white';
                    ctx.fillText('obstacle', 357, 265);

                    ctx.beginPath();
                    ctx.rect(155, 355, 50, 50);
                    ctx.fillStyle = 'black';
                    ctx.fill();
                    ctx.fillStyle = 'white';
                    ctx.fillText('obstacle', 158, 365);
                }
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
                    updatedPlayers[rigTestObject.selectedRig - 1].x = x;
                    updatedPlayers[rigTestObject.selectedRig - 1].y = y;
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
                                        {msg}<br />
                                        <Button
                                            onClick={() => {
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
                            <GameOptions />
                        </> :
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
                        background: 'gray',
                        margin: 4
                    }}>
                </canvas>
            </div>
        </div>
    );
}

export default TestRigs;