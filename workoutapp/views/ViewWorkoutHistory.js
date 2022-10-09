import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ImageBackground,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {
  Card,
  Text,
  ListItem,
  Avatar,
  Image,
  Button,
  Overlay,
} from '@rneui/themed';
import NavButtons from '../components/NavButtons';

const ViewWorkoutHistory = props => {
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [workoutExercises, setWorkoutExercises] = useState([]);
  const LOCAL_ADDRESS = 'http://10.0.2.2:8080';
  const SERVICE_ADDRESS = LOCAL_ADDRESS;
  const [isLoading, setLoading] = useState(true);
  const imageurl = 'http://10.0.2.2:8080/images/';
  const [personid, setPersonId] = useState(
    props.route.params == undefined ? '' : props.route.params.personId,
  );
  const [visible, setVisible] = useState(false);
  const [workoutid, setWorkoutId] = useState();

  const toggleOverlay = (index) => {
    setVisible(!visible);
  };

  useEffect(() => {
    if (isLoading) {
      setLoading(false);
      // console.log("workoutid", workoutId);
      //fetchWorkoutExercisesByPerson();
      fetchWorkoutsByPerson();
    }
  }, []);

  const fetchWorkoutExercisesByWorkoutId = async (id) => {
    try {
      let response = await fetch(
        SERVICE_ADDRESS +
          '/rest/workoutservice/readworkoutexercisesbyid/' + id,
      );
      let json = await response.json();

      setWorkoutExercises(json);
      console.log('Workoutexercises    ', json);
    } catch (error) {
      console.log(error);
    }

    
    toggleOverlay();
  };

  //console.log("ulkopuolelta ", workoutExercises);

  const fetchWorkoutsByPerson = async () => {
    try {
      let response = await fetch(
        SERVICE_ADDRESS + '/rest/workoutservice/readworkouts/' + personid,
      );
      let json = await response.json();

      setWorkoutHistory(json);
      // console.log('Workouts    ', json);
    } catch (error) {
      console.log(error);
    }

  };

  keyExtractor = (item, index) => {
    
    index.toString();
  };

  keyHandler = (item, index) => {
    index.toString();
  };

  const renderItem2 = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => {fetchWorkoutExercisesByWorkoutId(item.workoutid)}} onLongPress={() => {}} key={index}>
        <View style={{alignItems:'center'}}>
          <View style={styles.listitem}>
            <Text style={{textAlign: 'center', color:'#6533F9', fontSize:18}}>
              Workout: {item.workoutid} Date: {item.date}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/imageback.png')}
        resizeMode="cover"
        style={styles.image}>
        <Text
          style={{
            color: 'white',
            fontSize: 24,
            textAlign: 'center',
            fontWeight: '500',
            marginTop: 10,
            marginBottom: 7,
          }}>
          Your workouts
        </Text>
        <View style={styles.flatlist}>
          {/* <Text style={{textAlign:'center', color:'white', fontSize:18}}>{workoutDate}</Text> */}
          <FlatList
            keyExtractor={keyExtractor}
            data={workoutHistory}
            renderItem={renderItem2}
            // ListFooterComponent={() => (
            //   <Button
            //     buttonStyle={styles.button}
            //     title="DONE"
            //     onPress={() => {
            //       props.navigation.navigate('Home');
            //     }}
            //   />
            // )}
          />
        </View>
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={{width:300}}>

         <FlatList
            keyExtractor={keyHandler}
            data={workoutExercises}
            renderItem={({item, index}) => {
              console.log("overlay", workoutExercises);
              // console.log("toimi saatana");
              //console.log("move", item[index].movename);
              let path = 'http://10.0.2.2:8080/images/' + item[0].picture;
              console.log(path);
              return (
                <ListItem bottomDivider key={index} style={styles.listitem}>
                  
                    
          
                   <ListItem.Content >
                  <ListItem.Title style={{fontSize: 22, color: '#6533F9', paddingBottom:5, paddingLeft:10}}>
                                     {item[0].movename} </ListItem.Title> 
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

            }}
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
   
         </Overlay> 
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
    width: '100%',
    alignContent: 'center',
  },
  listitem: {
    padding: 10,
    marginTop: 10,
    backgroundColor: 'white',
    width: '80%',
  },
  content: {
    padding: 5,
    width:500,
  },
  textStyle: {
    fontSize: 16,
  },
  avatar: {
    resizeMode: 'contain',
  },
  bottom: {
    height: 50,
  },
});

export default ViewWorkoutHistory;
