import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  array,
} from 'react-native';
import {Button, Text, Input, Card, Divider, FAB} from '@rneui/base';
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
  const [meas1, setMeas1] = useState([]);
  const [meas2, setMeas2] = useState([]);
  const [meas3, setMeas3] = useState([]);
  const [valueArr1, setArr1] = useState([]);
  const [valueArr2, setArr2] = useState([]);
  const [valueArr3, setArr3] = useState([]);
  const [index1, setIndex1] = useState('');
  const [index2, setIndex2] = useState('');
  const [index3, setIndex3] = useState('');

  // labels of measurement array
  const [measLabels, setLabels] = useState([
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
    if (meas.length == 0) {
      fetchMeas();
    }

    if (meas.length != 0 && meas1.length == 0) {
      // console.log('Tullaanko tänne?');
      splitData(meas);
    }

    if (meas.length != 0 && meas1.length != 0 && valueArr1.length == 0) {
      // console.log('Tullaanko viimeseen?');
      getValueArr();
    }
  }, [meas, meas1]);

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

  // console.log('DB: ', meas);
  // console.log('MEAS1: ', meas1);
  // console.log('VALUEARR1: ', valueArr1);
  console.log('INDEX1: ', index1);
  console.log('INDEX2: ', index2);
  console.log('INDEX3: ', index3);

  // --- FUNCTIONS TO HANDLE THE FETCHED DATA
  // splitting json to three arrays
  const splitData = meas => {
    console.log('SPLITIN meas ', meas);
    var obj1 = meas[meas.length - 1];
    var obj2 = meas[meas.length - 2];
    var obj3 = meas[meas.length - 3];

    setMeas1(obj1);
    setMeas2(obj2);
    setMeas3(obj3);
  };

  // handling arrays which display the data on the page
  const getValueArr = () => {
    // extracting only values to the arrays
    var values1 = Object.values(meas1);
    var values2 = Object.values(meas2);
    var values3 = Object.values(meas3);

    // extracting only
    var valIndex1 = values1.pop();
    var valIndex2 = values2.pop();
    var valIndex3 = values3.pop();

    setIndex1(valIndex1);
    setIndex2(valIndex2);
    setIndex3(valIndex3);

    // specifying which indexes to remove from the array
    removeValFromIndex = [0, 1, 8];

    // removing the indexes from all three arrays
    for (var i = removeValFromIndex.length - 1; i >= 0; i--) {
      values1.splice(removeValFromIndex[i], 1);
      values2.splice(removeValFromIndex[i], 1);
      values3.splice(removeValFromIndex[i], 1);
    }

    // setting new values to the new array states
    setArr1(values1);
    setArr2(values2);
    setArr3(values3);
  };

  // --- FUNCTIONS TO LIST VALUES ---
  const keyHandler = (item, index) => {
    return index.toString();
  };

  const renderLabels = (item, index) => {
    return (
      <View key={index}>
        <Text>{item.item}</Text>
      </View>
    );
  };

  return (
    // wraps everything, is there for bottom navbar
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.measArrContainer}>
        <View style={styles.measArrDates}>
          <Text> </Text>
          <Text>{index1}</Text>
          <Text>{index2}</Text>
          <Text>{index3}</Text>
        </View>
        <View>
          <View style={styles.measColumns}>
            <FlatList
              data={measLabels}
              keyExtractor={keyHandler}
              renderItem={(item, index) => {
                return <Text>{item.item}</Text>;
              }}
            />
          </View>
          <View style={styles.measColumns}>
            <FlatList
              data={valueArr1}
              keyExtractor={keyHandler}
              renderItem={(item, index) => {
                return <Text>{item.item}</Text>;
              }}
            />
          </View>
          <View style={styles.measColumns}>
            <FlatList
              data={valueArr2}
              keyExtractor={keyHandler}
              renderItem={(item, index) => {
                return <Text>{item.item}</Text>;
              }}
            />
          </View>
          <View style={styles.measColumns}>
            <FlatList
              data={valueArr3}
              keyExtractor={keyHandler}
              renderItem={(item, index) => {
                return <Text>{item.item}</Text>;
              }}
            />
          </View>
        </View>
      </View>
      <Button
        buttonStyle={styles.measButton}
        title="ADD A NEW MEASUREMENT"
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
  measArrContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
    width: '80%',
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
  measArrDates: {
    flexDirection: 'row',
  },
  measColumns: {
    flexDirection: 'column',
  },
  // measLabels: {
  //   width: 60,
  //   marginRight: 8,
  // },
  // measValues: {
  //   width: 85,
  //   marginBottom: 250,
  //   borderWidth: 1,
  // },
  // measListHeaders: {
  //   fontSize: 16,
  // },
  // measListLabels: {
  //   height: 30,
  //   padding: 5,
  // },
  // measListValues: {
  //   height: 30,
  //   padding: 5,
  //   borderBottomWidth: 1,
  //   backgroundColor: '#ebebeb',
  // },
  measButton: {
    width: '65%',
    marginTop: 40,
    alignSelf: 'center',
    borderRadius: 5,
  },
});

export default ViewMeasHistory;
