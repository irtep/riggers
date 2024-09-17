export interface Chassis {
    name: string;
    specials: string;
    desc: string;
};
export const chassises: Chassis[] = [
    {
        name: 'All terrain roller',
        specials: 'can turn with 0 speed',
        desc: 'Swift reconnaissance vehicle used to traverse difficult terrain.'
    },
    {
        name: 'Hot rod',
        specials: 're-roll failed handling tests',
        desc: 'A salvaged and revitalised planetary rover vehicle that was transported with the human Outreach expedition mission.'
    },
    {
        name: 'Desert spear',
        specials: '+10 speed, if no gunner',
        desc: 'A two wheeled, lightweight and stream lined vehicle designed to maintain high speed across the vast sand planes of Ainash. Deployable stabiliser wings help keep it grounded amid strong winds.'
    },
    {
        name: 'Bakkor miner',
        specials: 're-roll failed handling tests',
        desc: 'Once known as Leader Drills, they were at the forefront of extending mine shafts and tunnels on Bakkoroth.'
    },
    {
        name: 'Human truck',
        specials: 're-roll failed handling tests',
        desc: 'One of a handful of surviving military personnel vehicles shipped to the Tarapor star system with the Human Outreach expedition mission. This vehicle would be replicated by the Ainashians to aid in the fight against the Sprites.'
    },
    {
        name: 'Boor',
        specials: 're-roll failed handling tests',
        desc: 'The Boor rig was a vehicle provided to mine workers so that they could commute to the mines. The journey was often long and the terrain rough. So the 4x4 off road capabilities, and their dual-primed propultion systems provided outstanding performance on the rough terrain of the  frozen wilders of the southern continent.'
    },
    {
        name: 'Swamp stomper',
        specials: '1 Computer Assisted Steering for free',
        desc: 'They are used to scout waterlogged areas and Silt mines on Ainash, where wheeled Rigs cant access.'
    }
];

export const familiarChassises: string[] = [
    'Mono roller',
    'Comet fire'
];