export interface SpecialEffect {
    prop: string;
    value: number;
};

export interface DriverSpecial {
    name: string;
    desc: string;
    specialEffects?: SpecialEffect;
    whatIsThis: 'driverSpecial'
};

export interface ConcealedWeapons {
    name: string;
    range: number | string;
    type: 'Shell' | 'Energy' | 'Missile';
    impactPower: number | string;
    effects: string;
    whatIsThis: 'concealedWeapon'
};

export const driverSpecials: DriverSpecial[] = [
    {
        name: 'Boost juice',
        desc: `During your own Action,
        before you move, declare how many Boost Juice Canisters
        you will activate, up to a maximum of 3, and roll that many
        dice. Each roll of a 1 indicates that a canister has ruptured
        and exploded, causing 1 point of Damage to the Rig; these
        do not provide extra Speed and cannot be used again for
        the rest of the game. Calculate any Damage before you
        move. However, for every other result you gain an
        additional +5 Speed for the duration of this Action. A Rig is
        unable to turn or Reposition during the same Action in
        which it gains any additional Speed from this Speciality.
        If a Rig fitted with Boost Juice is Charred, all Rigs and
        Creatures within [5cm] will automatically receive an
        amount of Damage equal to the number of remaining Boost
        Juice canisters on the Rig.`,
        whatIsThis: 'driverSpecial'
    },
    {
        name: 'Circle work',
        desc: `Once per
        Round , during your own Action, you may reduce your
        Momentum by 1 to Obscure your Rig from all non-Combat
        Weapon Attacks until the start of your next Action. If you
        move your Rig after activating this Speciality, this eﬀect
        ends.`,
        whatIsThis: 'driverSpecial'
    },
    {
        name: 'Calculating optimist',
        desc: `Once per game , you may immediately Move and turn your
        Rig, or use one of its Weapons as if your Activation Token
        was Revealed. This Speciality can interrupt another Playerʼs
        Action. This does not replace any of your Actions for this
        Round. If multiple Players wish to do this, they must roll 2 dice
        and add their Speed value to the result to see who acts first.`,
        whatIsThis: 'driverSpecial'
    },
    {
        name: 'Concealed weapon',
        desc: `A secret compartment in the Rig conceals an illegal,
        non-Primer-reliant Weapon. Choose 1 Weapon from the
        table at the bottom of this page. Once per Round, you may
        Attack with the Weapon during any of your Actions. This
        Speciality counts as using a Weapon. These weapons cannot
        be modded in any way.`,
        whatIsThis: 'driverSpecial'
    },
    {
        name: 'Drifter',
        desc: `Increase your Rigʼs Handling by +1.
        In addition, once per Round , you may turn your Rig after
        moving it as a result of failing a Handling Test.`,
        specialEffects: {
            prop: 'handling',
            value: 1
        },
        whatIsThis: 'driverSpecial'
    },
    {
        name: 'Evasive Manoeuvres',
        desc: `Once per Round , you can add +1 to one of your Evasion
        Attempts made against an incoming Attack; also, apply this
        Specialty's eﬀect to a single re-rolled Evasion Attempt. The
        use of this Speciality must be declared immediately after your
        Rig is declared the target of an Attack.`,
        whatIsThis: 'driverSpecial'
    },
    {
        name: 'Pedal to the metal',
        desc: `Once per Round, during your own Action, before moving
        your Rig, add +5 to your Speed value for this Action.`,
        whatIsThis: 'driverSpecial'
    }
];

export const concealedWeapons: ConcealedWeapons[] = [
    {
        name: 'Boom Stick',
        range: 10,
        type: 'Shell',
        impactPower: 4,
        effects: `Point Blank — Add +2 to this Weaponʼs Impact Power result if the target is no more than
        [5cm] away.`,
        whatIsThis: 'concealedWeapon'
    },
    {
        name: 'Bad Ugly',
        range: 10,
        type: 'Shell',
        impactPower: '1-6',
        effects: `Punk Buster — This Weapon can only roll a combined total of 6 Impact Power dice during
        the game. However, the owner chooses how many to roll each time they use this Weapon.`,
        whatIsThis: 'concealedWeapon'
    },   
    {
        name: 'Razor',
        range: 10,
        type: 'Shell',
        impactPower: 4,
        effects: `Sticky Trigger — When Rolling for Impact Power, any results of 1 are discarded but for each
        result of 4, the Player rolls 1 additional Impact Power dice. These additional Impact Power
        dice do not add nor remove any further Impact Power dice.`,
        whatIsThis: 'concealedWeapon'
    },

];