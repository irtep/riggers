export interface Chassis {
    name: string;
    specials: string;
    desc: string;
    type: 'car' | 'tank' | 'bike' | 'walker';
};
export const chassises: Chassis[] = [
    {
        name: 'All terrain roller',
        specials: 'can turn with 0 speed, -5 speed',
        desc: 'Swift reconnaissance vehicle used to traverse difficult terrain.',
        type: 'tank'

    },
    {
        name: 'Hot rod',
        specials: '+1 dice for handling tests',
        desc: 'A salvaged and revitalised planetary rover vehicle that was transported with the human Outreach expedition mission.',
        type: 'car'
    },
    {
        name: 'Desert spear',
        specials: '+10 speed, -1 mod slots',
        desc: 'A two wheeled, lightweight and stream lined vehicle designed to maintain high speed across the vast sand planes of Ainash. Deployable stabiliser wings help keep it grounded amid strong winds.',
        type: 'bike'
    },
    {
        name: 'Bakkor miner',
        specials: '+1 dice for handling tests',
        desc: 'Once known as Leader Drills, they were at the forefront of extending mine shafts and tunnels on Bakkoroth.',
        type: 'car'
    },
    {
        name: 'Human truck',
        specials: '+1 dice for handling tests',
        desc: 'One of a handful of surviving military personnel vehicles shipped to the Tarapor star system with the Human Outreach expedition mission. This vehicle would be replicated by the Ainashians to aid in the fight against the Sprites.',
        type: 'car'
    },
    {
        name: 'Boor',
        specials: '+1 dice for handling tests',
        desc: 'The Bakkor Boor rig was a vehicle provided to mine workers so that they could commute to the mines. The journey was often long and the terrain rough. So the 4x4 off road capabilities, and their dual-primed propultion systems provided outstanding performance on the rough terrain of the  frozen wilders of the southern continent.',
        type: 'car'
    },
    {
        name: 'Swamp stomper',
        specials: 'Evade dices get +1, -10 speed',
        desc: 'They are used to scout waterlogged areas and Silt mines on Ainash, where wheeled Rigs cant access.',
        type: 'walker'
    }
];

export const familiarChassises: string[] = [
    'Mono roller',
    'Comet fire'
];