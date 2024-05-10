import { Container, Grid, Paper } from '@mui/material';
import React, { useContext } from 'react';
import { RigContext } from '../context/RigContext';
import ShowDetails from './ShowDetails';

const RightSide: React.FC = (): React.ReactElement => {

  const { hovered } = useContext(RigContext);

    return (
        <Grid item xs={6}>
            {
                (hovered !== undefined && hovered !== '') ?
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
                            hovered !== undefined ?
                                <Container>
                                    <span style={{ color: 'navy' }}>
                                        {hovered.name}<br /><br />
                                    </span>
                                    <ShowDetails
                                        item={hovered}
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
