import React, {useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Button, Text, Input} from '@rneui/base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavButtons from '../components/NavButtons';

const ViewMeasAdd = (props) => {
  const [meas, setMeas] = useState([
    'Weight',
    'Chest',
    'Bicep',
    'Waist',
    'Hip',
    'Thigh',
  ]);

  const keyHandler = (item, index) => {
    return index.toString();
  };

  return (
    <View style={styles.measContainerAll}>
      <Text style={styles.measHeader}>Fill in your measurements:</Text>

      <View style={styles.measContainerList}>
        <View style={styles.measWrapLists}>
          <FlatList
            data={meas}
            keyExtractor={keyHandler}
            renderItem={item => {
              return (
                <View>
                  <Text style={styles.measLabels}>
                    {item.item}:
                  </Text>
                </View>
              );
            }}
          />
        </View>
        <View style={styles.wrapMeasLists}>
          <FlatList
            data={meas}
            keyExtractor={keyHandler}
            renderItem={item => {
              return (
                <View>
                  <Input
                    inputContainerStyle={styles.measInput}
                    inputStyle={styles.measInputText}
                    placeholder={item.item}
                  />
                </View>
              );
            }}
          />
        </View>
      </View>
      <Button buttonStyle={styles.measButton} title = 'ADD MEASUREMENTS'></Button>
      <NavButtons params={props}/>
    </View>
  );
};

const styles = StyleSheet.create({
  measContainerAll: {
    width: '85%',
    alignSelf: 'center',
    marginVertical: 60,
    paddingVertical: 40,
    paddingHorizontal: 30,
    borderRadius: 30,
    backgroundColor: '#e0e0e0',

  },
  measHeader: {
    textAlign: 'center',
    marginBottom: 40,
    fontSize: 20,
    fontWeight: 'normal',
  },
  measContainerList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  measWrapLists: {
    flexDirection: 'column',
  },
  measLabels: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'normal',
    paddingBottom: 40,
  },
  measInput: {
    width: 60,
    height: 35,
  },
  measInputText: {
    textAlign: 'right',
    fontSize: 16,
    paddingRight: 10,
    borderBottomColor: 'black',
  },
  measButton: {
    width: '78%',
    alignSelf: 'center',
    borderRadius: 5,
  },
});

export default ViewMeasAdd;
