import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ImageBackground,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {Card, Text, ListItem, Avatar, Image, Button} from '@rneui/themed';
import NavButtons from '../components/NavButtons';

const ViewAfterWorkout = props => {
  const [workoutSummary, setWorkoutSummary] = useState([]);
  const LOCAL_ADDRESS = 'http://10.0.2.2:8080';
  const SERVICE_ADDRESS = LOCAL_ADDRESS;
  const [isLoading, setLoading] = useState(true);
  const imageurl = 'http://10.0.2.2:8080/images/';
  const [workoutId, setWorkoutId] = useState(props.route.params == undefined ? "" : props.route.params.workoutId);
  const [workoutDate, setWorkoutDate] = useState(props.route.params == undefined ? "" : props.route.params.workoutDate);

  useEffect(() => {
    if (isLoading) {
      
      setLoading(false);
      console.log("workoutid", workoutId);
      fetchWorkout();
    }

    
  }, []);

  const fetchWorkout = async () => {
    try {
      let response = await fetch(
        SERVICE_ADDRESS + '/rest/workoutservice/readworkoutexercisesbyid/'+workoutId,
      );
      let json = await response.json();

      setWorkoutSummary(json);
      //console.log('onko tämä json', json, ' ', workoutSummary);
    } catch (error) {
      console.log(error);
    }
  };

  keyExtractor = (item, index) => index.toString();

  
  const renderItem = ({item, index}) => {
   
    let path = imageurl + item[index].picture;

    return (
      <ListItem bottomDivider key={index} style={styles.listitem}>
        

        <ListItem.Content style={styles.content}>
        <ListItem.Title style={{fontSize: 22, color: '#6533F9', paddingBottom:5, paddingLeft:10}}>
          {item[index].movename}   
          </ListItem.Title>
          <View style={{flexDirection:'row', justifyContent:'space-between', width:'90%', paddingLeft:60}}>
          <Text style={{fontSize:15, fontWeight:'700', color: '#9F40E6'}}>Reps:</Text>
          <Text style={{fontSize:15, fontWeight:'700', color: '#9F40E6'}}>Weights</Text>
          <Text style={{fontSize:15, fontWeight:'700', color: '#9F40E6'}}>Duration:</Text>
          </View>
          
          {item.map((item, index) => {

            return(
              <View style={{flexDirection:'row', justifyContent:'space-between', width:'80%'}} key={index}>
                <Text style={{fontSize:15, fontWeight:'700', color: '#9F40E6'}}>Set {index+1}</Text>
                <Text style={styles.textStyle}>{item.reps}</Text>
                <Text style={styles.textStyle}>{item.weights} kg</Text>
                <Text style={styles.textStyle}>{item.duration}</Text>
                
                </View>
            );
            
            
          })}

        </ListItem.Content>
        
         <Avatar
          source={{uri: path}}
          size={65}
          onPress={() => {
            handleModalOpen;
          }}
          avatarStyle={styles.avatar}
        />
      </ListItem>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/imageback.png')}
        resizeMode="cover"
        style={styles.image}>
        
        <View style={styles.flatlist}>
          <Text
            style={{
              color: 'white',
              fontSize:24,
              textAlign: 'center',
              fontWeight: '500',
              marginTop: 10,
              marginBottom: 7,
            }}>
            Your workout summary
          </Text>
          <Text style={{textAlign:'center', color:'white', fontSize:18}}>{workoutDate}</Text>
          <FlatList
            keyExtractor={keyExtractor}
            data={workoutSummary}
            renderItem={renderItem}
            ListFooterComponent={() => (
              <Button
                buttonStyle={styles.button}
                title="DONE"
                onPress={() => {
                  props.navigation.navigate('Home');
                }}
              />
            )}
          />
        </View>
      </ImageBackground>
      <View style={styles.bottom}>
        <NavButtons params={props} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  button: {
    marginTop: 5,
    backgroundColor: '#9F40E6',
    marginBottom: 20,
    borderRadius: 20,
    width: 200,
    height: 60,
    alignSelf: 'center',
  },
  flatlist: {
    flex: 8,
  },
  listitem: {
    padding: 5,
    marginTop: 5,
  },
  content: {
    padding: 5,
  },
  textStyle:{
    fontSize:16,
   
  },
  avatar: {
    resizeMode: 'contain'
  },
  bottom: {
    height: 50,
  },
});


export default ViewAfterWorkout;
