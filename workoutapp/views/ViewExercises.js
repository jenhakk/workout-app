import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, Image} from 'react-native';
import {Card, Text, ListItem, Avatar} from '@rneui/themed';


const ViexExercises = props => {
  const [exerciseList, setExercise] = useState([
    {id:1, name: 'Biceps curl', avatar_url: require('../assets/bicepturn.png'),checked:false},
    {id:2, name: 'Weight lift', avatar_url: require('../assets/weightlift.png'),checked:false}
  ]);

  keyExtractor = (item, index) => index.toString();

  const [check, setChecked] = useState(true);
  const [id, setId] = useState(0);
  const [exerciseToUpdate, updateExercise] =useState();


  const updateItem = (index) => {
    setId(index);
    updateExercise(exerciseList[index]);
    exerciseList[id].checked = !exerciseList[id].checked;
    setExercise(exerciseList);
    console.log(exerciseList[id].checked);
  }

  renderItem = ({item, index}) => (
    <ListItem bottomDivider>
      <Avatar
        source={item.avatar_url}
      />
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
      </ListItem.Content>
      <ListItem.CheckBox 
      checked={item.checked}
      uncheckedColor='#F00'
      checkedColor='#0F0'
      onPress={() => updateItem(index)}
      />
    </ListItem>
  );

  return (
    <View style={styles.container}>
       
      <View style={styles.flatlist}>
      <FlatList
      keyExtractor={keyExtractor}
      data={exerciseList}
      renderItem={renderItem}
    />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatlist: {},
});

export default ViexExercises;
