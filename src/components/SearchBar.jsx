import React from 'react';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const SearchBar = ({ onSearch }) => {
  return (
    <InputGroup width={300}>
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="gray.300" />
      </InputLeftElement>
      <Input type="text" placeholder="Search" onChange={(e) => onSearch(e.target.value)} />
    </InputGroup>
  );
};

export default SearchBar;
