import React from 'react';
import { Flex, Box } from '@chakra-ui/react';
import Header from './header/Header';

const Layout = ({ children }) => {
  return (
    <Flex h="100vh" flexDirection="column">
      <Header />
      <Flex flex="1" overflow="auto">
        <Box flex="1" p="4">
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};

export default Layout;
