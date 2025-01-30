interface Rule {
    title: string;
    type: string;
    rule: string;
};

export const rules: Rule[] = [
    {
        title: 'DETONATE',
        type: 'weapon speciality',
        rule: `This Weapon is able to target a valid point on the Arena Floor and automatically hit it.
The number shown next to the word ʻDetonateʼ indicates an area of effect radius.
Unless the Attack is evaded, the attacking Player chooses a point on the targetʼs base (within range)
to measure the radius from. Any Rig or Creature within the Detonation radius also takes a hit from
the Weapon, unless they can evade it. Targets hit only by the Detonate radius of a Weaponʼs Attack
can only ever receive Damage from the Impact Power result of that Weapon; roll for each target hit
separately.`
    },
    {
        title: 'BREACHER',
        type: 'weapon speciality',
        rule: `If this Weapon deals 1 or more Damage to a target, roll 1 dice; if the result is equal to or greater
than the number found in parentheses next to the ʻBreacherʼ Speciality, the target suffers 1
additional Damage. Only 1 source of a Breacher Speciality/Effect can be applied to a Weaponʼs
Attack.`
    },
    {
        title: 'FULL PAYLOAD',
        type: 'weapon speciality',
        rule: `Pick a point on the Arena floor that is visible and in range. Draw a straight line from this point to
another visible point within [15cm] of the first. The first 3 targets along this line are hit unless they
make successful Evasion Attempts. This Speciality can hit the userʼs own Rig/Familiar.
If this Speciality is used, this Weapon cannot be used until aer your next Action.`
    },
    {
        title: 'PARTICLE FOCUS',
        type: 'weapon speciality',
        rule: `This Weaponʼs energy output can be tuned to be more effective against specific target materials.
When rolling for Impact Power as a result of this Weapon dealing Damage, roll 1 additional Impact
Power Dice.`
    },
    {
        title: 'PRIMER-LINK',
        type: 'weapon speciality',
        rule: `2 of the same Weapon with this Speciality can be used against the same target and count as the
attacker only using 1 Weapon. If the Attack hits, all Impact Power Dice from both Weapons are
rolled simultaneously and their results are combined. Aer Impact Power has been calculated, the
Attack deals 1 additional point of Damage. Only 1 Primer is needed to activate this Speciality.`
    },
    {
        title: 'SEEKER',
        type: 'weapon speciality',
        rule: `All Attacks made by a Weapon with this activated Speciality are considered Aimed Shots without it
reducing the attacking Rigs Momentum.`
    },
    {
        title: 'SUPERSONIC MUNITIONS',
        type: 'weapon speciality',
        rule: `A target attempting to evade Attacks made by this Weapon cannot activate any effects,
Modifications or Specialities that would normally allow them to modify or reroll their own Evasion
Attempts.`
    },
    {
        title: `SUSTAINED TRIGGER`,
        type: 'weapon speciality',
        rule: `A Weapon with this Speciality can reroll all of its Impact Power dice a single time if the first result
fails to exceed the Armour value of the target.`
    },
    {
        title: `ROCKBURST`,
        type: 'weapon speciality',
        rule: `This Weapon can draw a line of sight and Attack through 1 Obstacle as if it wasn't in the Arena. If this Speciality is activated and it does not Attack through an Obstacle, it deals 1 additional point of Damage if it hits a target.`
    },

];