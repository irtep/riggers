import { Container, Grid, Paper } from '@mui/material';
import React from 'react';
import { CreateProps } from './Create';
import ShowDetails from './ShowDetails';

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
                                    <ShowDetails
                                        item={props.hovered}
                                    />
                                </Container> : <></>

                        }
                    </Paper> :
                    <></>
            }
        </Grid>
    );
}

export default RightSide;
