import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Card, Text} from '@rneui/themed';

const MeasLabels = () => {
  // for measurement labels
  const [labels, setLabels] = useState([
    'Weight',
    'Chest',
    'Bicep',
    'Waist',
    'Hip',
    'Thigh',
  ]);

  const keyHandler = (item, index) => {
    return index.toString();
  };

  return (
    <FlatList
      data={labels}
      keyExtractor={keyHandler}
      renderItem={(item, index) => {
        return (
          <View>
            <Text style={styles.measLabels}>{item.item}:</Text>
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  measLabels: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'normal',
    paddingBottom: 40,
  },
});

export default MeasLabels;
