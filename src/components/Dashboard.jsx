import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Container,
  Heading,
  Box,
  Button,
  useToast,
  Spacer,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import axios from 'axios';
import UserTable from './UserTable';
import UserForm from './UserForm';
import SearchBar from './SearchBar';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const toast = useToast();

  useEffect(() => {
    axios
      .get('http://localhost:5000/users')
      .then(data => setUsers(data.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleCreateUser = newUser => {
    setUsers([...users, newUser]);
    axios
      .post('http://localhost:5000/users', newUser)
      .then(() =>
        toast({
          title: 'User Added',
          description: 'The user has been successfully added.',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        })
      )
      .catch(() =>
        toast({
          title: 'Error',
          description: 'An error occurred while adding the user.',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        })
      );
  };

  const handleEditUser = editedUser => {
    const updatedUsers = users.map(user =>
      user.id === editedUser.id ? editedUser : user
    );
    setUsers(updatedUsers);
    axios
      .put(`http://localhost:5000/users/${editedUser.id}`, editedUser)
      .then(() =>
        toast({
          title: 'User Updated',
          description: 'The user has been successfully updated.',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        })
      )
      .catch(() =>
        toast({
          title: 'Error',
          description: 'An error occurred while updating the user.',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        })
      );
  };

  const handleDeleteUser = userId => {
    const updatedUsers = users?.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    axios
      .delete(`http://localhost:5000/users/${userId}`)
      .then(() =>
        toast({
          title: 'User Deleted',
          description: 'The user has been successfully deleted.',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        })
      )
      .catch(() =>
        toast({
          title: 'Error',
          description: 'An error occurred while deleting the user.',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        })
      );
  };

  const handleSearch = searchTerm => {
    setSearchTerm(searchTerm);
  };

  const onEditClick = user => {
    setIsFormOpen(true);
    setSelectedUser(user);
  };

  return (
    <ChakraProvider>
      <Container maxW={1200} mt={10}>
        <Heading as="h1" mb={5}>
          User Management Dashboard
        </Heading>
        <Box mb={3} display="flex" justifyContent="space-between">
          <SearchBar onSearch={handleSearch} />
          <Button
            leftIcon={<AddIcon />}
            colorScheme="blue"
            onClick={() => setIsFormOpen(true)}
          >
            Create User
          </Button>
        </Box>
        <Spacer />
        <UserTable
          users={users?.filter(
            user =>
              user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
              user.role.toLowerCase().includes(searchTerm.toLowerCase())
          )}
          onDelete={handleDeleteUser}
          onEdit={onEditClick}
        />
        <UserForm
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedUser(null);
          }}
          onSubmit={selectedUser ? handleEditUser : handleCreateUser}
          user={selectedUser}
        />
      </Container>
    </ChakraProvider>
  );
};

export default Dashboard;
