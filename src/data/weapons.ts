export interface Weapon {
    name: string;
    impactPower: number | string;
    type: 'Shell' | 'Energy' | 'Missile' | 'Combat' | '';
    range: number | string;
    costMod: number;
    costSpeed: number;
    specialties: string;
    primed: string;
    whatIsThis: 'weapon';
};

export const weapons: Weapon[] = [
    {
        name: 'Accelator',
        impactPower: 4,
        type: 'Shell',
        range: 40,
        costMod: 1,
        costSpeed: 0,
        specialties: 'Kinetic Overdrivers — Ignores 1 Layer of the targetʼs Resistance Field.', 
        primed: 'BREACHER (4+)',
        whatIsThis: 'weapon'
    },
    {
        name: 'Astro-driver',
        impactPower: 6,
        type: 'Energy',
        range: 20,
        costMod: 2,
        costSpeed: 0,
        specialties: '', 
        primed: `ROCKBURST: This Speciality allows the Weapon to draw a line-of-sight to a target through 1 Obstacle as if the Obstacle was not in the arena. If this Speciality is activated, but it does not draw a line of sight through any Obstacle, the Attack is considered to have a Breacher 3+ effect.`,
        whatIsThis: 'weapon'
    },
    {
        name: 'Blaster',
        impactPower: 3,
        type: 'Shell',
        range: 20,
        costMod: 0,
        costSpeed: 0,
        specialties: 'Light — This Weapon only deals Damage as a result of its Impact Power rolls.', 
        primed: 'PRIMER-LINK',
        whatIsThis: 'weapon'
    },
    {
        name: 'Breach Sling',
        impactPower: 4,
        type: 'Shell',
        range: 15,
        costMod: 1,
        costSpeed: 0,
        specialties: '', 
        primed: 'BREACHER (3+)',
        whatIsThis: 'weapon'
    },
    {
        name: 'Burstfire Blaster',
        impactPower: 3,
        type: 'Shell',
        range: 20,
        costMod: 0,
        costSpeed: 2,
        specialties: 'Light weapon', 
        primed: 'SUSTAINED TRIGGER, PRIMER-LINK',
        whatIsThis: 'weapon'
    },
    {
        name: 'Charged Accelerator',
        impactPower: 4,
        type: 'Shell',
        range: 20,
        costMod: 1,
        costSpeed: 0,
        specialties: 'Kinetic Overdrivers — Ignores 1 Layer of the targetʼs Resistance Field.', 
        primed: 'BREACHER (3+)',
        whatIsThis: 'weapon'
    },
    {
        name: 'Convergence Beam Cannon',
        impactPower: `6 (4)`,
        type: 'Energy',
        range: `30 (5)`,
        costMod: 2,
        costSpeed: 0,
        specialties: `Choose one of the following Firing Modes when using this Weapon: 1. Converge or 2. Fractal Bloom: (Profile written in parentheses). Light — This Weapon only
        deals Damage as a result of its Impact Power rolls. Targets all other Rigs &
        Creatures within range and in all directions. Roll for Impact Power against
        each target separately.`, 
        primed: 'Converge: SUPERSONIC MUNITIONS',
        whatIsThis: 'weapon'
    },
    {
        name: 'Flak Blaster',
        impactPower: 3,
        type: 'Shell',
        range: 20,
        costMod: 0,
        costSpeed: 1,
        specialties: `Dispersion Shells — Reduce one of the targetʼs Evasion Attempt results by -1 if it is more
        than [10cm] away.
        Light — This Weapon only deals Damage as a result of its Impact Power rolls.`, 
        primed: 'PRIMER-LINK',
        whatIsThis: 'weapon'
    },
    {
        name: 'Matter Rail',
        impactPower: 6,
        type: 'Shell',
        range: 30,
        costMod: 2,
        costSpeed: 0,
        specialties: ``, 
        primed: 'SUPERSONIC MUNITIONS',
        whatIsThis: 'weapon'
    },
    {
        name: 'Microbeam',
        impactPower: 3,
        type: 'Energy',
        range: 20,
        costMod: 0,
        costSpeed: 0,
        specialties: `Light — This Weapon only deals Damage as a result of its Impact Power rolls.`, 
        primed: 'PRIMER-LINK',
        whatIsThis: 'weapon'
    },
    {
        name: 'Micro Rocket Pod',
        impactPower: 3,
        type: 'Missile',
        range: 20,
        costMod: 0,
        costSpeed: 0,
        specialties: `Light — This Weapon only deals Damage as a result of its Impact Power rolls.`, 
        primed: 'PRIMER-LINK',
        whatIsThis: 'weapon'
    },
    {
        name: 'Particle Beam',
        impactPower: 4,
        type: 'Energy',
        range: 30,
        costMod: 1,
        costSpeed: 2,
        specialties: ``, 
        primed: 'SUSTAINED TRIGGER',
        whatIsThis: 'weapon'
    },
    {
        name: 'Poly-Ballistica Salvo',
        impactPower: 6,
        type: 'Missile',
        range: 20,
        costMod: 2,
        costSpeed: 2,
        specialties: ``, 
        primed: 'SUSTAINED TRIGGER',
        whatIsThis: 'weapon'
    },
    {
        name: 'Rattler',
        impactPower: 4,
        type: 'Shell',
        range: 20,
        costMod: 1,
        costSpeed: 3,
        specialties: `Suppressive Volley — If this Weapon hits a target, the attacking Rig is considered
        Obscured from all Attacks made by that target until the end of the targetʼs next Action.`, 
        primed: 'SUSTAINED TRIGGER',
        whatIsThis: 'weapon'
    },
    {
        name: 'Rearguard',
        impactPower: 6,
        type: 'Shell',
        range: '10-50',
        costMod: 2,
        costSpeed: 0,
        specialties: `Mobile Artillery: This Weapon cannot attack targets that are less than [10cm] away.`, 
        primed: 'SUPERSONIC MUNITIONS',
        whatIsThis: 'weapon'
    },
    {
        name: 'Reduction Lance',
        impactPower: 4,
        type: 'Energy',
        range: 15,
        costMod: 1,
        costSpeed: 0,
        specialties: ``, 
        primed: 'PARTICLE FOCUS',
        whatIsThis: 'weapon'
    },
    {
        name: 'Shatterblast',
        impactPower: 4,
        type: 'Missile',
        range: 20,
        costMod: 1,
        costSpeed: 1,
        specialties: `Detonate [5cm]`, 
        primed: 'FULL PAYLOAD',
        whatIsThis: 'weapon'
    },
    {
        name: 'Shreik Missile',
        impactPower: 6,
        type: 'Missile',
        range: 40,
        costMod: 2,
        costSpeed: 0,
        specialties: ``,
        primed: 'SEEKER',
        whatIsThis: 'weapon'
    },
    {
        name: 'Swarm Missile Pod',
        impactPower: 3,
        type: 'Missile',
        range: 10,
        costMod: 0,
        costSpeed: 2,
        specialties: `Light — This Weapon only deals Damage as a result of its Impact Power rolls.
        Dual Silos — This Weapon can Attack 2 targets, or 1 target twice and only count as
        attacking once.`, 
        primed: '',
        whatIsThis: 'weapon'
    },
    {
        name: 'Vanguard',
        impactPower: 4,
        type: 'Shell',
        range: 10,
        costMod: 1,
        costSpeed: 0,
        specialties: `Point Blank — Add +2 to this Weaponʼs Impact Power result if the target is no more than
        [5cm] away.`, 
        primed: '',
        whatIsThis: 'weapon'
    },
    {
        name: 'Vengeance Cannon',
        impactPower: 6,
        type: 'Shell',
        range: 30,
        costMod: 2,
        costSpeed: 0,
        specialties: `Detonate [5cm]`, 
        primed: 'DETONATION RADIUS [+5CM]',
        whatIsThis: 'weapon'
    }
];