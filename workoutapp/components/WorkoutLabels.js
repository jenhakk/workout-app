import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Card, Text, Input} from '@rneui/themed';
import NavButtons from './NavButtons';

const WorkoutLabels = () => {
  // for measurement labels
  const [labels, setLabels] = useState(['set 1', 'set 2', 'set 3']);
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
    <>
      {/* wraps whole page */}
      <View style={styles.containerAll}>
        
        {/* Taulukon otsikot */}
        <View style={{width: '100%'}}>
          <View style={{flexDirection: 'row', paddingLeft: 40}}>
            <Text style={{paddingLeft: 20, paddingRight: 25}}>Repeats</Text>
            <Text style={{paddingRight: 25}}>Weights</Text>
            <Text style={{paddingRight: 20}}>Duration</Text>
          </View>
        </View>

        {/* Yhden liikkeen taulukko */}
        <View style={styles.listContainer}>
          <View style={{flexDirection: 'column', width: '50%'}}>
            {/* Yksi rivi */}
            <View style={{width: '60%', flexDirection: 'row'}}>
              {/* Setti */}
              <Text style={{paddingTop: 20, marginRight: 15}}>set 1</Text>
              {/* Inputit toistoille, painoille ja kestolle */}
              <Input
                inputContainerStyle={{flexDirection: 'row', width: 50}}
                inputStyle={{fontSize: 12}}
              />
              <Input
                inputContainerStyle={{flexDirection: 'row', width: 50}}
                inputStyle={{fontSize: 12}}
              />
              <Input
                inputContainerStyle={{flexDirection: 'row', width: 50}}
                inputStyle={{fontSize: 12}}
              />
            </View>

            {/* Uusi rivi ilman otsikoita */}
            <View style={{width: '60%', flexDirection: 'row'}}>
              <Text style={{paddingTop: 20, marginRight: 15}}>set 2</Text>
              <Input
                inputContainerStyle={{flexDirection: 'row', width: 50}}
                inputStyle={{fontSize: 12}}
              />
              <Input
                inputContainerStyle={{flexDirection: 'row', width: 50}}
                inputStyle={{fontSize: 12}}
              />
              <Input
                inputContainerStyle={{flexDirection: 'row', width: 50}}
                inputStyle={{fontSize: 12}}
              />
            </View>

            {/* Uusi rivi ilman otsikoita*/}
            <View style={{width: '60%', flexDirection: 'row'}}>
              <Text style={{paddingTop: 20, marginRight: 15}}>set 3</Text>
              <Input
                inputContainerStyle={{flexDirection: 'row', width: 50}}
                inputStyle={{fontSize: 12}}
              />
              <Input
                inputContainerStyle={{flexDirection: 'row', width: 50}}
                inputStyle={{fontSize: 12}}
              />
              <Input
                inputContainerStyle={{flexDirection: 'row', width: 50}}
                inputStyle={{fontSize: 12}}
              />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  containerAll: {
    width: '50%',
  },
});

export default WorkoutLabels;
