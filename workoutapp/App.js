import React from 'react';
import { View } from 'react-native';
import { Button } from '@rneui/base';

const App = () => {
  const AwesomeButton = () => <Button title="Welcome" />;


  return (
    <View>
      <AwesomeButton />

      <Button title='Smile!' />
    </View>
  );
};

export default App;