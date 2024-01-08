import { Button, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Create from './Create';

const Main: React.FC = (): React.ReactElement => {
    const [mode, setMode] = useState<'main' | 'create'>('main');
    const [name, setName] = useState<string>('');
    const [chassis, setChassis] = useState<string>('');
    const [speed, setSpeed] = useState<number>(30);
    const [armour, setArmour] = useState<number>(0);
    const [handling, setHandling] = useState<number>(6);
    const [resistanceFields, setResistanceFields] = useState<number>(0);
    const [emptySlots, setEmptySlots] = useState<number>(6);
    const [specials, setSpecials] = useState<string>('');
    
    useEffect( () => {
        
        // handling is 1 per 5 speed
        setHandling(Math.floor(speed / 5));

    }, [speed]);

    return (
        <Container sx={{
            margin: 5,
            padding: 5
        }}>
            {
                (mode === 'main') ?
                    <>
                        <Button onClick={() => { setMode('create'); }}>new rig</Button>

                        <Button>load rig</Button>
                    </> :
                    <></>
            }
            {
                (mode === 'create') ?
                    <>
                        <Create
                          name={name}
                          chassis={chassis}
                          setChassis={setChassis}
                          setName={setName}
                          speed={speed}
                          setSpeed={setSpeed}
                          armour={armour}
                          setArmour={setArmour}
                          handling={handling}
                          resistanceFields={resistanceFields}
                          setResistanceFields={setResistanceFields}
                          emptySlots={emptySlots}
                          setEmptySlots={setEmptySlots}
                        />
                    </> :
                    <></>
            }

        </Container>
    );
}

export default Main;