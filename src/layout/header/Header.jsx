import React from 'react';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import { HEADER_BG, HEADER_FONT } from './constant';

const Header = () => {
  const bgHeader = useColorModeValue(HEADER_BG.LIGHT, HEADER_BG.DARK);
  const fontColor = useColorModeValue(HEADER_FONT.LIGHT, HEADER_FONT.DARK);
  return (
    <Box bg={bgHeader} p={4} color="white">
      <Flex justify="space-between" align="center">
        <Box color={fontColor}>Logo</Box>
        <ColorModeSwitcher />
      </Flex>
    </Box>
  );
};

export default Header;
