import { Box, Button } from '@mui/material';
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
        desc: `2 time and reigning Charred Axle discord champion of Helsinki. It has the record of most successful title defences. Tarantula is known for its hard armour, that it uses to lure the opponent to grinding battle of attrition.
              It took the title with punishing bursts of vanguard and astro cutter of drone Welder. After some successful defences, it lost the title to Sideshow, but in a rematch Tarantula with slightly changed rigg and familiar took the title, what he think its his, back to his spider cave.`
    },
    {
        name: 'Star Flame',
        image: 'starflame',
        desc: `Someone might say, that there are more intimidating sights, than former champion Star Flame... that someone is incorrect. Star Flame is usually equipped with heavy variant breach sling, that is used by a very trigger happy gunner. This is one of the most hard hitting rigs ever seen at the arena.`
    },
    {
        name: 'Starblade',
        image: 'starblade',
        desc: `A rugged truck, that is a former charred axle discord champion, the Starblade is also reigning champion of Ropecon tournament, the Axle Clash. Magnetised weapon racks make possible, that it is impossible to guess what this famous rig brings to fight. It's japanese text read: "truth", "katana" and "champion"... it has earned right to bear all those texts.`
    },
    {
        name: 'Arty and Morty',
        image: 'arty',
        desc: `Arty has the most hard hitting gun ever seen in arenas. The rearguard with every boost available. If you don't know any special tricks to counter Morty's protective care, the Arty will pulverize your rig in very short time. And as all Team Warheads rigs, this is a very beautiful rig!`
    },
    {
        name: 'Sideshow',
        image: 'sideshow',
        desc: `The fast Sideshow, former charred axle discord champion devastates its opponents with very accurate whiplash missiles and bursts of primed flak blasters. Fast speed, long range and accuracy of weapons make Sideshow one of the best rigs ever, that have entered the Arena. It is only rig that has beaten the current Helsinki discord champion Tarantula.`
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
                    onClick={() => { setMode('main'); }}
                >
                    Back to main page
                </Button>

                <h3>Click rigs name to read about it.</h3>

                {
                    listOfFamousRigs.map((rig: FamousRig, i: number) => {
                        return (
                            <Box
                                key={`${rig.name}${i}`}
                                component='div'
                                onClick={() => {
                                    setReadAbout(rig.name);
                                }}
                                sx={{
                                    border: '1px solid white',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255,255,255,0.1)'
                                    },
                                    p: 1, // padding for nicer spacing, optional
                                }}
                            >
                                {rig.name}
                            </Box>
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