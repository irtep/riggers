import { Container, Typography } from '@mui/material';
import React from 'react';


const Footer : React.FC = () : React.ReactElement => {
  return (
    <Container sx={{
        background: "darkRed",
        color: "white",
        borderRadius: 2
    }}>
      <Typography>
       Version: 0.3.0
      </Typography>
    </Container>
  );
}

export default Footer;