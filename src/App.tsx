import { Container } from '@mui/material';
import React, { useState } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

const App: React.FC = (): React.ReactElement => {
  const [device, setDevice] = useState<'mobile' | 'laptop'>('laptop');

  return (
    <Container sx={{
      background: "black",
      width: "100vw",
      height: "100vh",
      padding: 1
    }}>

      <Header
        device={device}
        setDevice={setDevice}
      />

      <Main
        device={device}
      />

      <Footer/>

    </Container>
  );
}

export default App;
