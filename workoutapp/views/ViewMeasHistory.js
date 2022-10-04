import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {Button, Text, Input, Card, Divider, FAB} from '@rneui/base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavButtons from '../components/NavButtons';
import MeasLabels from '../components/MeasLabels';
import {CardDivider} from '@rneui/base/dist/Card/Card.Divider';
import {TabItem} from '@rneui/base/dist/Tab/Tab.Item';

const ViewMeasHistory = props => {
  const [visible, setVisible] = React.useState(true);

  //This is for getting person data from viewperson
  const [person, setPerson] = useState(
    props.route.params == undefined ? '' : props.route.params.person,
  );

  console.log('PERSON in meashistory ', person[0].personid);

  const [measListValues, setValues] = useState([1, 22, 34, 555, 2, 98]);
  const [measListLabels, setLabels] = useState([
    'Weight',
    'Chest',
    'Bicep',
    'Waist',
    'Hip',
    'Thigh',
  ]);

//   useEffect(() => {
//     setPerson(person[0].personid);
// }, [])

  const keyHandler = (item, index) => {
    return index.toString();
  };

  const renderValues = (item, index) => {
    return (
      <View key={index}>
        <Text>{item.item}</Text>
      </View>
    );
  };

  return (
    // wraps everything, is there for bottom navbar
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {/* wraps whole page */}
      <View style={styles.measContainerAll}>
        {/* wraps whole chart (chart headers and array) */}
        <View>
          <View style={styles.measListContainer}>
            <View>
              <Text> </Text>
              <View style={styles.measListLabels}>
                <FlatList
                  data={measListLabels}
                  keyExtractor={keyHandler}
                  renderItem={renderValues}
                />
              </View>
            </View>
            <View>
              <Text>29.9.2022</Text>
              <View style={styles.measList}>
                <FlatList
                  data={measListValues}
                  keyExtractor={keyHandler}
                  renderItem={renderValues}
                />
              </View>
            </View>

            <View>
              <Text>30.9.2022</Text>
              <View style={styles.measList}>
                <FlatList
                  data={measListValues}
                  keyExtractor={keyHandler}
                  renderItem={renderValues}
                />
              </View>
            </View>

            <View>
              <Text>1.10.2022</Text>
              <View style={styles.measList}>
                <FlatList
                  data={measListValues}
                  keyExtractor={keyHandler}
                  renderItem={renderValues}
                />
              </View>
            </View>
          </View>
        </View>
      </View>

      <FAB
        visible={visible}
        icon={{name: 'add', color: 'white'}}
        color="#7640E6"
        style={styles.measFAB}
        onPress={() => { props.navigation.navigate('Add measurements', { person: person })}}
      />
      <NavButtons params={props} />
    </View>
  );
};

const styles = StyleSheet.create({
  measContainerAll: {
    width: '85%',
    alignSelf: 'center',

    marginTop: 20,
  },
  measListContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  measListLabels: {
    flexDirection: 'column',
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  measList: {
    flexDirection: 'column',
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderWidth: 1,
  },
  measFAB: {},
});

export default ViewMeasHistory;
