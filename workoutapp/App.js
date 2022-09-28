import React from 'react';
import { View } from 'react-native';
import { Button, Text } from '@rneui/base';

const App = () => {
  const AwesomeButton = () => <Button title="Welcome" />;


  return (
    <View>
      <AwesomeButton />

      <Button title='Smile!' />
      <Text>Halloo</Text>
    </View>
  );
};

export default App;