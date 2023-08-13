import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  FormErrorMessage,
  InputRightElement,
  IconButton,
  InputGroup,
  Image,
  Box,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import axios from 'axios';

const UserForm = ({ isOpen, onClose, onSubmit, user }) => {
  const bgHeader = useColorModeValue('#EDF2F7', 'rgba(255, 255, 255, 0.08)');
  const fontColor = useColorModeValue('#1A202C', 'rgba(255, 255, 255, 0.92)');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [uploadedImage, setUploadedImage] = useState('');
  const [nameError, setNameError] = useState('');
  const [roleError, setRoleError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();

  const isValidEmail = email => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const clearValue = () => {
    setName('');
    setRole('');
    setEmail('');
    setUploadedImage('');
    setPassword('');
  };
  const clearErrors = () => {
    setNameError('');
    setRoleError('');
    setEmailError('');
    setPasswordError('');
  };
  useEffect(() => {
    setName(user?.name || '');
    setEmail(user?.email || '');
    setRole(user?.role || '');
    setPassword(user?.password || '');
    setUploadedImage(user?.image || '');
  }, [user]);

  const handleSubmit = () => {
    let isValid = true;
    if (!name) {
      setNameError('Name is required');
      isValid = false;
    } else {
      setNameError('');
    }
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError('Invalid email format');
      isValid = false;
    } else {
      setEmailError('');
    }
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError('Password must have a minimum length of 8 characters.');
    } else {
      setPasswordError('');
    }
    if (!role) {
      setRoleError('Role is required');
      isValid = false;
    } else {
      setRoleError('');
    }

    if (!isValid) {
      return;
    }
    const newUser = {
      id: user ? user.id : Date.now(),
      name,
      email,
      role,
      password,
      image: uploadedImage,
    };
    onSubmit(newUser);
    onClose();
    clearValue();
  };
  const handleImageUpload = async e => {
    const file = e.target.files[0];
    if (file) {
      const fileSizeKB = file.size / 1024;
      if (fileSizeKB <= 200) {
        const formData = new FormData();
        formData.append('image', file);

        try {
          const response = await axios.post(
            'http://localhost:5000/api/upload',
            formData
          );
          setUploadedImage(response.data.imageUrl);
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      } else {
        toast({
          title: 'Image Size Exceeded',
          description: 'Please upload an image of size up to 200KB.',
          status: 'error',
          duration: 10000,
          isClosable: true,
          position: 'top-right',
        });
        e.target.value = null;
      }
    }
  };
  const handleOverlayClick = event => {
    event.stopPropagation();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        clearValue();
        clearErrors();
      }}
      scrollBehavior="inside"
      closeOnOverlayClick={false}
    >
      <ModalOverlay onClick={handleOverlayClick} />
      <ModalContent>
        <ModalHeader>{user ? 'Edit User' : 'Create User'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isInvalid={nameError}>
            <FormLabel>Name*</FormLabel>
            <Input
              value={name}
              onChange={e => {
                setName(e.target.value);
                setNameError('');
              }}
              placeholder="Enter your name"
            />
            <FormErrorMessage>{nameError}</FormErrorMessage>
          </FormControl>
          <FormControl mt={3} isInvalid={emailError}>
            <FormLabel>Email*</FormLabel>
            <Input
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={e => {
                setEmail(e.target.value);
                setEmailError('');
              }}
            />
            <FormErrorMessage>{emailError}</FormErrorMessage>
          </FormControl>
          <FormControl mt={3} isInvalid={roleError}>
            <FormLabel>Role*</FormLabel>
            <Select
              value={role}
              onChange={e => {
                setRole(e.target.value);
                setRoleError('');
              }}
            >
              <option value="" disabled>
                Select
              </option>
              <option value="Administrator">Administrator</option>
              <option value="Editor">Editor</option>
              <option value="Viewer">Viewer</option>
            </Select>
            <FormErrorMessage>{roleError}</FormErrorMessage>
          </FormControl>
          <FormControl mt={3}>
            <FormLabel>Image</FormLabel>
            <Input type="file" onChange={handleImageUpload} accept="image/*" />
            {uploadedImage && (
              <Box display="flex" justifyContent="center" mt={3}>
                <Image
                  src={uploadedImage}
                  alt="Uploaded"
                  borderRadius={'50%'}
                  border="1px solid"
                  height="150px"
                  width="150px"
                />
              </Box>
            )}
          </FormControl>
          <FormControl mt={3} isInvalid={passwordError}>
            <FormLabel>Password*</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                  setPasswordError('');
                }}
                placeholder="Enter your password"
              />
              <InputRightElement width="4.5rem">
                <IconButton
                  h="1.75rem"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{passwordError}</FormErrorMessage>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Save
          </Button>
          <Button
            bg={bgHeader}
            color={fontColor}
            onClick={() => {
              onClose();
              clearValue();
              clearErrors();
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserForm;
