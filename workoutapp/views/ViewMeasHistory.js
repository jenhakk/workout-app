import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  array,
} from 'react-native';
import {Button, Text, Input, Card, Divider, FAB, ListItem} from '@rneui/base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavButtons from '../components/NavButtons';
import MeasLabels from '../components/MeasLabels';
import {CardDivider} from '@rneui/base/dist/Card/Card.Divider';
import {TabItem} from '@rneui/base/dist/Tab/Tab.Item';
import {getCurrentDate} from '../components/Date.js';
import {ListItemInput} from '@rneui/base/dist/ListItem/ListItem.Input';

const ViewMeasHistory = props => {
  // --- STATES AND VARIABLES ---
  const LOCAL_ADDRESS = 'http://10.0.2.2:8080';
  const SERVICE_ADDRESS = LOCAL_ADDRESS;

  // gets person data from viewperson
  const [person, setPerson] = useState(
    props.route.params == undefined ? '' : props.route.params.person,
  );

  // gets the whole measurement data from database
  const [meas, setMeas] = useState([]);
  const measArr = [];

  // labels of measurement array
  const [measLabels, setLabels] = useState([
    'Weight',
    'Chest',
    'Waist',
    'Hip',
    'Bicep',
    'Thigh',
  ]);

  // --- USEEFFECT ---
  // reads the database once when the page renders and calls functions to extract third latest rows from it
  useEffect(() => {
    fetchMeas();
  }, [meas]);

  // --- FETCH ---
  // // reads measurements from database
  async function fetchMeas() {
    try {
      const response = await fetch(
        SERVICE_ADDRESS + '/rest/workoutservice/readlastthree',
      );
      const responseData = await response.json();
      setMeas(responseData);
    } catch (error) {
      console.log(error);
    }
  }

  // --- FUNCTIONS TO LIST VALUES ---
  const keyHandler = (item, index) => {
    return index.toString();
  };

  return (
    // wraps everything, is there for bottom navbar
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View>
        <Text style={styles.measHeader}>Fill in your measurements:</Text>
        <Text style={styles.measDate}>{getCurrentDate()}</Text>

        <View style={styles.measArr}>
          <View style={{flexDirection: 'row'}}>
            <FlatList
              style={{marginTop: 30}}
              data={measLabels}
              keyExtractor={keyHandler}
              renderItem={({item, index}) => {
                return (
                  <View>
                    <Text style={styles.arrLabel}>{item}</Text>
                  </View>
                );
              }}
            />

            <View style={{flexDirection: 'column'}}>
              <FlatList
                data={meas}
                keyExtractor={keyHandler}
                horizontal={true}
                renderItem={({item, index}) => {
                  return (
                    <View>
                      <Text style={styles.arrDate}>{item.date}</Text>
                    </View>
                  );
                }}
              />

              <FlatList
                data={meas}
                keyExtractor={keyHandler}
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
        <View>
          <Button
            buttonStyle={styles.measButton}
            title="ADD A NEW MEASUREMENT"
            onPress={() => {
              props.navigation.navigate('Add measurements', {person: person});
            }}
          />
        </View>
      </View>

      <NavButtons params={props} />
    </View>
  );
};

const styles = StyleSheet.create({
  measContainerAll: {
    marginTop: 20,
  },
  measHeader: {
    textAlign: 'center',
    marginTop: 20,
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
  measArr: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 50,
  },
  arrLabel: {
    width: 60,
    padding: 5,
    height: 31,
  },
  arrDate: {
    width: 100,
    textAlign: 'center',
    fontSize: 15,
    paddingVertical: 5,
  },
  arrValue: {
    width: 100,
    padding: 5,
    borderWidth: 1,
  },
  measButton: {
    width: '50%',
    marginBottom: 160,
    alignSelf: 'center',
    borderRadius: 10,
  },  
});

export default ViewMeasHistory;
