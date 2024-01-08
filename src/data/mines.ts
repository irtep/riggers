export interface Mine {
    name: string;
    range: number;
    impactPower: number;
    costMod: number;
    costSpeed: number;
    effects: string;
};

export const mines: Mine[] = [
    {
        name: 'Nova',
        range: 5,
        impactPower: 4,
        costMod: 0,
        costSpeed: 2,
        effects: ``
    },
    {
        name: 'Shatter',
        range: 5,
        impactPower: 3,
        costMod: 0,
        costSpeed: 2,
        effects: `Detonate [10cm]`
    },
    {
        name: 'Static Haze Projector',
        range: 0,
        impactPower: 0,
        costMod: 0,
        costSpeed: 1,
        effects: `Does not deal Damage. This Mine is triggered automatically at the end of the current
        Action. Until the start of the ownerʼs next Action, any Rig or Creature within [5cm] of this
        Mine is considered Obscured. Remove this Mine at the start of your next Action.`
    },
    {
        name: 'Slick Spitter',
        range: 5,
        impactPower: 0,
        costMod: 0,
        costSpeed: 1,
        effects: `Does not deal Damage. Rigs hit by this Mine must always make Handling Tests when
        attempting to turn their Rig until the start of the current Active Playerʼs next turn.`
    },
    {
        name: 'Epicentre',
        range: 5,
        impactPower: 3,
        costMod: 0,
        costSpeed: 2,
        effects: `Any Rig or Creature hit by this Mine must reduce its Momentum by 2.`
    },
    {
        name: 'Thermite',
        range: 5,
        impactPower: 6,
        costMod: 0,
        costSpeed: 2,
        effects: `Can only hit a maximum of 1 target. The Player who owns this Mine chooses.`
    },
];