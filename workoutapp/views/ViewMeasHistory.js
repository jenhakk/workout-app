import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, ImageBackground} from 'react-native';
import {Button, Text} from '@rneui/base';
import {Icon} from '@rneui/themed';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavButtons from '../components/NavButtons';
import MeasLabels from '../components/MeasLabels';
import {CardDivider} from '@rneui/base/dist/Card/Card.Divider';
import {TabItem} from '@rneui/base/dist/Tab/Tab.Item';
import {getCurrentDate} from '../components/Date.js';
import {ListItemInput} from '@rneui/base/dist/ListItem/ListItem.Input';

const ViewMeasHistory = props => {
  // gets person data from ViewPerson.js, ViewStart.js and ViewMeasSummary.js
  const [person, setPerson] = useState(
    props.route.params == undefined ? '' : props.route.params.person,
  );

  // gets the last three measurement rows from database
  const [meas, setMeas] = useState([]);

  // labels of measurement array on the page
  const [measLabels, setLabels] = useState([
    'Weight',
    'Chest',
    'Waist',
    'Hip',
    'Bicep',
    'Thigh',
  ]);

  // the state for message to imply there's no measurement records
  const [message, setMessage] = useState([]);

  // the state, which changes depending on if there's array to show or not. True means that array is on the page, false means there's no array
  const [visibility, setVisible] = useState(true);

  // --- FUNCTIONS ---
  // when the page renders for the first time:
  // -> length of meas state is checked.
  //    -> if meas (array) is empty, visibility state is set false and message state gets text to say, there's no measurements yet.
  //    -> in other case, visibility is set to true and message gets empty value, meaning that there is array showing.
  // after checking meas length and running code depending on it, asyncronous function fetchMeas() is run.
  // the view re-renders when the value of meas state changes
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
    
    if (meas.length === 0) {
      setVisible(false);
      setMessage('No measurements added.');
    } else {
      setVisible(true);
      setMessage('');
    }

    fetchMeas();
  }, [meas]);

  //reads measurements from database and sets data got from there to meas state.
  async function fetchMeas() {
    try {
      let response = await fetch(
        'http://10.0.2.2:8080/rest/workoutservice/readlastthree',
      );
      const responseData = await response.json();

      // sets the last three rows of measurements to array state, so it can be used to display array.
      setMeas(responseData);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    // wraps everything on the view, is there for bottom navbar
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../assets/imageback.png')}
        resizeMode="cover"
        style={styles.image}>
        {/* wraps the whole array, header and date */}
        <View style={styles.measContainerAll}>
          <Text style={styles.measHeader}>Fill in your measurements:</Text>
          <Text style={styles.measDate}>{getCurrentDate()}</Text>

          {/* wraps the whole array */}
          <View style={styles.measArr}>
            {/* wraps the whole array and keeping measurement labels next to array */}
            <View style={{flexDirection: 'row'}}>
              {/* warps the whole array and puts measurement labels on their place next to array */}
              <View style={{marginTop: 31.5}}>
                {/* MEAS LABELS */}
                {visibility && (
                  <View>
                    <Text style={styles.arrLabel}>{measLabels[0]}</Text>
                    <Text style={styles.arrLabel}>{measLabels[1]}</Text>
                    <Text style={styles.arrLabel}>{measLabels[2]}</Text>
                    <Text style={styles.arrLabel}>{measLabels[3]}</Text>
                    <Text style={styles.arrLabel}>{measLabels[4]}</Text>
                    <Text style={styles.arrLabel}>{measLabels[5]}</Text>
                  </View>
                )}
              </View>

              {/* wrap the whole array and sets dates on top of array */}
              <View>
                {/* MEAS DATES on top of the array */}
                <FlatList
                  data={meas}
                  keyExtractor={(item, index) => index.toString()}
                  horizontal={true}
                  renderItem={({item, index}) => {
                    return (
                      <View>
                        <Text style={styles.arrDate}>{item.date}</Text>
                      </View>
                    );
                  }}
                />

                {/* MEAS VALUES */}
                <FlatList
                  data={meas}
                  keyExtractor={(item, index) => index.toString()}
                  horizontal={true}
                  renderItem={({item, index}) => {
                    return (
                      <View>
                        <Text style={styles.arrValue}>{item.weight}</Text>
                        <Text style={styles.arrValue}>{item.chest}</Text>
                        <Text style={styles.arrValue}>{item.waist}</Text>
                        <Text style={styles.arrValue}>{item.hip}</Text>
                        <Text style={styles.arrValue}>{item.bicep}</Text>
                        <Text style={styles.arrValue}>{item.thigh}</Text>
                      </View>
                    );
                  }}
                />
              </View>
            </View>
          </View>

          {/* wraps message state and button */}
          <View>
            <Text style={styles.measMessage}>{message}</Text>
            <Text></Text>
            <Button
              buttonStyle={styles.measButton}
              title="ADD A NEW MEASUREMENT"
              onPress={() => {
                props.navigation.navigate('Add measurements', {person: person});
              }}
            />
          </View>
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
    width: '92%',
    alignSelf: 'center',
    marginVertical: 30,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  image: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  measHeader: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 20,
    fontWeight: 'normal',
  },
  measDate: {
    textAlign: 'center',
    marginBottom: 35,
    fontSize: 18,
    fontWeight: 'normal',
  },
  measMessage: {
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 20,
    fontWeight: 'normal',
  },
  measArr: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 20,
  },
  arrLabel: {
    width: 55,
    padding: 5,
    height: 31,
  },
  arrDate: {
    width: 90,
    textAlign: 'center',
    fontSize: 15,
    paddingVertical: 5,
  },
  arrValue: {
    width: 90,
    padding: 5,
    borderWidth: 1,
  },
  measButton: {
    marginTop: 5,
    backgroundColor: '#9F40E6',
    marginBottom: 20,
    borderRadius: 20,
    width: 200,
    height: 60,
    alignSelf: 'center',
  },
});




export default ViewMeasHistory;
