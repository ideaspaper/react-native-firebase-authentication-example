import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  Icon,
  Input,
  Link,
  Spinner,
  Stack,
  Text,
  WarningOutlineIcon
} from 'native-base';
import { FirebaseAuth } from './../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import ActionAlert from '../components/ActionAlert';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [alertShow, setAlertShow] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertStatus, setAlertStatus] = useState('');

  const handleCloseAlert = () => {
    setAlertShow(false);
  };

  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };

  const handleOnChangePassword = (value) => {
    setPassword(value);
  };

  const handleOnPressRegister = async () => {
    if (!email || !password) return;
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(FirebaseAuth, email, password);
      // navigation.navigate('SignIn');
    } catch (error) {
      setAlertMessage(error.code);
      setAlertStatus('error');
      setAlertShow(true);
    } finally {
      setLoading(false);
    }
  };

  const handleOnPressLink = () => {
    navigation.navigate('SignIn');
  };

  return (
    <Box flex="1">
      <ActionAlert
        show={alertShow}
        message={alertMessage}
        status={alertStatus}
        handleCloseAlert={handleCloseAlert}
      />
      <FormControl flex="1" p="8">
        <Stack space="5">
          <Stack>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              type="text"
              variant="underlined"
              p={2}
              placeholder="Email"
              value={email}
              onChangeText={handleOnChangeEmail}
            />
            <FormControl.ErrorMessage
              isInvalid={!email.length}
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              Email cannot be empty.
            </FormControl.ErrorMessage>
          </Stack>
          <Stack>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              type={showPassword ? 'text' : 'password'}
              variant="underlined"
              p={2}
              placeholder="Password"
              value={password}
              onChangeText={handleOnChangePassword}
              InputRightElement={
                <Icon
                  as={Ionicons}
                  name={showPassword ? 'eye' : 'eye-off'}
                  mr="2"
                  onPress={() => {
                    setShowPassword(!showPassword);
                  }}
                />
              }
            />
            <FormControl.ErrorMessage
              isInvalid={!password.length}
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              Password cannot be empty.
            </FormControl.ErrorMessage>
          </Stack>
          <Link onPress={handleOnPressLink}>
            <FormControl.HelperText mr="1">Already have an account?</FormControl.HelperText>
            <FormControl.HelperText>
              <Text color="blue.500" fontSize="xs">
                Sign-in here
              </Text>
            </FormControl.HelperText>
          </Link>
          <Button
            mt="8"
            onPress={handleOnPressRegister}
            leftIcon={loading && <Spinner color="white" />}
          >
            Register
          </Button>
        </Stack>
      </FormControl>
    </Box>
  );
};

export default RegisterScreen;
