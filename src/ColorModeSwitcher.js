import React from 'react';
import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

export const ColorModeSwitcher = props => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('light', 'dark');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  return (
    <IconButton
      size="md"
      fontSize="lg"
      aria-label={`Switch to ${text} mode`}
      variant="ghost"
      color="#3d7eff"
      border="1px solid #3d7eff"
      marginLeft="2"
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      {...props}
    />
  );
};
