import { Container, Grid, Paper } from '@mui/material';
import React from 'react';
import { CreateProps } from './Create';

const RightSide: React.FC<CreateProps> = (props: CreateProps): React.ReactElement => {
    return (
        <Grid item xs={6}>
            {
                props.hovered !== undefined ?
                    <Paper sx={{
                        padding: 2,
                        textAlign: 'center',
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
                                        (props.hovered.whatIsThis === 'gunnerSpecial') ?
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
/*
        name: 'Target Acquisition System',
        effect: `A Rig equipped with this Modification can make Aimed Shots by reducing its Momentum by
        only 1, rather than the normal 2. MAX one per rig`,
        costMod: 1,
        costSpeed: 0,
        onePerRig: true,
*/