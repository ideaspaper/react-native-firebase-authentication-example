import { useContext, useEffect, useState } from 'react';
import { Box, Spinner } from 'native-base';
import { FirebaseAuth } from './../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { AuthenticatedUserContext } from '../components/AuthenticatedUserContext';
import AuthenticatedStack from './AuthenticatedStack';
import UnauthenticatedStack from './UnauthenticatedStack';

const AppStack = () => {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(FirebaseAuth, async (authenticatedUser) => {
      try {
        await (authenticatedUser ? setUser(authenticatedUser) : setUser(null));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    });
    return unsubscribeAuth;
  }, []);

  if (loading) {
    return (
      <Box flex="1" justifyContent="center" alignItems="center">
        <Spinner size="lg" />
      </Box>
    );
  }

  return <>{user ? <AuthenticatedStack /> : <UnauthenticatedStack />}</>;
};

export default AppStack;
