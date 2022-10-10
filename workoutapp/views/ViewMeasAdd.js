import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, ImageBackground} from 'react-native';
import {Button, Text, Input} from '@rneui/base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavButtons from '../components/NavButtons';
import MeasLabels from '../components/MeasLabels';
import {getCurrentDate} from '../components/Date.js';

const ViewMeasAdd = props => {
  // for person data (comes from ViewPerson, ViewStart, ViewMeasHistory)
  const [person, setPerson] = useState(
    props.route.params == undefined ? '' : props.route.params.person,
  );

  // for adding measurement inputs
  const [weight, setWeight] = useState('');
  const [chest, setChest] = useState('');
  const [waist, setWaist] = useState('');
  const [hip, setHip] = useState('');
  const [bicep, setBicep] = useState('');
  const [thigh, setThigh] = useState('');
  const date = getCurrentDate();

  // for input validation
  let newText = '';
  let numbers = '0123456789';

  // handling data from inputs
  const handleWeight = event => {
    for (var i = 0; i < event.length; i++) {
      if (numbers.indexOf(event[i]) > -1) {
        newText += event[i];
      } else {
        alert('Please enter whole numbers only!');
      }
    }
    setWeight(newText);
  };

  const handleChest = event => {
    for (var i = 0; i < event.length; i++) {
      if (numbers.indexOf(event[i]) > -1) {
        newText += event[i];
      } else {
        alert('Please enter whole numbers only!');
      }
    }
    setChest(newText);
  };

  const handleWaist = event => {
    for (var i = 0; i < event.length; i++) {
      if (numbers.indexOf(event[i]) > -1) {
        newText += event[i];
      } else {
        alert('Please enter whole numbers only!');
      }
    }
    setWaist(newText);
  };

  const handleHip = event => {
    for (var i = 0; i < event.length; i++) {
      if (numbers.indexOf(event[i]) > -1) {
        newText += event[i];
      } else {
        alert('Please enter whole numbers only!');
      }
    }
    setHip(newText);
  };

  const handleBicep = event => {
    for (var i = 0; i < event.length; i++) {
      if (numbers.indexOf(event[i]) > -1) {
        newText += event[i];
      } else {
        alert('Please enter whole numbers only!');
      }
    }
    setBicep(newText);
  };

  const handleThigh = event => {
    for (var i = 0; i < event.length; i++) {
      if (numbers.indexOf(event[i]) > -1) {
        newText += event[i];
      } else {
        alert('Please enter whole numbers only!');
      }
    }
    setThigh(newText);
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

  // clearing data from inputs after inputs have been added to db and before the most recent input has been forwarded to the next page.
  const clearData = () => {
    setWeight('');
    setChest('');
    setWaist('');
    setHip('');
    setBicep('');
    setThigh('');
  };

  return (
    // wraps everything on the view, is there for bottom navbar
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../assets/imageback.png')}
        resizeMode="cover"
        style={styles.image}>
        {/* wraps the whole form */}
        <View style={styles.measContainerAll}>
          <Text style={styles.measHeader}>Fill in your measurements:</Text>
          <Text style={styles.measDate}>{getCurrentDate()}</Text>

          {/* wraps input area (both labels and inputs) */}
          <View style={styles.measForm}>
            {/* wraps just labels */}
            <View style={styles.measFormComps}>
              <MeasLabels />
            </View>

            {/* wraps just inputs */}
            <View style={styles.measFormComps}>
              <Input
                inputContainerStyle={styles.measInput}
                inputStyle={styles.measInputText}
                value={'' + weight}
                keyboardType="numeric"
                maxLength={3}
                onChangeText={text => handleWeight(text)}
                placeholder="Weight"
              />
              <Input
                inputContainerStyle={styles.measInput}
                inputStyle={styles.measInputText}
                value={'' + chest}
                keyboardType="numeric"
                maxLength={3}
                onChangeText={handleChest}
                placeholder="Chest"
              />
              <Input
                inputContainerStyle={styles.measInput}
                inputStyle={styles.measInputText}
                value={'' + waist}
                keyboardType="numeric"
                maxLength={3}
                onChangeText={handleWaist}
                placeholder="Waist"
              />
              <Input
                inputContainerStyle={styles.measInput}
                inputStyle={styles.measInputText}
                value={'' + hip}
                keyboardType="numeric"
                maxLength={3}
                onChangeText={handleHip}
                placeholder="Hip"
              />
              <Input
                inputContainerStyle={styles.measInput}
                inputStyle={styles.measInputText}
                value={'' + bicep}
                keyboardType="numeric"
                maxLength={3}
                onChangeText={handleBicep}
                placeholder="Bicep"
              />
              <Input
                inputContainerStyle={styles.measInput}
                inputStyle={styles.measInputText}
                value={'' + thigh}
                keyboardType="numeric"
                maxLength={3}
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

        {/* wraps bottom navbar */}
        <View
          style={{height: 50, position: 'absolute', bottom: 0, width: '100%'}}>
          <NavButtons params={props} />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  measContainerAll: {
    width: '85%',
    alignSelf: 'center',
    flexDirection: 'column',
    marginVertical: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  image: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  measHeader: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 20,
    fontWeight: 'normal',
  },
  measDate: {
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 18,
    fontWeight: 'normal',
  },
  measForm: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  measFormComps: {
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
    marginVertical: 10,
    borderRadius: 5,
  },
});

export default ViewMeasAdd;
