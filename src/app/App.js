import React from 'react';
import { ChakraProvider,CSSReset } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import customTheme from '../assets/theme';
import Layout from '../layout';
import Dashboard from '../components/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={customTheme}>
        <CSSReset />
        <Layout>
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
          </Routes>
        </Layout>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
