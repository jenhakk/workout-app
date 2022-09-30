import React, {useState} from 'react';
import {View, StyleSheet, FlatList, Image} from 'react-native';
import {Card, Text, ListItem, Avatar} from '@rneui/themed';


const ViexExercises = props => {
  const [exerciseList, setExercise] = useState([
    {id:1, name: 'Biceps curl', avatar_url: require('../assets/bicepturn.png'),checked:false},
    {id:2, name: 'Weight lift', avatar_url: require('../assets/weightlift.png'),check:false}
  ]);

  keyExtractor = (item, index) => index.toString();

  const [check, setChecked] = useState(false);
  const [id, setId] = useState(0);


  const chooseExercise = (id, checked) => {
    // console.log(exerciseList[id].name);
    // console.log(exerciseList[id].checked);
    setChecked(true);
    console.log(check);
    // setExercise(exerciseList[id].checked = check);
    console.log(exerciseList[id].checked);
   
  }

  const setCheckedTrue = () => {
    setChecked(!check);
    console.log(check);
  }

  renderItem = ({item}) => (
    <ListItem bottomDivider>
      <Avatar
        source={item.avatar_url}
      />
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.CheckBox 
      checked={check}
      uncheckedColor='#F00'
      checkedColor='#0F0'
    //   onPress={() => chooseExercise(item.id, item.checked)}
    onPress={() => setCheckedTrue()}
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
