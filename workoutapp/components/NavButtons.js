import {Icon} from '@rneui/themed';
import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const NavButtons = ({params}) => {
  return (
    <View style={styles.navbuttonstyle}>
      <Icon
        name="weight-lifter"
        type="material-community"
        color="rgba(92, 99,216, 1)"
        size={35}
        // onPress={() => params.navigation.navigate('')}
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
