import React from 'react';
import { View } from 'react-native';
import { Button, Text } from '@rneui/base';
import ViewStart from './views/ViewStart';
import ViewMeasAdd from './views/ViewMeasAdd';
import ViewPerson from './views/ViewPerson';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App=()=>{
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Home" component={ViewStart} />
        <Stack.Screen name="Add measurements" component={ViewMeasAdd} />
        <Stack.Screen name="Profile" component={ViewPerson} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
    // <View>
    //   {/* <AwesomeButton />
    //   <Motivation />
    //   <Button title='Smile!' />
    //   <Text>Halloo</Text> */}
      
      
    //   <ViewStart />
    //   {/* <ViewMeasAdd /> */}
    // </View>

export default App;