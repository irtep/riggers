export interface SpecialEffect {
    prop: string;
    value: number;
};

export interface Modification {
    name: string;
    effect: string;
    costMod: number;
    costSpeed: number;
    specialEffect?: SpecialEffect[];
    onePerWeapon?: boolean;
    onePerRig?: boolean;
    whatIsThis: 'modification';
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
        whatIsThis: 'modification'
    },
    {
        name: 'Armour Plating',
        effect: `+3 Armour. A Rig can never have more than a total of 12 Armour.`,
        costMod: 1,
        costSpeed: 2,
        whatIsThis: 'modification'
    },

    {
        name: 'Carbon-alloy Lattice',
        effect: `The Impact Power results of all Shell type Weapon Attacks that target you are reduced by -3.
        Only one instance of these Modifications may be taken per Rig.`,
        costMod: 0,
        costSpeed: 2,
        whatIsThis: 'modification'
    },
    {
        name: 'Computer Assisted Steering',
        effect: `Increase your Rigʼs Handling by +1. In addition, once per each of your own Actions, you may
        reroll a failed Handling Test.`,
        costMod: 1,
        costSpeed: 0,
        specialEffect: [
            {
                prop: 'handling',
                value: 1
            }
        ],
        whatIsThis: 'modification'
    },
    {
        name: 'Decoy Flare Launcher',
        effect: `Activate when you are declared as the target of an Attack. Your Rig is considered Obscured for
        the duration of the current Action. (1 use only) . Max one per rig`,
        costMod: 0,
        costSpeed: 0,
        onePerRig: true,
        whatIsThis: 'modification'
    },
    {
        name: 'Decoy Flares',
        effect: `Increase the number of uses of your Decoy Flare Launcher by 1.`,
        costMod: 0,
        costSpeed: 1,
        whatIsThis: 'modification'
    },
    {
        name: 'Exo-plate Panelling',
        effect: `The Impact Power results of all Missile type Weapon Attacks that target you are reduced by -3.
        MAX one per rig`,
        costMod: 0,
        costSpeed: 2,
        onePerRig: true,
        whatIsThis: 'modification'
    },
    {
        name: 'Extended Chassis',
        effect: `Each time you make any Evasion Attempts, you must reroll 1 of the Successful results a single
        time. Apply this effect after all rerolls from other effects have been resolved.
        MAX one per rig`,
        costMod: -1,
        costSpeed: 0,
        onePerRig: true,
        whatIsThis: 'modification'
    },
    {
        name: 'Gunner',
        effect: `A Gunner gives access to Gunner Specialities. In addition, you can use 1 additional Weapon
        equipped to your Rig during your Actions.
        MAX one per rig`,
        costMod: 1,
        costSpeed: 0,
        onePerRig: true,
        whatIsThis: 'modification'
    },
    {
        name: 'Polarised Matter Webbing',
        effect: `The Impact Power results of all Energy type Weapon Attacks that target you are reduced by -3.
        MAX one per rig`,
        costMod: 0,
        costSpeed: 2,
        whatIsThis: 'modification'
    },
    {
        name: 'Reinforced Armour',
        effect: `Reduces the Impact Power of all incoming Attacks by -1 for each instance of this Modification
        equipped to a Rig.
        Write the amount of Reinforced Armour your Rig has in brackets beside your Rigʼs Armour value. For
        example — Armour: 12 (1).`,
        costMod: 0,
        costSpeed: 2,
        whatIsThis: 'modification'
    },
    {
        name: 'Resistance Field',
        effect: `Generates a protective barrier that shields the Rig. When a successful Impact Power roll is made,
        the attacker must reroll 1 of their highest Impact Power dice for every Layer the targetʼs Resistance
        Field has. Default Layers: 1.
        In addition, any extra Damage that would be caused by a Weaponʼs Specialities or Modifications
        is negated if the Resistance Field has 2 or more Layers.
        MAX one per rigg`,
        costMod: 1,
        costSpeed: 0,
        onePerRig: true,
        whatIsThis: 'modification'
    },
    {
        name: 'Resistance Field Capacitor',
        effect: `Provides 1 extra Layer to a Resistance Field.`,
        costMod: 1,
        costSpeed: 0,
        whatIsThis: 'modification'
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
        whatIsThis: 'modification'
    },
    {
        name: 'Turbo Charger',
        effect: `A Rig with this Modification rounds its final Speed value up to the nearest 5 instead of down.
        and -2 handling.`,
        costMod: 0,
        costSpeed: 0,
        specialEffect: [
            {
                prop: 'handling',
                value: -2
            }
        ],
        whatIsThis: 'modification'
    },
    {
        name: 'Target Acquisition System',
        effect: `A Rig equipped with this Modification can make Aimed Shots by reducing its Momentum by
        only 1, rather than the normal 2. MAX one per rig`,
        costMod: 1,
        costSpeed: 0,
        onePerRig: true,
        whatIsThis: 'modification'
    },
    {
        name: 'Hardened Chassis Floor',
        effect: `Reduce the total amount of Damage you receive from a Mine by -1 to a minimum of 0.`,
        costMod: 0,
        costSpeed: 2,
        whatIsThis: 'modification'
    },
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
        whatIsThis: 'modification'
    },

    {
        name: 'Breacher Module',
        effect: `The Weapon gains a permanent Breacher (4+) Eﬀect.
        This Modification is assigned to a Weapon on your Rig Blueprint and cannot be changed.
        Only one instance of these Modifications can be taken per Weapon.`,
        costMod: 1,
        costSpeed: 0,
        onePerWeapon: true,
        whatIsThis: 'modification'
    },
    {
        name: 'Destructor Module',
        effect: `Add +1 to this Weaponʼs Impact Power total.
        This Modification is assigned to a Weapon on your Rig Blueprint and cannot be changed.
        MAX one per weapon`,
        costMod: 0,
        costSpeed: 1,
        onePerWeapon: true,
        whatIsThis: 'modification'
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
        whatIsThis: 'modification'
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
        whatIsThis: 'modification'
    },
    {
        name: 'Omni-directional Mount',
        effect: `Add +1 to this Weaponʼs Impact Power total.
        This Modification is assigned to a Weapon on your Rig Blueprint and cannot be changed.
        MAX one per weapon`,
        costMod: 0,
        costSpeed: 1,
        onePerWeapon: true,
        whatIsThis: 'modification'
    }
];