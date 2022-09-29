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
    <View style={styles.measContainer}>
      <View style={styles.measWrapLists}>
        <FlatList
          data={meas}
          keyExtractor={keyHandler}
          renderItem={item => {
            return (
              <View>
                <Text style={styles.measLabels}>
                  {item.index + 1}. {item.item}:
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
      <NavButtons params={props}/>
    </View>
  );
};

const styles = StyleSheet.create({
  measContainer: {
    marginVertical: 40,
    width: '80%',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  measWrapLists: {
    flexDirection: 'column',
  },
  measLabels: {
    color: 'grey',
    fontSize: 16,
    fontWeight: 'normal',
    paddingBottom: 40,
  },
  measInput: {
    width: 100,
    height: 35,
  },
  measInputText: {
    fontSize: 16,
  },
});

export default ViewMeasAdd;
