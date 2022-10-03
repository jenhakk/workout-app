import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {Button, Text, Input, Card, Divider, FAB} from '@rneui/base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavButtons from '../components/NavButtons';
import MeasLabels from '../components/MeasLabels';
import {CardDivider} from '@rneui/base/dist/Card/Card.Divider';

const ViewMeasHistory = props => {
  const [visible, setVisible] = React.useState(true);

  //This is for getting person data from viewperson
  const [person, setPerson] = useState(props.route.params == undefined ? "" : props.route.params.person);
  console.log("PERSON in meashistory ",person[0].personid);
  return (
    // wraps everything, is there for bottom navbar
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {/* wraps whole form */}
      <View style={styles.measContainerAll}>
        
      </View>
      <FAB
        visible={visible}
        icon={{name: 'add', color: 'white'}}
        color = "#7640E6"
        style = {styles.measFAB}
      />
      <NavButtons params={props} />
    </View>
  );
};

const styles = StyleSheet.create({
  measContainerAll: {
    width: '85%',
    alignSelf: 'center',
    marginTop: 20,
  },
  measFAB: {

  },
});

export default ViewMeasHistory;
