import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Button, Text, Input} from '@rneui/base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavButtons from '../components/NavButtons';

const ViewMeasAdd = props => {
  // for measurement inputs
  const [weight, setWeight] = useState('');
  const [chest, setChest] = useState('');
  const [bicep, setBicep] = useState('');
  const [waist, setWaist] = useState('');
  const [hip, setHip] = useState('');
  const [thigh, setThigh] = useState('');

  // for measurement labels
  const [measLabels, setLabels] = useState([
    'Weight',
    'Chest',
    'Bicep',
    'Waist',
    'Hip',
    'Thigh',
  ]);

  // handling data from inputs
  const handleWeight = event => {
    setWeight(event);
  };

  const handleChest = event => {
    setChest(event);
  };

  const handleBicep = event => {
    setBicep(event);
  };
  const handleWaist = event => {
    setWaist(event);
  };
  const handleHip = event => {
    setHip(event);
  };
  const handleThigh = event => {
    setThigh(event);
  };

  // for later usage
  // const addMeasToList = () => {
  //   setMeas(meas => [
  //     ...meas,
  //     {
  //       id: 1,
  //       weight: weight,
  //       chest: chest,
  //       bicep: bicep,
  //       waist: waist,
  //       hip: hip,
  //       thigh: thigh,
  //     },
  //   ]);
  //   setWeight('');
  //   setChest('');
  //   setBicep('');
  //   setWaist('');
  //   setHip('');
  //   setThigh('');
  // };

  const keyHandler = (item, index) => {
    return index.toString();
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.measContainerAll}>
        <Text style={styles.measHeader}>Fill in your measurements:</Text>

        <View style={styles.measContainerList}>
          <View style={styles.measWrapLists}>
            <FlatList
              data={measLabels}
              keyExtractor={keyHandler}
              renderItem={(item, index) => {
                return (
                  <View>
                    <Text style={styles.measLabels}>{item.item}:</Text>
                  </View>
                );
              }}
            />
          </View>
          <View style={styles.measWrapLists}>
            <Input
              inputContainerStyle={styles.measInput}
              inputStyle={styles.measInputText}
              value={'' + weight}
              onChangeText={handleWeight}
              placeholder="Weight"
            />
            <Input
              inputContainerStyle={styles.measInput}
              inputStyle={styles.measInputText}
              value={'' + chest}
              onChangeText={handleChest}
              placeholder="Chest"
            />
            <Input
              inputContainerStyle={styles.measInput}
              inputStyle={styles.measInputText}
              value={'' + bicep}
              onChangeText={handleBicep}
              placeholder="Bicep"
            />
            <Input
              inputContainerStyle={styles.measInput}
              inputStyle={styles.measInputText}
              value={'' + waist}
              onChangeText={handleWaist}
              placeholder="Waist"
            />
            <Input
              inputContainerStyle={styles.measInput}
              inputStyle={styles.measInputText}
              value={'' + hip}
              onChangeText={handleHip}
              placeholder="Hip"
            />
            <Input
              inputContainerStyle={styles.measInput}
              inputStyle={styles.measInputText}
              value={'' + thigh}
              onChangeText={handleThigh}
              placeholder="Thigh"
            />
          </View>
        </View>
        <Button buttonStyle={styles.measButton} title="ADD MEASUREMENTS" />
      </View>
      <NavButtons params={props} />
    </View>
  );
};

const styles = StyleSheet.create({
  measContainerAll: {
    width: '85%',
    alignSelf: 'center',
    marginVertical: 35,
    paddingVertical: 30,
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
    marginBottom: 10,
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
    width: 65,
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
