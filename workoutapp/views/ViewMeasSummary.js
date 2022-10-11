import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, ImageBackground} from 'react-native';
import {Button, Text, Icon} from '@rneui/base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavButtons from '../components/NavButtons';
import MeasLabels from '../components/MeasLabels';
import {getCurrentDate} from '../components/Date.js';

const ViewMeasSummary = props => {
  // received measurements from ViewMeasAdd.js
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

  // when the view renders (only once), measurement states receive values from array we get navigated as props
  useEffect(() => {
    {
      props.navigation.setOptions({
        headerRight: () => (
          <Icon
            name="head-question"
            type="material-community"
            color="rgba(92, 99,216, 1)"
            size={25}
            onPress={() => props.navigation.navigate('Instructions')}
          />
        ),
      });
    }

    setWeight(meas[0].weight);
    setChest(meas[0].chest);
    setWaist(meas[0].waist);
    setHip(meas[0].hip);
    setBicep(meas[0].bicep);
    setThigh(meas[0].thigh);
  }, []);

  return (
    // wraps everything on the view, is there for bottom navbar
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../assets/imageback.png')}
        resizeMode="cover"
        style={styles.image}>
        {/* wraps the whole form */}
        <View style={styles.measContainerAll}>
          <Text style={styles.measHeader}>Measurements:</Text>
          <Text style={styles.measDate}>{getCurrentDate()}</Text>

          {/* wraps input area (both labels and inputs) */}
          <View style={styles.measForm}>
            {/* wraps just labels */}
            <View style={styles.measFormComps}>
              <MeasLabels />
            </View>
            {/* wraps measurement values in text components */}
            <View style={styles.measFormComps}>
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

      {/* wraps bottom navbar */}
      <View
        style={{height: 50, position: 'absolute', bottom: 0, width: '100%'}}>
        <NavButtons params={props} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  measContainerAll: {
    width: '85%',
    alignSelf: 'center',
    marginVertical: 20,
    paddingVertical: 10,
    paddingHorizontal: 45,
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
