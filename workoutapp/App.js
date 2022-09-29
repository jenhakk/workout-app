import React from 'react';
import { View } from 'react-native';
import { Button, Text } from '@rneui/base';
import Motivation from './components/Motivation';
import ViewStart from './views/ViewStart';
import ViewMeasAdd from './views/ViewMeasAdd';

const App = () => {
  const AwesomeButton = () => <Button title="Welcome" />;


  return (
    <View>
      {/* <AwesomeButton />
      <Motivation />
      <Button title='Smile!' />
      <Text>Halloo</Text> */}
      
      
      <ViewStart />
      {/* <ViewMeasAdd /> */}
    </View>
  );
};

export default App;