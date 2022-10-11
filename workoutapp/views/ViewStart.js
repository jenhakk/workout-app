import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ImageBackground, Dimensions} from 'react-native';
import {Button, Text} from '@rneui/base';
import {Icon} from '@rneui/themed';
import Motivation from '../components/Motivation';
import NavButtons from '../components/NavButtons';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {getCurrentDate} from '../components/Date.js';

const ViewStart = props => {
  const LOCAL_ADDRESS = 'http://10.0.2.2:8080';
  const SERVICE_ADDRESS = LOCAL_ADDRESS;
  const [isLoading, setLoading] = useState(true);
  const [person, setPerson] = useState([]);
  const [personId, setPersonId] = useState();
  var user = 'Pertti';

  const image = require('../assets/imageback.png');

  useEffect(() => {
    {props.navigation.setOptions({headerRight: () => (
      <Icon
        name="head-question"
        type="material-community"
        color="rgba(92, 99,216, 1)"
        size={25}
        onPress={() => props.navigation.navigate('Instructions')}
      />
    )})
  }
    if (isLoading) {
        fetchPerson();
        setLoading(false);
    }
}, [])

  const fetchPerson = async () => {
    try {
      let response = await fetch(
        SERVICE_ADDRESS + '/rest/workoutservice/readperson',
      );
      let json = await response.json();

      setPerson(json);
      setPersonId(json[0].personid);
      console.log("person id?", json[0].personid);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <ImageBackground
          source={require('../assets/imageback.png')}
          resizeMode="cover"
          style={styles.image}>
          
          <View style={styles.motivation}>
            <Text
            style={{
              color: 'white',
              fontSize: 17,
              textAlign: 'center',
              fontWeight: '700',
              paddingTop: 5,
              
            }}>
            {getCurrentDate()}
          </Text>
            <Motivation />
          </View>
        </ImageBackground>
      </View>

      <View style={styles.buttonContainer}>
        
        <View style={styles.buttongroup}>
          <Button
            title={<CustomTitleWorkout />}
            buttonStyle={styles.button1}
            onPress={() => {
              props.navigation.navigate('Add Exercises');
            }}></Button>
          <Button
            title={<CustomTitleAddMeas />}
            buttonStyle={styles.button2}
            onPress={() => {
              props.navigation.navigate('Add measurements', { person: person});
            }}></Button>
        </View>
        <View style={styles.buttongroup}>
          <Button
            title={<CustomTitleWorkoutHistory />}
            buttonStyle={styles.button3}
            onPress={() => {
              props.navigation.navigate('Workout History', {personId: personId});
            }}></Button>
          <Button
            title={<CustomTitleMeasHistory />}
            buttonStyle={styles.button4}
            onPress={() => {
              props.navigation.navigate('All recorded measurements', { person: person});
            }}></Button>
        </View>
        <NavButtons params={props} />
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
    width:'100%'
  },
  image: {
    flex: 1,
    justifyContent: 'flex-start',
    alignSelf: 'center',
    height: '95%',
    width:Dimensions.get('window').width,

  },
  top: {
    flex: 2,
    alignItems: 'center',
    
    
  },
  motivation: {
    flex: 2,
    justifyContent: 'flex-start',
    paddingLeft: 20,
    paddingRight: 20,
  },

  buttonContainer: {
    flex: 3,
  },
  buttongroup: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  button1: {
    width: 150,
    height: 170,
    backgroundColor: '#4C40E6',
    borderColor: 'transparent',
    borderRadius: 20,
    margin: 5,
  },
  button2: {
    width: 150,
    height: 170,
    backgroundColor: '#7640E6',
    borderColor: 'transparent',
    borderRadius: 20,
    margin: 5,
  },
  button3: {
    width: 150,
    height: 170,
    backgroundColor: '#9F40E6',
    borderColor: 'transparent',
    borderRadius: 20,
    margin: 5,
  },
  button4: {
    width: 150,
    height: 170,
    backgroundColor: '#C940E6',
    borderColor: 'transparent',
    borderRadius: 20,
    margin: 5,
  },
});

export default ViewStart;
