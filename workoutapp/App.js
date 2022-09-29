import React from 'react';
import { View } from 'react-native';
import { Button, Text } from '@rneui/base';
import Motivation from './components/Motivation';
import ViewStart from './views/ViewStart';

const App = () => {
  const AwesomeButton = () => <Button title="Welcome" />;


  return (
    <View>
      {/* <AwesomeButton />
      <Motivation />
      <Button title='Smile!' />
      <Text>Halloo</Text> */}
      <ViewStart />
    </View>
  );
};

export default App;