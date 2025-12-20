export interface SpecialEffect {
    prop: string;
    value: number;
};

export interface Modification {
    name: string;
    effect: string;
    costMod: number;
    costSpeed: number;
    //costHandling: number; // dealt in updateRig in Rig Context... for now
    specialEffect?: SpecialEffect[];
    onePerWeapon?: boolean;
    onePerRig?: boolean;
    whatIsThis: 'modification';
    uniqueToChassis?: string;
};

// mods that are unique to several rigs:
const wheelScythes: Modification = {
    name: 'Wheel scythes', // -1 handling handled updateRig in RigContext
    effect: `Winning a Shunt will deal 1 Damage
to the target Rig/Creature. Costs 1 handling.`,
    costMod: 0,
    costSpeed: 0,
    onePerRig: true,
    whatIsThis: 'modification',
    uniqueToChassis: '' // this will be added below
};

const supercharger: Modification = {
    name: 'Supercharger',
    effect: `Supercharger Increase your Rig’s Speed by 5. 1 Mod`,
    costMod: 1,
    costSpeed: 0,
    specialEffect: [
        {
            prop: 'speed',
            value: 5
        }
    ],
    onePerRig: true,
        whatIsThis: 'modification',
        uniqueToChassis: '' // this will be added below
};

// Mine Launcher cost 1 mod One per Rig. Cannot be modified .
//Required to lay mines in the Arena. Comes with 1 type of Mine included. Further Mines
//can be taken at the cost listed below.

