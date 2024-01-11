
import { Weapon } from "./weapons";
import { Modification } from "./modifications";

export const familiarWeapons: Weapon[] = [
    {
        name: `Asteroid Cutter`,
        impactPower: 5,
        type: 'Energy',
        range: 10,
        costMod: 1,
        costSpeed: 0,
        specialties: ``,
        primed: `PARTICLE FOCUS`,
        whatIsThis: 'weapon'
    },
    {
        name: `Mawler Appendages`,
        impactPower: 6,
        type: 'Combat',
        range: '',
        costMod: 1,
        costSpeed: 0,
        specialties: ``,
        primed: `BLAST-FORCE PISTONS : When rolling for this Weaponʼs
        Impact Power, you may roll 2 additonal Impact Power dice
        and choose the 6 highest results.`,
        whatIsThis: 'weapon'
    },
    {
        name: `Pin-rod Spitter`,
        impactPower: 4,
        type: 'Shell',
        range: 15,
        costMod: 1,
        costSpeed: 0,
        specialties: ``,
        primed: `BREACHER (3+)`,
        whatIsThis: 'weapon'
    },
    {
        name: `Scorch Tongue`,
        impactPower: 4,
        type: 'Energy',
        range: 15,
        costMod: 1,
        costSpeed: 0,
        specialties: ``,
        primed: `SUSTAINED TRIGGER`,
        whatIsThis: 'weapon'
    },
    {
        name: `Shatter Pod Missiles`,
        impactPower: 4,
        type: 'Missile',
        range: 20,
        costMod: 1,
        costSpeed: 0,
        specialties: `Detonate [5cm]`,
        primed: ``,
        whatIsThis: 'weapon'
    },
    {
        name: `Starfall Missiles`,
        impactPower: 4,
        type: 'Missile',
        range: 20,
        costMod: 1,
        costSpeed: 0,
        specialties: `Can only be equipped to a Familiar with a Comet Fire Combat
        Module.`,
        primed: `FULL PAYLOAD`,
        whatIsThis: 'weapon'
    },
    {
        name: `Thorax Mortar`,
        impactPower: 4,
        type: 'Shell',
        range: 30,
        costMod: 1,
        costSpeed: 0,
        specialties: `Aggressive Conversion — The Familiar may not move during the
        Action in which this Weapon is used.
        Descending Destruction — Attacks with this Weapon ignore the
        Obscured rule.`,
        primed: ``,
        whatIsThis: 'weapon'
    },
    {
        name: `Shocking Barbs`,
        impactPower: '',
        type: '',
        range: 5,
        costMod: 1,
        costSpeed: 0,
        specialties: `Deals 0 Damage. If this attack hits, the targetʼs Resistance Field
        Layers are reduced by 1 until the end of the current Action.`,
        primed: ``,
        whatIsThis: 'weapon'
    },
    {
        name: `Vibro Drivers`,
        impactPower: 4,
        type: 'Combat',
        range: '',
        costMod: 1,
        costSpeed: 0,
        specialties: `Oscillating Drills designed to cut through the toughest of minerals
        and rock. If a Familiar is equipped with 2 Vibro Drivers, change
        this Weaponʼs Breacher Speciality to read ʻBreacher (2+)ʼ
        .`,
        primed: `BREACHER (3+)`,
        whatIsThis: 'weapon'
    }
];

