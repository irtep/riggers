import { Container } from '@mui/material';
import React from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

const App : React.FC = () : React.ReactElement => {
  return (
    <Container sx={{ background: "black", padding: 1}}>
      <Header/>
      <Main/>
      <Footer/>
    </Container>
  );
}

export default App;
