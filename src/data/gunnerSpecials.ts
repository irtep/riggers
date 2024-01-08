interface GunnerSpecial {
    name: string;
    desc: string;
};

interface Ammunition {
    name: string;
    desc: string;
}

const gunnerSpecials: GunnerSpecial[] = [
    {
        name: `Brace of grenades`,
        desc: `Once per Round , during your own Action, your Gunner
        may throw 1 of the following grenades at a target within
        [10cm] of your Rig and in any direction. Grenades can be
        evaded as normal. This Speciality counts as Attacking with
        one Weapon.
        ● Nova Grenade : Impact Power 4.
        ● Shatter Grenade : Impact Power 3,
        Detonate [5cm].
        ● Flash Shock Grenade : Deals 0 Damage. Targets hit
        cannot activate Crew Specialties for the duration of
        the current Action.`
    },
    {
        name: `Eye of the hunter`,
        desc: `Once per Round , you may reduce one of your targetʼs
        Evasion Attempt results by -1; also, apply this Specialty's
        eﬀect to a single re-rolled Evasion Attempt. The use of this
        Speciality must be declared at the same time the target of the
        Attack is declared.`
    },
    {
        name: `Tactical distraction`,
        desc: `Once per Round , your Gunner may activate this Speciality
        to Attack a valid target that declares an Attack against your
        Rig before their Attack is made. If your target chooses to
        evade this Attack, you may add +1 to one of your own
        Evasion Attempt results when trying to evade their Attack.
        However, Attacks made with this Speciality may not use
        Primer to activate their Specialities and the same Weapon
        cannot be used during your next Action.`
    },
    {
        name: `The right tool`,
        desc: `Choose 3 items from the table on the next page; the same
        item can be taken multiple times. The Player must declare
        they are using the ammunition before they declare their
        target. A Weapon can only fire 1 type of ammunition each
        time it is used. This Specialty cannot be used in
        conjunction with a Mine Launcher or a Weapon from the
        Driver Speciality ʻConcealed Weaponʼ
        , but the chosen
        ammunition can be used with a Familiarʼs Weapons ( The
        Rigʼs Gunner has preloaded some of the ammunition into the
        Familiar before the Event); although a Familiar cannot use
        the ʻDrastic Payloadʼ ammunition.`
    },
    {
        name: `Itchy tinker fingers`,
        desc: `Before placing your Rig into the Arena , nominate 1 Weapon
        on your Rig or Familiar; your Gunner does some
        last-minute tinkering to this Weapon. Roll 1 dice and
        consult the table below. The result indicates what the
        Gunner managed to achieve for this Weapon.
        1. Trick Chamber: Once per game, this Weapon can
        be used a second time during your own Actions.
        This second Attack cannot use Primer to activate
        the Weaponʼs Specialities.
        2. Internal Primer Capacitor: This Weapon starts the
        Event with 1 Primer.
        3. Honed Projectiles: +1 to all of this Weaponʼs Impact
        Power results.
        4. Adept Tinker : Choose two of the options above.`
    },
    {
        name: `Trigger happy`,
        desc: `Your Gunner is somewhat reckless when it comes to firing
        Weapons. Once per Round, you may use this Speciality to
        Attack with a single Weapon a second time during your
        own Action. The target can roll 1 additional Evasion
        Attempt when trying to evade the additional Attack made
        by this Specialty (this does not reduce their Momentum).
        Attacks made this way may not use Primer to activate their
        Specialities. This Speciality can be used in conjunction
        with a Weapon equipped to a Familiar, but not from the
        Driver Specialty ʻConcealed Weaponʼ or a Mine Launcher.`
    },
    {
        name: `Severe precision`,
        desc: `An expert in Rig assembly, your Gunner can spot weaknesses in
        the target's armour with ease and knows exactly how to exploit
        them. Once per Round, you may reroll up to 2 of your
        Weaponʼs Impact Power dice when rolling as a result of that
        Weapon dealing Damage.`
    },
    {
        name: `Veteran dogfighter`,
        desc: `Once per game , all of your Attacks are considered Aimed
        Shots for the duration of one of your Actions without
        needing to reduce your Momentum. Additionally, your
        target cannot be Obscured by any means and modifiers or
        rules of any kind that would normally be applied to Evasion
        Attempts by the target are negated.`
    },
    {
        name: `Familiar`,
        desc: `Your Gunner is an adept robotics enthusiast and has
        created a personal, remote control, cybernetic assistant to
        use in the Arena.`
    },
];

const ammunitions: Ammunition[] = [
    {
        name: `Overcharger Cell`,
        desc: `An Energy Weapon using this ammo increases the number of Impact Power dice it rolls by 1.`
    },    
    {
        name: `Hammer Shells`,
        desc: `A Shell Weapon using this ammo increases the number of Impact Power dice it rolls by 1.`
    },    
    {
        name: `Thermite Warheads`,
        desc: `A Missile Weapon using this ammo increases the number of Impact Power dice it rolls by 1.`
    },    
    {
        name: `Nullifiers`,
        desc: `If it hits, an Attack made by an Energy Weapon using this ammo deals 0 Damage but the target
        must discard 1 Primer Token if they have any.`
    },    
    {
        name: `Corrosive Cores`,
        desc: `A Shell Weapon using this ammo gains a Breacher (3+) Effect.`
    },    
    {
        name: `Whiplash Missiles`,
        desc: `An Attack made by a Missile Weapon using this ammo requires at least 2 successful Evasion
        Attempts to be evaded.`
    },    
    {
        name: `Tracer Tags`,
        desc: `Attacks using this ammo deal 0 damage. If the Attack hits, any further Attacks you make for the
        remainder of this Action at the same target are considered Aimed Shots without needing to
        reduce your Momentum.`
    },    
    {
        name: `Decoy Flares`,
        desc: `Allows your Decoy Flare Launcher to be used an additional time.`
    },    
    {
        name: `Flash Shock Bombs`,
        desc: `Requires a Mine Launcher to be used. Instead of placing a Mine on the Arena floor like normal,
        the Mine Launcher sprays a cluster of spherical devices behind the Rig that are automatically
        triggered and have the following profile:
        Flash Shock Bombs — Range [5cm], Impact Power n/a.
        Eﬀects: Deals 0 Damage. Cannot be evaded. A Target that is hit by this ammunition cannot activate
        Crew Specialties for the duration of the current Action. This Ammunition can only aﬀect targets that
        are behind the rear half of the attacking Rigʼs base and does not aﬀect the attackerʼs own Rig.`
    },    
    {
        name: `Drastic Payload`,
        desc: `Go out with a bang! During your own Action you can Detonate your Rig to cause an explosion
        with a Detonate radius of [10cm], which is measured from all parts of your Rigʼs base. Any Rig
        or Creature within [5cm] takes 2 Damage; roll for Impact Power normally (this explosion has
        Impact Power 6). Targets more than [5cm] away only take Damage from the Impact Power of
        this explosion.
        Once you have used this, your Rig is considered Charred. In addition to any Favour Points
        that you received for dealing Damage or Charring Rigs by using this item, you earn 2 additional
        Favour points for doing whatever it takes to get the win.
        Self damage does not award Favour Points.`
    },
];