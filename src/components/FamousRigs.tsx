import { Box, Button, Container } from '@mui/material';
import React, { useContext, useState } from 'react';
import DescOfRig from './DescOfRig';
import { RigContext } from '../context/RigContext';

export interface FamousRig {
    name: string;
    image: string;
    desc: string;
};

const listOfFamousRigs: FamousRig[] = [
    {
        name: 'Tarantula',
        image: 'tarantula',
        desc: `Current Charred Axle champion Tarantula is known for its hard armour, what it uses to lure the opponent to grinding battle of attrition.
              It has magnetised weapon racks, to make harder to challengers to quess what kind of weapon they'll face, but it took the title with punishing bursts of vanguard and astro cutter of drone Welder.`
    },
    {
        name: 'Star Flame',
        image: 'starflame',
        desc: `Someone might say, that there are more intimidating sights, than former champion Star Flame... that someone is incorrect. Star Flame is usually equipped with heavy variant breach sling, that is used by very trigger happy gunner. 
        It once dealt 10 points of damage to armour 9 drone. This is one of the most hard hitting rigs ever seen at the arena.`
    },
    {
        name: 'Starblade',
        image: 'starblade',
        desc: `A rugged truck, that is a former champion, the Starblade is also reigning champion of Ropecon tournament. Magnetised weapon racks make possible, that it is impossible to guess what this famous rig brings to fight. It's japanese text read: "truth", "katana" and "champion"... it has earned all those.`
    },
    {
        name: 'Arty and Morty',
        image: 'arty',
        desc: `Arty has the most hard hitting gun ever seen the rearguard with every boost available. If you don't know any special tricks to counter Morty's protective care, the Arty will pulverize your rig in very short time. And as all Team Warheads rigs, this is a very beautiful rig!`
    }
];

const FamousRigs: React.FC = (): React.ReactElement => {
    const [readAbout, setReadAbout] = useState<string>('');
    const { setMode } = useContext(RigContext);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            p: 3,
            background: 'black',
            color: 'red'
        }}>
            {/* Left Column: Form */}
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                <Button
                    onClick={ () => {setMode('main');}}
                >
                    Back to main page
                </Button>
                
                <h3>Click rigs name to read about it.</h3>

                {
                    listOfFamousRigs.map( (rig: FamousRig, i: number) => {
                        return(
                            <Container 
                                key={`${rig.name}${i}`}
                                onClick={ () => {
                                    console.log('clikde');
                                    setReadAbout(rig.name);
                                }}
                                
                                >
                                {rig.name}
                            </Container>
                        )
                    })
                }

            </Box>

            {/* Right Column: Selected rigs */}
            <Box
                sx={{
                    flex: 1,
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gridTemplateRows: '1fr',
                    gap: 2,
                }}
            >
                <Box sx={{ border: '1px solid #ccc', p: 2 }}>
                    <DescOfRig
                        readAbout={readAbout}
                        listOfFamousRigs={listOfFamousRigs}
                    />
                </Box>
            </Box>
        </Box>
    );
}

export default FamousRigs;