export const rigModifications: Modification[] = [
    {
        name: 'Mine Launcher',
        effect: `Cannot be modified .
        Required to lay mines in the Arena. Comes with 1 type of Mine included. Further Mines
        can be taken at the cost listed below.`,
        costMod: 1,
        costSpeed: 0,
        onePerRig: true,
        whatIsThis: 'modification',
        uniqueToChassis: 'all'
    },
    {
        name: 'Armour Plating',
        effect: `+3 Armour. A Rig can never have more than a total of 12 Armour.`,
        costMod: 1,
        costSpeed: 2,
        specialEffect: [
            {
                prop: 'armour',
                value: 3
            }
        ],
        whatIsThis: 'modification',
        uniqueToChassis: 'all'
    },
    {
        name: 'Carbon-alloy Lattice',
        effect: `The Impact Power results of all Shell type Weapon Attacks that target you are reduced by -3.
        Only one instance of these Modifications may be taken per Rig.`,
        costMod: 0,
        costSpeed: 2,
        whatIsThis: 'modification',
        uniqueToChassis: 'all'
    },
    {
        name: 'Computer Assisted Steering', // + handling handled in updateRig in RigContext
        effect: `Increase your Rigʼs Handling by +1. In addition, once per each of your own Actions, you may
        reroll a failed Handling Test.`,
        costMod: 1,
        costSpeed: 0,
        whatIsThis: 'modification',
        uniqueToChassis: 'all'
    },
    {
        name: 'Decoy Flare Launcher',
        effect: `Activate when you are declared as the target of an Attack. Your Rig is considered Obscured for
        the duration of the current Action. (1 use only) . Max one per rig`,
        costMod: 0,
        costSpeed: 0,
        onePerRig: true,
        whatIsThis: 'modification',
        uniqueToChassis: 'all'
    },
    {
        name: 'Decoy Flares',
        effect: `Increase the number of uses of your Decoy Flare Launcher by 1.`,
        costMod: 0,
        costSpeed: 1,
        whatIsThis: 'modification',
        uniqueToChassis: 'all'
    },
    {
        name: 'Exo-plate Panelling',
        effect: `The Impact Power results of all Missile type Weapon Attacks that target you are reduced by -3.
        MAX one per rig`,
        costMod: 0,
        costSpeed: 2,
        onePerRig: true,
        whatIsThis: 'modification',
        uniqueToChassis: 'all'
    },
    {
        name: 'Extended Chassis',
        effect: `Each time you make any Evasion Attempts, you must reroll 1 of the Successful results a single
        time. Apply this effect after all rerolls from other effects have been resolved.
        MAX one per rig`,
        costMod: -1,
        costSpeed: 0,
        onePerRig: true,
        whatIsThis: 'modification',
        uniqueToChassis: 'all'
    },
    {
        name: 'Gunner',
        effect: `A Gunner gives access to Gunner Specialities. In addition, you can use 1 additional Weapon
        equipped to your Rig during your Actions.
        MAX one per rig`,
        costMod: 1,
        costSpeed: 0,
        onePerRig: true,
        whatIsThis: 'modification',
        uniqueToChassis: 'all'
    },
    {
        name: 'Polarised Matter Webbing',
        effect: `The Impact Power results of all Energy type Weapon Attacks that target you are reduced by -3.
        MAX one per rig`,
        costMod: 0,
        costSpeed: 2,
        whatIsThis: 'modification',
        uniqueToChassis: 'all'
    },
    {
        name: 'Reinforced Armour',
        effect: `Reduces the Impact Power of all incoming Attacks by -1 for each instance of this Modification
        equipped to a Rig.
        Write the amount of Reinforced Armour your Rig has in brackets beside your Rigʼs Armour value. For
        example — Armour: 12 (1).`,
        costMod: 0,
        costSpeed: 2,
        whatIsThis: 'modification',
        uniqueToChassis: 'all'
    },
    {
        name: 'Resistance Field',
        effect: `A Rig may be equipped with a Resistance Field Modification that provides it with a forcefield. A Resistance Field has 1 Layer by default. For each layer a Resistance Field has, reduce the Impact Power value (not result) of incoming Attacks by 1.`,
        costMod: 1,
        costSpeed: 0,
        specialEffect: [
            {
                prop: 'resistanceFields',
                value: 1
            }
        ],
        onePerRig: true,
        whatIsThis: 'modification',
        uniqueToChassis: 'all'
    },
    {
        name: 'Resistance Field Capacitor',
        effect: `Provides 1 extra Layer to a Resistance Field.`,
        costMod: 1,
        costSpeed: 0,
        specialEffect: [
            {
                prop: 'resistanceFields',
                value: 1
            }
        ],
        whatIsThis: 'modification',
        uniqueToChassis: 'all'
    },
    {
        name: 'Slam Ram',
        effect: `A Slam Ram is a Modification that can be equipped to the
        front of a Rig. Using a Slam Ram does not count as using a
        Weapon during a Rigʼs Action.
        If a Rig fitted with a Slam Ram Collides with a target
        whilst at least part of the front half of its base is in contact
        with the targetʼs base, it can make an Impact Power roll. A
        Slam Ramʼs Impact Power is 1 dice, plus 1 additional dice
        for each whole [5cm] increment the ownerʼs Rig moved
        before the Collision; this distance is only measured from
        the start of a continuous straight line to the point of
        impact. If the Impact Power result exceeds the target's
        Armour, the target receives 1 Damage. MAX one per rig`,
        costMod: 1,
        costSpeed: 0,
        onePerRig: true,
        whatIsThis: 'modification',
        uniqueToChassis: 'all'
    },
    {
        name: 'Turbo Charger',
        effect: `A Rig with this Modification rounds its final Speed value up to the nearest 5 instead of down.
        and -2 handling.`,
        costMod: 0,
        costSpeed: 0,
        whatIsThis: 'modification',
        uniqueToChassis: 'all'
    },
    {
        name: 'Target Acquisition System',
        effect: `A Rig equipped with this Modification can make Aimed Shots by reducing its Momentum by
        only 1, rather than the normal 2. MAX one per rig`,
        costMod: 1,
        costSpeed: 0,
        onePerRig: true,
        whatIsThis: 'modification',
        uniqueToChassis: 'all'
    },
    {
        name: 'Hardened Chassis Floor',
        effect: `Reduce the total amount of Damage you receive from a Mine by -1 to a minimum of 0.`,
        costMod: 0,
        costSpeed: 2,
        whatIsThis: 'modification',
        uniqueToChassis: 'all'
    },
    {
        name: 'Catapult Thrusters', // both -1 handling and +2 speed handled in updateRig in RigContext
        effect: `Stomper rigs only. Jump - This Modification allows a Stomper Rig to Jump forwards
5cm for each 1 Momentum it has, moving over Rigs and Creatures
as if they were not in the Arena. Upon landing it loses 1 Momentum
and must make a Handling test; if it fails, it must lose 1 additional
Momentum. The Rig cannot end a Jump on top of another
Rig/Creature. The distance moved during the Jump does not increase
the Rig's Momentum. Cost 1 handling, but gives +2 speed`,
        costMod: 0,
        costSpeed: 0,
        onePerWeapon: true,
        whatIsThis: 'modification',
        uniqueToChassis: 'Swamp stomper' // 
    },
    { ...wheelScythes, uniqueToChassis: 'Hot rod' },
    { ...wheelScythes, uniqueToChassis: 'Bakkor miner' },
    { ...wheelScythes, uniqueToChassis: 'Human truck' },
    { ...wheelScythes, uniqueToChassis: 'Boor' },

    { ...supercharger, uniqueToChassis: 'Hot rod' },
    { ...supercharger, uniqueToChassis: 'Bakkor miner' },
    { ...supercharger, uniqueToChassis: 'Human truck' },
    { ...supercharger, uniqueToChassis: 'Boor' }
];

