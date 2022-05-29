import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { AuthenticatedUserProvider } from './components/AuthenticatedUserContext';
import AppStack from './navigators/AppStack';

const App = () => {
  return (
    <NativeBaseProvider>
      <AuthenticatedUserProvider>
        <NavigationContainer>
          <AppStack />
        </NavigationContainer>
      </AuthenticatedUserProvider>
    </NativeBaseProvider>
  );
};

export default App;
