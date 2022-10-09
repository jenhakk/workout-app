import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, ImageBackground} from 'react-native';
import {Button, Text, Input} from '@rneui/base';
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

  // labels of measurement array
  const [measLabels, setLabels] = useState([
    'Weight',
    'Chest',
    'Waist',
    'Hip',
    'Bicep',
    'Thigh',
  ]);

  const [hiphei, setHiphei] = useState(1);
  const [message, setMessage] = useState([]);
  const [visibility, setVisible] = useState(true);

  // --- USEEFFECT ---
  // reads the database once when the page renders and calls functions to extract third latest rows from it
  useEffect(() => {
    if (meas.length === 0) {
      setVisible(false);
      setMessage('No measurements added.');
    } else {
      setVisible(true);
      setMessage('');
    }

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

  return (
    // wraps everything, is there for bottom navbar
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../assets/imageback.png')}
        resizeMode="cover"
        style={styles.image}>
        <View style ={styles.measContainerAll}>
          <Text style={styles.measHeader}>Fill in your measurements:</Text>
          <Text style={styles.measDate}>{getCurrentDate()}</Text>

          <View style={styles.measArr}>
            <View style={{flexDirection: 'row'}}>
              <View style={{marginTop: 31.5}}>
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

              <View style={{flexDirection: 'column'}}>
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
        <View style={{height:50,position:'absolute', bottom:0, width:'100%' }}>
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
    width: '50%',
    marginBottom: 50,
    alignSelf: 'center',
    borderRadius: 10,
  },
});

export default ViewMeasHistory;
