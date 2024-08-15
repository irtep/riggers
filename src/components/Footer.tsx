import { Button, Container, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { RigContext } from '../context/RigContext';

const Footer: React.FC = (): React.ReactElement => {
  const {
    setMode
  } = useContext(RigContext);

  return (
    <Container sx={{
      background: "darkRed",
      color: "white",
      borderRadius: 2
    }}>
      <Typography>
        Version: 0.4.6
      </Typography>
      <Button 
        sx={{ color: 'rgb(180,180,180)' }}
        onClick={ () => { setMode('rules'); }}
        >rules</Button>
      <Button 
        sx={{ color: 'rgb(180,180,180)' }}
        onClick={ () => { setMode('lore'); }}
        >lore</Button>
    </Container>
  );
}

export default Footer;