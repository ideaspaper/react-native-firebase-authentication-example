import { Alert, HStack, IconButton, VStack, Text, CloseIcon, Collapse } from 'native-base';

const ActionAlert = ({ show, message, status, handleCloseAlert }) => {
  return (
    <Collapse isOpen={show}>
      <Alert w="100%" status={status}>
        <VStack space={2} flexShrink={1} w="100%">
          <HStack flexShrink={1} space={2} justifyContent="space-between" alignItems="center">
            <HStack space={2} flexShrink={1}>
              <Alert.Icon mt="1" />
              <Text fontSize="md" color="coolGray.800">
                {message}
              </Text>
            </HStack>
            <IconButton
              onPress={handleCloseAlert}
              variant="unstyled"
              _focus={{
                borderWidth: 0
              }}
              icon={<CloseIcon size="3" />}
              _icon={{
                color: 'coolGray.600'
              }}
            />
          </HStack>
        </VStack>
      </Alert>
    </Collapse>
  );
};

export default ActionAlert;
