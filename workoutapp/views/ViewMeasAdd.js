import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Button, Text, Input} from '@rneui/base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavButtons from '../components/NavButtons';
import MeasLabels from '../components/MeasLabels';
import {getCurrentDate} from '../components/Date.js';

const ViewMeasAdd = props => {
  // for person data
  const [person, setPerson] = useState(
    props.route.params == undefined ? '' : props.route.params.person,
  );

  // for measurement inputs
  const [weight, setWeight] = useState('');
  const [chest, setChest] = useState('');
  const [waist, setWaist] = useState('');
  const [hip, setHip] = useState('');
  const [bicep, setBicep] = useState('');
  const [thigh, setThigh] = useState('');
  const date = getCurrentDate(); 
  const [measList, addMeas] = useState([]);

  // handling data from inputs
  const handleWeight = event => {
    setWeight(event);
  };

  const handleChest = event => {
    setChest(event);
  };

  const handleWaist = event => {
    setWaist(event);
  };

  const handleHip = event => {
    setHip(event);
  };

  const handleBicep = event => {
    setBicep(event);
  };

  const handleThigh = event => {
    setThigh(event);
  };

  // posting data to database and returning the current measurements here for later usage
  const postMeas = async () => {
    try {
      let response = await fetch(
        'http://10.0.2.2:8080/rest/workoutservice/addmeas',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            weight: Number(weight),
            chest: Number(chest),
            waist: Number(waist),
            hip: Number(hip),
            bicep: Number(bicep),
            thigh: Number(thigh),
            date: date,
            personid: person[0].personid,
          }),
        },
      );

      let responseData = await response.json();
      //await addMeas(measList => [...measList, responseData]);

      // responseData is set in the array, so it's possible to handle it as such.
      var list = [responseData];

      // now that response we got from database is in the list, it is in two arrays, like so [[{}]]. 
      // to get the very last (or the most recent) row from the database, we'll remove everything else. Note that pop() removes everything than the last item.
      var arr = list.pop();
      var lastMeas = arr.pop();
      
      clearData();
      // forwarding added measurements to summary view
      props.navigation.navigate('Your measurements', {meas: lastMeas});


    } catch (error) {
      console.log(error);
    }
  };

  const clearData = () => {
    setWeight('');
    setChest('');
    setWaist('');
    setHip('');
    setBicep('');
    setThigh('');
  };

  return (
    // wraps everything, is there for bottom navbar
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {/* wraps whole form */}
      <View style={styles.measContainerAll}>
        <Text style={styles.measHeader}>Fill in your measurements:</Text>
        <Text style={styles.measDate}>{getCurrentDate()}</Text>

        {/* wraps input area (labels and inputs) */}
        <View style={styles.measContainerList}>
          {/* wraps labels */}
          <View style={styles.measWrapLists}>
            <MeasLabels />
          </View>

          {/* wraps inputs */}
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
              value={'' + bicep}
              onChangeText={handleBicep}
              placeholder="Bicep"
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
        <Button
          buttonStyle={styles.measButton}
          title="ADD MEASUREMENTS"
          onPress={() => {
            {
              postMeas();
            }
          }}
        />
      </View>
      <NavButtons params={props} />
    </View>
  );
};

const styles = StyleSheet.create({
  measContainerAll: {
    width: '85%',
    alignSelf: 'center',
    marginVertical: 30,
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 30,
    backgroundColor: '#ebebeb',
  },
  measHeader: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'normal',
  },
  measDate: {
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 18,
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
