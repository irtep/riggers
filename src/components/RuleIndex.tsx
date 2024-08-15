import { Button, Container, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { RigContext } from '../context/RigContext';

const RuleIndex : React.FC = () : React.ReactElement => {
    const {
        setMode
      } = useContext(RigContext);

  return (
    <Container>
      <Button
        onClick={ () => { setMode('main'); }}>
            back to main page
      </Button>
      <Typography sx={{
        color: 'rgb(180,180,180)'
      }}>
        section under construction...
      </Typography>
    </Container>
  );
}

export default RuleIndex;