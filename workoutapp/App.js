import React from 'react';
import { View } from 'react-native';
import { Button, Text } from '@rneui/base';
import ViewStart from './views/ViewStart';
import ViewMeasAdd from './views/ViewMeasAdd';
import ViewMeasSummary from './views/ViewMeasSummary';
import ViewMeasHistory from './views/ViewMeasHistory';
import ViewPerson from './views/ViewPerson';
import ViewEditProfile from './views/ViewEditProfile';
import ViewExercises from './views/ViewExercises';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ViewDuringWorkout from './views/ViewDuringWorkout';
import ViewAfterWorkout from './views/ViewAfterWorkout';
import ViewWorkoutHistory from './views/ViewWorkoutHistory';
import ViewInstructions from './views/ViewInstructions';


const Stack = createNativeStackNavigator();

const App=()=>{
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Home" component={ViewStart} options={{headerRight: () => ( <Button title='ins' />)}} />
        <Stack.Screen name="Add Exercises" component={ViewExercises} options={{headerRight: () => ( <Button title='ins' />)}} />
        <Stack.Screen name="Add measurements" component={ViewMeasAdd} options={{headerRight: () => ( <Button title='ins' />)}} />
        <Stack.Screen name="Your measurements" component={ViewMeasSummary} options={{headerRight: () => ( <Button title='ins' />)}} />
        <Stack.Screen name="All recorded measurements" component={ViewMeasHistory} options={{headerRight: () => ( <Button title='ins' />)}} />
        <Stack.Screen name="Profile" component={ViewPerson} options={{headerRight: () => ( <Button title='ins' />)}} />
        <Stack.Screen name="Edit profile" component={ViewEditProfile} options={{headerRight: () => ( <Button title='ins' />)}} />
        <Stack.Screen name="During workout" component={ViewDuringWorkout} options={{headerRight: () => ( <Button title='ins' />)}} />
        <Stack.Screen name="Workout Summary" component={ViewAfterWorkout} options={{headerRight: () => ( <Button title='ins' />)}} />
        <Stack.Screen name="Workout History" component={ViewWorkoutHistory} options={{headerRight: () => ( <Button title='ins' />)}} />
        <Stack.Screen name="Instructions" component={ViewInstructions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;