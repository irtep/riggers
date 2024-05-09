import { Container, Paper, Typography } from '@mui/material';
import React from 'react';
import { Weapon } from '../data/weapons';
import { Modification } from '../data/modifications';
import { Ammunition, GunnerSpecial } from '../data/gunnerSpecials';
import { Mine } from '../data/mines';
import { ConcealedWeapons, DriverSpecial } from '../data/driverSpecials';

interface ShowProps {
    item: Weapon | Modification | Mine | GunnerSpecial | Ammunition | ConcealedWeapons | DriverSpecial
}

const ShowDetails: React.FC<ShowProps> = (props: ShowProps): React.ReactElement => {
    return (
        <>
            {
                (props.item.whatIsThis === 'weapon') ?
                    <>
                        <span style={{ color: 'navy' }}>
                            Impact Power:</span> {props.item.impactPower} <br /><br />
                        <span style={{ color: 'navy' }}>
                            Type:</span> {props.item.type} <br /><br />
                        <span style={{ color: 'navy' }}>
                            Range:</span> {props.item.range} <br /><br />
                        <span style={{ color: 'navy' }}>
                            Cost in mod slots:</span> {props.item.costMod} <br /><br />
                        <span style={{ color: 'navy' }}>
                            Cost in speed:</span> {props.item.costSpeed} <br /><br />
                        <span style={{ color: 'navy' }}>
                            specials:</span> {props.item.specialties} <br /><br />
                        <span style={{ color: 'navy' }}>
                            Primed special:</span> {props.item.primed} <br /><br />
                    </> : <></>
            }
            {
                (props.item.whatIsThis === 'mine') ?
                    <>
                        <span style={{ color: 'navy' }}>
                            Impact Power:</span> {props.item.impactPower} <br /><br />
                        <span style={{ color: 'navy' }}>
                            Range:</span> {props.item.range} <br /><br />
                        <span style={{ color: 'navy' }}>
                            Cost in mod slots:</span> {props.item.costMod} <br /><br />
                        <span style={{ color: 'navy' }}>
                            Cost in speed:</span> {props.item.costSpeed} <br /><br />
                        <span style={{ color: 'navy' }}>
                            specials:</span> {props.item.effects} <br /><br />
                    </> : <></>
            }
            {
                (props.item.whatIsThis === 'modification') ?
                    <>
                        {props.item.effect} <br /><br />
                        <span style={{ color: 'navy' }}>
                            Cost in mod slots:</span> {props.item.costMod} <br /><br />
                        <span style={{ color: 'navy' }}>
                            Cost in speed:</span> {props.item.costSpeed} <br /><br />
                    </> : <></>
            }
            {
                (props.item.whatIsThis === 'concealedWeapon') ?
                    <>
                        <span style={{ color: 'navy' }}>
                            Impact Power:</span> {props.item.impactPower} <br /><br />
                        <span style={{ color: 'navy' }}>
                            Range:</span> {props.item.range} <br /><br />
                        <span style={{ color: 'navy' }}>
                            Type:</span> {props.item.type} <br /><br />
                        <span style={{ color: 'navy' }}>
                            specials:</span> {props.item.effects} <br /><br />
                    </> : <></>
            }
            {
                (props.item.whatIsThis === 'gunnerSpecial') ?
                    <>
                        {props.item.desc} <br /><br />
                    </> : <></>
            }
            {
                (props.item.whatIsThis === 'driverSpecial') ?
                    <>
                        {props.item.desc} <br /><br />
                    </> : <></>
            }
            {
                (props.item.whatIsThis === 'ammunition') ?
                    <>
                        {props.item.desc} <br /><br />
                    </> : <></>
            }
        </>
    );
}

export default ShowDetails;