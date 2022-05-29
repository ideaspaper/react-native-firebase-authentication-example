import { useContext } from 'react';
import { Box, Button, Heading, Text } from 'native-base';
import { FirebaseAuth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { AuthenticatedUserContext } from '../components/AuthenticatedUserContext';

const HomeScreen = () => {
  const { user } = useContext(AuthenticatedUserContext);

  const handleOnPress = async () => {
    signOut(FirebaseAuth);
  };

  return (
    <Box p="8">
      <Heading mb="8">Home Page</Heading>
      <Text mb="3">Email: {user.email}</Text>
      <Text mb="3">UID: {user.uid}</Text>
      <Text mb="8">Verified: {user.emailVerified ? 'yes' : 'no'}</Text>
      <Button onPress={handleOnPress}>Sign Out</Button>
    </Box>
  );
};

export default HomeScreen;
