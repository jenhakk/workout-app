import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ImageBackground,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {
  Card,
  Text,
  ListItem,
  Avatar,
  Icon,
  Button,
  Overlay,
} from '@rneui/themed';
import NavButtons from '../components/NavButtons';

// View where user can see all their workouts and click them to see the details.
// Longpressing will delete workout after confirmation alert

const ViewWorkoutHistory = props => {

  //List for all workouts
  const [workoutHistory, setWorkoutHistory] = useState([]);
  //List for workoutExercises
  const [workoutExercises, setWorkoutExercises] = useState([]);
  const LOCAL_ADDRESS = 'http://10.0.2.2:8080';
  const SERVICE_ADDRESS = LOCAL_ADDRESS;
  const [isLoading, setLoading] = useState(true);
  const imageurl = 'http://10.0.2.2:8080/images/';
  //State for persons id, comes from ViewStart
  const [personid, setPersonId] = useState(props.route.params == undefined ? '' : props.route.params.personId);
  //Visibility state for Overlay for checking chosen workouts details
  const [visible, setVisible] = useState(false);
  //State for workoutId
  const [workoutid, setWorkoutId] = useState();

  useEffect(() => {
    
      {props.navigation.setOptions({headerRight: () => (
        <Icon
          name="head-question"
          type="material-community"
          color="rgba(92, 99,216, 1)"
          size={25}
          onPress={() => props.navigation.navigate('Instructions')}
        />
      )})
    }
    
    if (isLoading) {
      
      //Fetching persons all workouts from database at first render
      fetchWorkoutsByPerson();
      setLoading(false);
    }
  }, []);

  //Fetch workoutexercises by chosen workoutid, setting respond json to workoutExercises list
  const fetchWorkoutExercisesByWorkoutId = async id => {
    try {
      let response = await fetch(
        SERVICE_ADDRESS + '/rest/workoutservice/readworkoutexercisesbyid/' + id,
      );
      let json = await response.json();

      setWorkoutExercises(json);
      console.log('Workoutexercises    ', json);
    } catch (error) {
      console.log(error);
    }
    //Opening Overlay for workouts details
    toggleOverlay();
  };

  //Fetching all workouts by personid and setting those into workoutHistory list
  const fetchWorkoutsByPerson = async () => {
    try {
      let response = await fetch(
        SERVICE_ADDRESS + '/rest/workoutservice/readworkouts/' + personid,
      );
      let json = await response.json();

      setWorkoutHistory(json);
    } catch (error) {
      console.log(error);
    }
  };

const alerting=(id)=>{
  console.log(id);
  Alert.alert(
    //title
    'Are you sure?',
    //body
    'Do you want to delete this workout ?',
    [
      {
        text: 'Yes',
        onPress: () => deleteWorkoutById(id)
      },
      {
        text: 'No',
        onPress: () => console.log('No Pressed'), style: 'cancel'
      },
    ],
    {cancelable: false},
    //clicking out side of alert will not cancel
  );
}
  const deleteWorkoutById = async(workoutid) => {
    
console.log('indeleteworkoutbyid  ',workoutid);
    try {
      let response = await fetch(
        SERVICE_ADDRESS + '/rest/workoutservice/deleteworkoutbyid/' + workoutid,
        {
          method: 'DELETE',
        },
      );
        let json = await response.json();
        setWorkoutHistory(json);
        } 
        catch (error) {
          console.log(error);
        }
  };

  //Toggling Overlay visibility
  const toggleOverlay = index => {
    setVisible(!visible);
  };

  //Rendering Flatlist of Workouts
  const renderItem2 = ({item, index}) => {
  
    return (
      // TouchableOpacity for chosing workout from list and deleting them


      <TouchableOpacity
      
        key={index}
        onPress={() => {
          fetchWorkoutExercisesByWorkoutId(item.workoutid);
        }}
       onLongPress={() => alerting(item.workoutid)}
        
        activeOpacity={0.8}>
        <View style={{alignItems: 'center'}}>
          <View style={styles.listitem}>
            <Text style={{textAlign: 'center', color: '#6533F9', fontSize: 18}}>
              Workout: {item.workoutid} Date: {item.date}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  //Base View
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
        {/* Flatlist View for workouts */}
        <View style={styles.flatlist}>
          <FlatList
            data={workoutHistory}
            renderItem={renderItem2}
          />
        </View>

        {/* Overlay for showing details of chosen workout starts
        shows: Exercises name, image and sets with repeats, weights and exercises */}
        <Overlay
          isVisible={visible}
          onBackdropPress={toggleOverlay}
          overlayStyle={{width: '90%'}}>
          <FlatList
            data={workoutExercises}
            renderItem={({item, index}) => {
              let path = 'http://10.0.2.2:8080/images/' + item[0].picture;
              console.log(path);
              return (
                <ListItem
                  bottomDivider
                  key={index}
                  style={styles.listitemOverlay}>
                  <ListItem.Content>
                    <ListItem.Title
                      style={{
                        fontSize: 18,
                        color: '#6533F9',
                        paddingBottom: 5,
                        paddingLeft: 5,
                      }}>
                      {item[0].movename}{' '}
                    </ListItem.Title>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                        paddingLeft: 50,
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '700',
                          color: '#9F40E6',
                        }}>
                        Reps:
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '700',
                          color: '#9F40E6',
                        }}>
                        Weights
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '700',
                          color: '#9F40E6',
                        }}>
                        Duration:
                      </Text>
                    </View>

                      {/* Mapping for getting sets from list in different rows */}
                    {item.map((item, index) => {
                      return (
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '100%',
                          }}
                          key={index}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: '700',
                              color: '#9F40E6',
                            }}>
                            Set {index + 1}
                          </Text>
                          <Text style={styles.textStyleOverlay}>
                            {item.reps}
                          </Text>
                          <Text style={styles.textStyleOverlay}>
                            {item.weights} kg
                          </Text>
                          <Text style={styles.textStyleOverlay}>
                            {item.duration}
                          </Text>
                        </View>
                      );
                    })}
                  </ListItem.Content>
                    {/* Exercise image */}
                  <Avatar
                    source={{uri: path}}
                    size={55}
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
                buttonStyle={styles.buttonOverlay}
                title="OK"
                onPress={() => {
                  toggleOverlay();
                }}
              />
            )}
          />
        </Overlay>
        {/* Overlay ends */}

      </ImageBackground>

      {/* Bottom navigation */}
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
  buttonOverlay: {
    marginTop: 5,
    backgroundColor: '#9F40E6',
    marginBottom: 10,
    borderRadius: 20,
    width: 80,
    height: 50,
    alignSelf: 'center',
  },
  flatlist: {
    flex: 8,
    width: '100%',
    alignContent: 'center',
    marginBottom:10
  },
  listitem: {
    padding: 10,
    marginTop: 10,
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
    
  },
  listitemOverlay: {
    padding: 5,
    backgroundColor: 'white',
    width: '100%',
  },

  textStyleOverlay: {
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
