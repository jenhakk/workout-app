import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Button, Text, Input, Card, Divider, FAB} from '@rneui/base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavButtons from '../components/NavButtons';
import MeasLabels from '../components/MeasLabels';
import {CardDivider} from '@rneui/base/dist/Card/Card.Divider';
import {TabItem} from '@rneui/base/dist/Tab/Tab.Item';
import {getCurrentDate} from '../components/Date.js';

const ViewMeasHistory = props => {
  // --- STATES AND VARIABLES ---
  const LOCAL_ADDRESS = 'http://10.0.2.2:8080';
  const SERVICE_ADDRESS = LOCAL_ADDRESS;
  const [visible, setVisible] = useState(true);

  // gets person data from viewperson
  const [person, setPerson] = useState(
    props.route.params == undefined ? '' : props.route.params.person,
  );

  // gets the whole measurement data from database
  const [meas, setMeas] = useState([]);

  // gets the last object from database
  const [measFirstCol, setFirstCol] = useState([]);

  // gets the second last object from database
  const [measSecondCol, setSecondCol] = useState([]);

  // gets the third last object from database
  const [measThirdCol, setThirdCol] = useState([]);

  // labels of measurement array
  const [measListLabels, setLabels] = useState([
    'Weight',
    'Chest',
    'Bicep',
    'Waist',
    'Hip',
    'Thigh',
  ]);

  // --- USEEFFECT ---
  // reads the database once when the page renders and calls functions to extract third latest rows from it
  useEffect(() => {
    fetchMeas(person[0].personid);
    getLastMeas(meas);
    getSecondLastMeas(meas);
    getThirdLastMeas(meas);
  }, []);

  // --- FETCH ---
  // reads measurements from database
  const fetchMeas = async () => {
    try {
      let response = await fetch(
        SERVICE_ADDRESS + '/rest/workoutservice/readmeas/' + person[0].personid,
      );
      let json = await response.json();
      setMeas(json);
    } catch (error) {
      console.log(error);
    }
  };

  // --- FUNCTIONS TO EXTRACT WANTED MEAS ---
  // returns the last measurement on the array read from database.
  const getLastMeas = meas => {
    var last = meas[meas.length - 1];
    setFirstCol(last);
  };

  // returns the second last measurement on the array read from database.
  const getSecondLastMeas = (meas) => {
    var secondLast = meas[meas.length - 2];
    setSecondCol(secondLast);
  };

  // returns the third last measurement on the array read from database.
  const getThirdLastMeas = (meas) => {
    var thirdLast = meas[meas.length - 3];
    setThirdCol(thirdLast);
  };

  // --- FUNCTIONS TO LIST VALUES ---
  const keyHandler = (item, index) => {
    return index.toString();
  };

  const renderLabels = (item, index) => {
    return (
      <View key={index} style={styles.measListLabels}>
        <Text style={styles.measListHeaders}>{item.item}</Text>
      </View>
    );
  };

  console.log('1. COL ', measFirstCol);
  console.log('2. COL ', measSecondCol);
  console.log('3. COL ', measThirdCol);

  return (
    // wraps everything, is there for bottom navbar
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {/* wraps whole page */}
      <View style={styles.measContainerAll}>
        {/* wraps header */}
        <View>
          <Text style={styles.measHeader}>View your latest measurements</Text>
          <Text style={styles.measDate}>{getCurrentDate()}</Text>
        </View>

        {/* wraps whole chart (chart headers and array) */}
        <View style={styles.measListContainer}>
          {/* wraps the first column */}
          <View>
            <Text> </Text>
            <View style={styles.measLabels}>
              <FlatList
                data={measListLabels}
                keyExtractor={keyHandler}
                renderItem={renderLabels}
              />
            </View>
          </View>

          {/* wraps the second column */}
          <TouchableOpacity activeOpacity={0.6}>
            <View>
              <Text style={styles.measListHeaders}>29.9.2022</Text>
              <View style={styles.measValues}>
              
              </View>
            </View>
          </TouchableOpacity>

          {/* wraps the third column */}
          <TouchableOpacity activeOpacity={0.6}>
            <View>
              <Text style={styles.measListHeaders}>30.9.2022</Text>
              <View style={styles.measValues}>
                
              </View>
            </View>
          </TouchableOpacity>

          {/* wraps the fourth column */}
          <TouchableOpacity activeOpacity={0.6}>
            <View>
              <Text style={styles.measListHeaders}>1.10.2022</Text>
              <View style={styles.measValues}>
               
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <FAB
        visible={visible}
        icon={{name: 'add', color: 'white'}}
        color="#7640E6"
        style={styles.measFAB}
        onPress={() => {
          props.navigation.navigate('Add measurements', {person: person});
        }}
      />
      <NavButtons params={props} />
    </View>
  );
};

const styles = StyleSheet.create({
  measContainerAll: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },
  measListContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  measHeader: {
    textAlign: 'center',
    marginTop: 15,
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
  measLabels: {
    flexDirection: 'column',
    width: 60,
    marginRight: 8,
  },
  measValues: {
    flexDirection: 'column',
    width: 85,
    marginBottom: 250,
    borderWidth: 1,
  },
  measListHeaders: {
    fontSize: 16,
  },
  measListLabels: {
    height: 30,
    padding: 5,
  },
  measListValues: {
    height: 30,
    padding: 5,
    borderBottomWidth: 1,
    backgroundColor: '#ebebeb',
  },
  measFAB: {},
});

export default ViewMeasHistory;