export const weaponModifications: Modification[] = [
    {
        name: 'Annihilator Module',
        effect: `Add +4 to this Weaponʼs Impact Power total.
        This Modification is assigned to a Weapon on your Rig Blueprint and cannot be changed.
        Only one instance of these Modifications can be taken per Weapon.`,
        costMod: 0,
        costSpeed: 3,
        onePerWeapon: true,
        whatIsThis: 'modification',
        uniqueToChassis: 'all'
    },

    {
        name: 'Breacher Module',
        effect: `The Weapon gains a permanent Breacher (4+) Eﬀect.
        This Modification is assigned to a Weapon on your Rig Blueprint and cannot be changed.
        Only one instance of these Modifications can be taken per Weapon.`,
        costMod: 1,
        costSpeed: 0,
        onePerWeapon: true,
        whatIsThis: 'modification',
        uniqueToChassis: 'all'
    },
    {
        name: 'Destructor Module',
        effect: `Add +1 to this Weaponʼs Impact Power total.
        This Modification is assigned to a Weapon on your Rig Blueprint and cannot be changed.
        MAX one per weapon`,
        costMod: 0,
        costSpeed: 1,
        onePerWeapon: true,
        whatIsThis: 'modification',
        uniqueToChassis: 'all'
    },
    {
        name: 'Prototype Variant',
        effect: `Cannot be assigned to a Weapon with a ʻHeavy Variantʼ Modification.
        This Modification removes the SPECIALITIES of the Weapon it is assigned to.
        If this Weapon hits a target, roll 1 dice before rolling for Impact Power and consult the table
        below.
        [1-2] — No additional eﬀect. Roll for Impact Power as normal.
        [3-4] — The Weapon is considered to have rolled its maximum possible Impact Power total. Do
        not roll for Impact Power.
        This Modification is assigned to a Weapon on your Rig Blueprint and cannot be changed.
        MAX one per weapon.`,
        costMod: 0,
        costSpeed: 2,
        onePerWeapon: true,
        whatIsThis: 'modification',
        uniqueToChassis: 'all'
    },
    {
        name: 'Heavy Variant',
        effect: `Can only be applied to Weapons that do not have the ʻLightʼ Eﬀect.
        This Weapon deals 1 additional point of Damage to the target.
        This Modification is assigned to a Weapon on your Rig Blueprint and cannot be changed.
        MAX one per weapon`,
        costMod: 1,
        costSpeed: 0,
        onePerWeapon: true,
        whatIsThis: 'modification',
        uniqueToChassis: 'all'
    },
    {
        name: 'Omni-directional Mount',
        effect: `This weapon can attack any direction`,
        costMod: 0,
        costSpeed: 1,
        onePerWeapon: true,
        whatIsThis: 'modification',
        uniqueToChassis: 'all'
    }
];