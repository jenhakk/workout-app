import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, ImageBackground} from 'react-native';
import {Button, Text, Input} from '@rneui/base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavButtons from '../components/NavButtons';
import MeasLabels from '../components/MeasLabels';
import {getCurrentDate} from '../components/Date.js';

const ViewMeasSummary = props => {
  // received measurements
  const [meas, setMeas] = useState(
    props.route.params == undefined ? '' : props.route.params.meas,
  );

  // for individual measurement placements
  const [weight, setWeight] = useState();
  const [chest, setChest] = useState();
  const [waist, setWaist] = useState();
  const [hip, setHip] = useState();
  const [bicep, setBicep] = useState();
  const [thigh, setThigh] = useState();

  // places received measurements immeadiately to states after page has rendered
  useEffect(() => {
    setWeight(meas.weight);
    setChest(meas.chest);
    setWaist(meas.waist);
    setHip(meas.hip);
    setBicep(meas.bicep);
    setThigh(meas.thigh);
  }, []);

  return (
    // wraps everything, is there for bottom navbar
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../assets/imageback.png')}
        resizeMode="cover"
        style={styles.image}>
        {/* wraps whole form */}
        <View style={styles.measContainerAll}>
          <Text style={styles.measHeader}>Measurements:</Text>
          <Text style={styles.measDate}>{getCurrentDate()}</Text>

          {/* wraps input area (labels and inputs) */}
          <View style={styles.measContainerList}>
            {/* wraps labels */}
            <View style={styles.measWrapLists}>
              <MeasLabels />
            </View>
            {/* wraps measurement values in text components */}
            <View style={styles.measWrapLists}>
              <Text style={styles.measValues}>{weight} kg</Text>
              <Text style={styles.measValues}>{chest} cm</Text>
              <Text style={styles.measValues}>{waist} cm</Text>
              <Text style={styles.measValues}>{hip} cm</Text>
              <Text style={styles.measValues}>{bicep} cm</Text>
              <Text style={styles.measValues}>{thigh} cm</Text>
            </View>
          </View>
          <Button
            buttonStyle={styles.measButton}
            title="VIEW HISTORY"
            onPress={() => {
              props.navigation.navigate('All recorded measurements');
            }}
          />
        </View>
      </ImageBackground>
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
    paddingHorizontal: 45,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  measHeader: {
    textAlign: 'center',
    marginVertical: 20,
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
  measValues: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'normal',
    paddingBottom: 40,
  },
  measButton: {
    width: '55%',
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 5,
  },
});

export default ViewMeasSummary;
