import { Button, Container, Typography } from '@mui/material';
import React, { useEffect, useContext } from 'react';
import Create from './createRigComponents/Create';
import { RigContext, RigObject } from '../context/RigContext';
import TestRigs from './rigTestComponents/TestRigs';
import Lore from './Lore';
import RuleIndex from './RuleIndex';
import FamousRigs from './FamousRigs';
import BookEditor from './bookComponents/BookEditor';

const Main: React.FC = (): React.ReactElement => {

    const { rigObject,
        setRigObject,
        fetchSavedRigs,
        mode,
        setMode,
        initialObject,
        savedRigs,
        deleteRig
    } = useContext(RigContext);

    useEffect(() => {
        fetchSavedRigs();
    }, []);

    useEffect(() => {
        console.log('rigObject: ', rigObject);
    });

    return (
        <Container sx={{
            margin: 1,
            padding: 1
        }}>
            {
                (mode === 'main') ?
                    <>
                        <Button
                            sx={{
                                border: '1px solid orange',
                                color: 'orange'
                            }}
                            onClick={() => {
                                setRigObject(initialObject);
                                setMode('create');
                            }}>new rig</Button>

                        {
                            (savedRigs.length > 0) ?
                                <>
                                    <Typography padding={1} sx={{ color: "white" }}>
                                        saved Rigs:
                                    </Typography>
                                    {
                                        savedRigs.map((rig: RigObject, i: number) => {
                                            return (
                                                <Typography padding={1} key={`rig:${i}`}>
                                                    <Button
                                                        sx={{
                                                            background: 'darkGreen',
                                                            color: 'rgb(165,165,165)'
                                                        }}
                                                        onClick={() => {
                                                            console.log('clicked: ', rig);
                                                            const matchingRig = savedRigs.find((savedRig: RigObject) => savedRig.id === rig.id);

                                                            setRigObject({ ...matchingRig });
                                                            setMode('edit');
                                                        }}
                                                    >
                                                        Edit / Show: {rig.name}
                                                    </Button>
                                                    <Button
                                                        sx={{
                                                            background: 'darkRed',
                                                            color: 'rgb(165,165,165)',
                                                            marginLeft: 2
                                                        }}
                                                        onClick={() => {
                                                            //console.log('clicked: ', rig);
                                                            deleteRig(rig.id);
                                                        }}
                                                    >
                                                        Delete
                                                    </Button>
                                                </Typography>

                                            )
                                        })
                                    }
                                </> : <></>
                        }
                    </> :
                    <></>
            }
            {
                (mode === 'create' || mode === 'edit') ?
                    <>
                        <Create />
                    </> :
                    <></>
            }
            {
                (mode === 'testRigs') ?
                    <>
                        <TestRigs />
                    </> :
                    <></>
            }
            {
                (mode === 'rules') ?
                    <>
                        <RuleIndex />
                    </> :
                    <></>
            }
            {
                (mode === 'lore') ?
                    <>
                        <Lore />
                    </> :
                    <></>
            }
            {
                (mode === 'bookEditor') ?
                    <>
                        <BookEditor />
                    </> :
                    <></>
            }
            {
                (mode === 'famousRigs') ?
                    <>
                        <FamousRigs />
                    </> :
                    <></>
            }

        </Container>
    );
}

export default Main;