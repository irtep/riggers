import { Container, Grid, Paper } from '@mui/material';
import React from 'react';
import { CreateProps } from './Create';

const RightSide: React.FC<CreateProps> = (props: CreateProps): React.ReactElement => {
    return (
        <Grid item xs={6}>
            {
                (props.hovered !== undefined && props.hovered !== '') ?
                    <Paper sx={{
                        padding: 2,
                        textAlign: 'center',
                        position: 'fixed',
                        top: 0,
                        bottom: 0,
                        borderRadius: 3,
                        background: 'rgb(170,170,170)'
                    }}>
                        {
                            props.hovered !== undefined ?
                                <Container>
                                    <span style={{ color: 'navy' }}>
                                        {props.hovered.name}<br /><br />
                                    </span>
                                    {
                                        (props.hovered.whatIsThis === 'weapon') ?
                                            <>
                                                <span style={{ color: 'navy' }}>
                                                    Impact Power:</span> {props.hovered.impactPower} <br /><br />
                                                <span style={{ color: 'navy' }}>
                                                    Type:</span> {props.hovered.type} <br /><br />
                                                <span style={{ color: 'navy' }}>
                                                    Range:</span> {props.hovered.range} <br /><br />
                                                <span style={{ color: 'navy' }}>
                                                    Cost in mod slots:</span> {props.hovered.costMod} <br /><br />
                                                <span style={{ color: 'navy' }}>
                                                    Cost in speed:</span> {props.hovered.costSpeed} <br /><br />
                                                <span style={{ color: 'navy' }}>
                                                    specials:</span> {props.hovered.specialties} <br /><br />
                                                <span style={{ color: 'navy' }}>
                                                    Primed special:</span> {props.hovered.primed} <br /><br />
                                            </> : <></>
                                    }
                                    {
                                        (props.hovered.whatIsThis === 'mine') ?
                                            <>
                                                <span style={{ color: 'navy' }}>
                                                    Impact Power:</span> {props.hovered.impactPower} <br /><br />
                                                <span style={{ color: 'navy' }}>
                                                    Range:</span> {props.hovered.range} <br /><br />
                                                <span style={{ color: 'navy' }}>
                                                    Cost in mod slots:</span> {props.hovered.costMod} <br /><br />
                                                <span style={{ color: 'navy' }}>
                                                    Cost in speed:</span> {props.hovered.costSpeed} <br /><br />
                                                <span style={{ color: 'navy' }}>
                                                    specials:</span> {props.hovered.effects} <br /><br />
                                            </> : <></>
                                    }
                                    {
                                        (props.hovered.whatIsThis === 'modification') ?
                                            <>
                                                {props.hovered.effect} <br /><br />
                                                <span style={{ color: 'navy' }}>
                                                    Cost in mod slots:</span> {props.hovered.costMod} <br /><br />
                                                <span style={{ color: 'navy' }}>
                                                    Cost in speed:</span> {props.hovered.costSpeed} <br /><br />
                                            </> : <></>
                                    }
                                    {
                                        (props.hovered.whatIsThis === 'concealedWeapon') ?
                                            <>
                                                <span style={{ color: 'navy' }}>
                                                    Impact Power:</span> {props.hovered.impactPower} <br /><br />
                                                <span style={{ color: 'navy' }}>
                                                    Range:</span> {props.hovered.range} <br /><br />
                                                <span style={{ color: 'navy' }}>
                                                    Type:</span> {props.hovered.type} <br /><br />
                                                <span style={{ color: 'navy' }}>
                                                    specials:</span> {props.hovered.effects} <br /><br />
                                            </> : <></>
                                    }
                                    {
                                        (props.hovered.whatIsThis === 'gunnerSpecial') ?
                                            <>
                                                {props.hovered.desc} <br /><br />
                                            </> : <></>
                                    }
                                    {
                                        (props.hovered.whatIsThis === 'driverSpecial') ?
                                            <>
                                                {props.hovered.desc} <br /><br />
                                            </> : <></>
                                    }
                                    {
                                        (props.hovered.whatIsThis === 'ammunition') ?
                                            <>
                                                {props.hovered.desc} <br /><br />
                                            </> : <></>
                                    }
                                </Container> : <></>

                        }
                    </Paper> :
                    <></>
            }
        </Grid>
    );
}

export default RightSide;
