import {Icon} from '@rneui/themed';
import { React, useState, useEffect } from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const NavButtons = ({params}) => {
const LOCAL_ADDRESS = 'http://10.0.2.2:8080';
const SERVICE_ADDRESS = LOCAL_ADDRESS;
const [personId, setPersonId] = useState();
const [isLoading, setLoading] = useState(true);

useEffect(() => {
 
  if (isLoading) {
    // Fetching person information at first render
      fetchPerson();
      setLoading(false);
  }
}, [])


    //Fetching person id from database to send forward to other Views
  //Setting all person information to personList
  //Setting just persons id to personId > Used in ViewWorkoutHistory
  const fetchPerson = async () => {
    try {
      let response = await fetch(
        SERVICE_ADDRESS + '/rest/workoutservice/readperson',
      );
      let json = await response.json();

      setPersonId(json[0].personid);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.navbuttonstyle}>
      <Icon
        name="weight-lifter"
        type="material-community"
        color="rgba(92, 99,216, 1)"
        size={35}
        onPress={() => params.navigation.navigate('Add Exercises' , { personId: personId})}
      />

      <Icon
        name="home"
        type="material-community"
        color="rgba(92, 99,216, 1)"
        size={40}
        onPress={() => params.navigation.navigate('Home')}
      />

      <Icon
        name="account"
        type="material-community"
        color="rgba(92, 99,216, 1)"
        size={40}
        onPress={() => params.navigation.navigate('Profile')}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  navbuttonstyle: {
    flex: 2,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-around',
    
  },
});
export default NavButtons;
