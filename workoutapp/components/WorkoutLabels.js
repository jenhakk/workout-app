import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Card, Text, Input } from '@rneui/themed';
import NavButtons from './NavButtons';

const WorkoutLabels = () => {
  // for measurement labels
  const [labels, setLabels] = useState([
    'set 1',
    'set 2',
    'set 3',
  ]);
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
        {/* wraps whole chart (chart headers and array) */}
        <View>
          <View style={styles.listContainer}>
            <View>
              <Text> </Text>
              <View style={styles.listLabels}>
                <Text style={{marginBottom:15}}>set 1</Text>
                <Text style={{marginBottom:15}}>set 2</Text>
                <Text style={{marginBottom:15}}>set 3</Text>
              </View>
            </View>
            <View>
              <Text>Weights</Text>
              <View style={styles.list}>
              <Input inputContainerStyle={styles.inputStyle} inputStyle={{fontSize: 12, marginTop: 8}} placeholder="wei..." /> 
                <Input inputContainerStyle={styles.inputStyle} inputStyle={{fontSize: 12,marginTop: 8}} placeholder="wei..." /> 
                <Input inputContainerStyle={styles.inputStyle} inputStyle={{fontSize: 12,marginTop: 8}} placeholder="wei..." /> 
              </View>
            </View>

            <View>
              <Text>Reps</Text>
              <View style={styles.list}>
                <Input inputContainerStyle={styles.inputStyle} style={{ fontSize: 12,marginTop: 8 }} placeholder="rep..." />
                <Input inputContainerStyle={styles.inputStyle} style={{ fontSize: 12,marginTop: 8 }} placeholder="rep..." />
                <Input inputContainerStyle={styles.inputStyle} style={{ fontSize: 12,marginTop: 8 }} placeholder="rep..." />
              </View>
            </View>

            <View>
              <Text>Duration</Text>
              <View style={styles.list}>
                <Input inputContainerStyle={styles.inputStyle} style={{ fontSize: 12,marginTop: 8 }} placeholder="dur..." />
                <Input inputContainerStyle={styles.inputStyle} style={{ fontSize: 12,marginTop: 8 }} placeholder="dur..." />
                <Input inputContainerStyle={styles.inputStyle} style={{ fontSize: 12,marginTop: 8 }} placeholder="dur..." />
              </View>
            </View>
          </View>
        </View>
      </View>

    </>
  );
};

const styles = StyleSheet.create({
  containerAll: {
    width: '100%',
    alignSelf: 'center',
    height: '60%',
    marginTop: 20,
    backgroundColor: 'grey',
  },
  listContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: 'lightgreen',
  },
  listLabels: {
    flexDirection: 'column',
    paddingVertical: 3,
    paddingHorizontal: 10,
    backgroundColor: 'pink',
  },
  list: {
    flexDirection: 'column',
    padding: 4,
    borderWidth: 1,
    backgroundColor: 'lightblue',
  },
  inputStyle: {
    width: 40,
    height: 8,
    borderBottomWidth:0,
  }
});

export default WorkoutLabels;