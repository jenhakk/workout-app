import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Card, Text} from '@rneui/themed';

const PersonLabels = () => {
  // for measurement labels
  const [labels, setLabels] = useState([
    'Firstname',
    'Lastname',
    'Height',
    'Location',
    'Slogan',
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
            <Text style={styles.personLabels}>{item.item}:</Text>
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  personLabels: {
    fontSize: 17,
    fontWeight: 'normal',
    paddingTop:5,
    paddingBottom: 35,
    color:'#9F40E6',
    fontFamily:'OpenSans-SemiBold',
  },
});

export default PersonLabels;