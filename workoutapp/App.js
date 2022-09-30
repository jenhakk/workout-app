import React from 'react';
import { View } from 'react-native';
import { Button, Text } from '@rneui/base';
import ViewStart from './views/ViewStart';
import ViewMeasAdd from './views/ViewMeasAdd';
import ViewMeasSummary from './views/ViewMeasSummary';
import ViewMeasHistory from './views/ViewMeasHistory';
import ViewPerson from './views/ViewPerson';
import ViewExercises from './views/ViewExercises';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App=()=>{
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Home" component={ViewStart} />
        <Stack.Screen name="Add Exercises" component={ViewExercises} />
        <Stack.Screen name="Add measurements" component={ViewMeasAdd} />
        <Stack.Screen name="Your measurements" component={ViewMeasSummary} />
        <Stack.Screen name="All recorded measurements" component={ViewMeasHistory} />
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