export const familiarModifications: Modification[] = [
    {
        name: `Familiar Armour Plating`,
        effect: `+2 Armour`,
        costMod: 1,
        costSpeed: 0,
        specialEffect: [
            {
                prop: 'armour',
                value: 2
            }
        ],
        onePerWeapon: false,
        onePerRig: false,
        whatIsThis: 'modification'
    },
    {
        name: `MK. 1 Primer Capacitor & Transfer Protocols`,
        effect: `Can hold a maximum of 1 Primer. Allows Primer to be transferred between the Rig
        and Familiar when their bases are touching.`,
        costMod: 0,
        costSpeed: 0,
        onePerWeapon: false,
        onePerRig: true,
        whatIsThis: 'modification'
    },
    {
        name: `MK.2 Primer Capacitor & Transfer Protocols`,
        effect: `Can hold a maximum of 3 Primer. Allows Primer to be transferred between the Rig
        and Familiar when their bases are touching. Replaces MK.1 Capacitor.`,
        costMod: 1,
        costSpeed: 0,
        onePerWeapon: false,
        onePerRig: true,
        whatIsThis: 'modification'
    },
    {
        name: `Agility Combat Module`,
        effect: `The Familiar is built for Speed. +10 to the Familiarʼs Speed and it may reroll 1 failed
        Evasion Attempt when evading an Attack`,
        costMod: 1,
        costSpeed: 0,
        specialEffect: [
            {
                prop: 'speed',
                value: 10
            }
        ],
        onePerWeapon: false,
        onePerRig: true,
        whatIsThis: 'modification'
    },
    {
        name: `Destroyer Combat Module`,
        effect: `+5 to Speed. +2 Armour. +3 to Impact Power roll totals of all Weapons fitted to the
        Familiar.`,
        costMod: 1,
        costSpeed: 0,
        onePerWeapon: false,
        onePerRig: true,
        specialEffect: [
            {
                prop: 'speed',
                value: 5
            },
            {
                prop: 'armour',
                value: 3
            }
        ],
        whatIsThis: 'modification'
    },
    {
        name: `Warden Combat Module`,
        effect: ` + 5 Speed. +5 Armour. When within [5cm] of its Rig, if an Attack
        would hit its controlling Rig, the Familiar may immediately move so that its base is
        touching the closest part of its Rigʼs base, and take the Damage instead. Roll for
        Impact Power against the Familiar.`,
        costMod: 1,
        costSpeed: 0,
        onePerWeapon: false,
        onePerRig: true,
        specialEffect: [
            {
                prop: 'speed',
                value: 5
            },
            {
                prop: 'armour',
                value: 5
            }
        ],
        whatIsThis: 'modification'
    },
    {
        name: `Comet Fire Combat Module`,
        effect: `Familiar with low altitude flight capability. +15 Speed. Armour +3. Flight — This
        Familiar can move over Obstacles, Rigs and Creatures as if they were not in the Arena but it
        can never be Obscured.
        This Familiar cannot be equipped with any additional Armour Modifications and the
        only Weapon it can take is Starfall Missiles. It cannot collect Primer from Primer Pads
        nor can it be Shunted or targeted by any Mines or Combat type Weapons.`,
        costMod: 1,
        costSpeed: 0,
        onePerWeapon: false,
        onePerRig: true,
        specialEffect: [
            {
                prop: 'speed',
                value: 15
            },
            {
                prop: 'armour',
                value: 3
            }
        ],
        whatIsThis: 'modification'
    },
    {
        name: `Shreik Amp`,
        effect: `Once per Round, by discarding 1 Primer Token, the Familiar can let out a deafening
        sound that causes the Crew of one Rig within [5cm] to become ʻConfusedʼ
        . When a
        Confused Rigʼs next Activation Token is drawn, delay that Action until after the
        following Action in the queue has been revealed and resolved. A Confused Target
        cannot be Confused again until after its delayed Action has been resolved.`,
        costMod: 1,
        costSpeed: 0,
        onePerWeapon: false,
        onePerRig: true,
        whatIsThis: 'modification'
    },
    {
        name: `Static Haze Projector`,
        effect: `At the end of your Action, as long the Familiar has at least 1 Primer, you may declare
        that the Familiar is projecting a holographic image of static and electrical disturbance
        around itself. Any Rig or Creature that is targeted by an Attack whilst within [5cm] of
        the Familiar while it is projecting is considered Obscured. This cannot be used in the
        same Action that the Familiar Attacks with its Weapons.`,
        costMod: 1,
        costSpeed: 0,
        onePerWeapon: false,
        onePerRig: true,
        whatIsThis: 'modification'
    },
    {
        name: `Second Eye Module`,
        effect: `The Familiarʼs targeting optics are linked with the Rigʼs and oﬀer a slight increase in
        accuracy. As long as the Familiar can draw a line of sight to the target of its
        controlling Rigʼs Attack, reduce the result of one of the targetʼs Evasion Attempt
        results by -1; also, apply this eﬀect to one rerolled Evasion Attempt.`,
        costMod: 1,
        costSpeed: 0,
        onePerWeapon: false,
        onePerRig: true,
        whatIsThis: 'modification'
    }
];