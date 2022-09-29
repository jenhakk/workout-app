import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Text} from '@rneui/base';
import {Icon} from '@rneui/themed';
import Motivation from '../components/Motivation';

const ViewStart = () => {
  var user = 'Pertti';

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text>Hello {user}!</Text>
        <Text>Today is 29.9.2022</Text>
      </View>

      <View style={styles.motivation}>
        <Motivation />
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttongroup}>
          <Button
            title={<CustomTitleWorkout />}
            buttonStyle={styles.button}></Button>
          <Button
            title={<CustomTitleAddMeas />}
            buttonStyle={styles.button}></Button>
        </View>
        <View style={styles.buttongroup}>
          <Button
            title={<CustomTitleWorkoutHistory />}
            buttonStyle={styles.button}></Button>
          <Button
            title={<CustomTitleMeasHistory />}
            buttonStyle={styles.button}></Button>
        </View>
      </View>
    </View>
  );
};

const CustomTitleWorkout = () => {
  return (
    <View style={{flexDirection: 'column'}}>
      <Icon
        name="weight-lifter"
        type="material-community"
        color="white"
        size={45}
      />
      <Text
        style={{
          fontSize: 15,
          color: 'white',
          marginTop: 15,
          fontWeight: '700',
        }}>
        Start Workout
      </Text>
    </View>
  );
};

const CustomTitleAddMeas = () => {
  return (
    <View style={{flexDirection: 'column'}}>
      <Icon
        name="scale-bathroom"
        type="material-community"
        color="white"
        size={40}
      />
      <Text
        style={{
          fontSize: 15,
          color: 'white',
          marginTop: 10,
          textAlign: 'center',
          fontWeight: '700',
        }}>
        Add Measurements
      </Text>
    </View>
  );
};

const CustomTitleWorkoutHistory = () => {
  return (
    <View style={{flexDirection: 'column'}}>
      <Icon name="arm-flex" type="material-community" color="white" size={40} />
      <Text
        style={{
          fontSize: 15,
          color: 'white',
          marginTop: 10,
          textAlign: 'center',
          fontWeight: '700',
        }}>
        Workout History
      </Text>
    </View>
  );
};
const CustomTitleMeasHistory = () => {
  return (
    <View style={{flexDirection: 'column'}}>
      <Icon
        name="chart-line"
        type="material-community"
        color="white"
        size={40}
      />
      <Text
        style={{
          fontSize: 15,
          color: 'white',
          marginTop: 10,
          textAlign: 'center',
          fontWeight: '700',
        }}>
        Measurements History
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  top: {
    flex: 1,
    alignItems: 'center',
  },

  motivation: {
    flex: 3,
    paddingLeft: 30,
    paddingRight: 30,
  },

  buttonContainer: {
    flex: 5,
  },
  buttongroup: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  button: {
    width: 130,
    height: 130,
    backgroundColor: 'rgba(92, 99,216, 1)',
    borderColor: 'transparent',
    borderRadius: 20,
    margin: 20,
  },
});

export default ViewStart;
