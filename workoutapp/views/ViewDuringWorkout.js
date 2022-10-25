import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, ImageBackground} from 'react-native';
import {Icon, Text, Input, Button, Dialog, AirbnbRating} from '@rneui/themed';
import NavButtons from '../components/NavButtons';
import {getCurrentDate} from '../components/Date.js';
import {validateNumbers} from '../components/Validation';


//View where user fills their workout chart and saves it to database
const ViewDuringWorkout = props => {

  //List for exercises
  const [exerciseList, setExercise] = useState([]);
  //List for one set
  const [workoutList, setWorkouts] = useState([]);
  //List for new workout
  const [newWorkout, setNewWorkOut] = useState([]);
  //States for each sets repeats, weights and durations
  const [reps1, setReps1] = useState('');
  const [weights1, setWeights1] = useState('');
  const [duration1, setDuration1] = useState('');
  const [reps2, setReps2] = useState('');
  const [weights2, setWeights2] = useState('');
  const [duration2, setDuration2] = useState('');
  const [reps3, setReps3] = useState('');
  const [weights3, setWeights3] = useState('');
  const [duration3, setDuration3] = useState('');
  //State for exerciseid
  const [exerId, setExerId] = useState();
  //State for workoutid
  const [workoutId, setWorkoutId] = useState();
  //State for workout date
  const [workoutDate, setWorkoutDate] = useState('');
  //Setting persons id into personid state
  const [personid, setPersonId] = useState(props.route.params == undefined ? '' : props.route.params.personId);
  //Visibility state for Save buttons Dialog
  const [toggleSaveVisibility, setToggleSaveVisibility] = useState(false);
  //Visibility state for Finish Workout button dialog
  const [toggleFinishVisibility, setToggleFinishVisibility] = useState(false);
  // const [timeout, setTimeout] = useState(3000);

  //Function for getting current date in form dd.mm.yyyy
  const date = getCurrentDate();

  //Addresses for backend
  const LOCAL_ADDRESS = 'http://10.0.2.2:8080';
  const SERVICE_ADDRESS = LOCAL_ADDRESS;
  const [isLoading, setLoading] = useState(true);

  const addSerieToList = () => {

    setWorkouts(workoutList => [
      ...workoutList,
      {
        reps: Number(reps1),
        weights: Number(weights1),
        duration: Number(duration1),
        workoutid: workoutId,
        exerciseid: exerId,
      },
    ]);
  };

  //INPUT HANDLERS FOR ALL SETS
  //Getting exercise id and input value and setting those into states
  const inputReps1 = (id, reps) => {
    setReps1(validateNumbers(reps));
    setExerId(id);
    setWorkoutId(newWorkout[0].workoutid);
  };

  const inputWeights1 = (id, weights) => {
    setWeights1(validateNumbers(weights));
    setExerId(id);
    setWorkoutId(newWorkout[0].workoutid);
  };
  const inputDuration1 = (id, dura) => {
    setDuration1(validateNumbers(dura));
    setExerId(id);
    setWorkoutId(newWorkout[0].workoutid);
  };
  const inputReps2 = (id, reps) => {
    setReps2(validateNumbers(reps));
    setExerId(id);
    setWorkoutId(newWorkout[0].workoutid);
  };

  const inputWeights2 = (id, weights) => {
    setWeights2(validateNumbers(weights));
    setExerId(id);
    setWorkoutId(newWorkout[0].workoutid);
  };
  const inputDuration2 = (id, duration) => {
    setDuration2(validateNumbers(duration));
    setExerId(id);
    setWorkoutId(newWorkout[0].workoutid);
  };
  const inputReps3 = (id, reps) => {
    setReps3(validateNumbers(reps));
    setExerId(id);
    setWorkoutId(newWorkout[0].workoutid);
  };

  const inputWeights3 = (id, weights) => {
    setWeights3(validateNumbers(weights));
    setExerId(id);
    setWorkoutId(newWorkout[0].workoutid);
  };
  const inputDuration3 = (id, duration) => {
    setDuration3(validateNumbers(duration));
    setExerId(id);
    setWorkoutId(newWorkout[0].workoutid);
  };
  // INPUT HANDLERS ENDS

  useEffect(() => {
    {
      props.navigation.setOptions({
        headerRight: () => (
          <Icon
            name="head-question"
            type="material-community"
            color="rgba(92, 99,216, 1)"
            size={25}
            onPress={() => props.navigation.navigate('Instructions')}
          />
        ),
      });
    }

    if (isLoading) {
      // Fetching checked (true) exercises from database and creating new record in Workout table at first render
      fetchCheckedExercises();
      addNewWorkout();
      setLoading(false);
    }
  }, []);

  //Fetching checked exercises from database and setting them into exerciseList
  const fetchCheckedExercises = async () => {
    try {
      let response = await fetch(
        SERVICE_ADDRESS + '/rest/workoutservice/readcheckedexercises',
      );
      let json = await response.json();

      setExercise(json);
    } catch (error) {
      console.log(error);
    }
  };

  const keyExtractor = (item, index) => {
    return index.toString();
  };

  // Creating a new record for workout in Workout table
  // Getting created workout as list and setting it to newWorkOut list
  // and getting workout id and workout date and saving those into own states  
  const addNewWorkout = async () => {
    try {
      let response = await fetch(
        SERVICE_ADDRESS + '/rest/workoutservice/addworkout',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            date: date,
            personid: personid,
          }),
        },
      );
      let data = await response.json();
      setNewWorkOut(data);
      setWorkoutId(data[0].workoutid);
      setWorkoutDate(data[0].date);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  //END

  //   Creating new record for row in WorkoutExercise table in database containing 3 sets
  // with repeats, weights, duration, workouts id and exercises id
  const addNewWorkoutExercise = async () => {
    
    workoutExerciseList = [
      {
        reps: Number(reps1),
        weights: Number(weights1),
        duration: Number(duration1),
        workoutid: workoutId,
        exerciseid: exerId,
      },
      {
        reps: Number(reps2),
        weights: Number(weights2),
        duration: Number(duration2),
        workoutid: workoutId,
        exerciseid: exerId,
      },
      {
        reps: Number(reps3),
        weights: Number(weights3),
        duration: Number(duration3),
        workoutid: workoutId,
        exerciseid: exerId,
      },
    ];
    try {
      let response = await fetch(
        SERVICE_ADDRESS + '/rest/workoutservice/addworkoutexercise',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(workoutExerciseList),
        },
      );
      let data = await response.json();
    } catch (error) {
      console.log(error);
    }
    finally{
      setReps1(0);
      setReps2(0);
      setReps3(0);
      setWeights1(0);
      setWeights2(0);
      setWeights3(0);
      setDuration1(0);
      setDuration2(0);
      setDuration3(0);
        }
  };
  //END

  // Setting all exercises' cheched values as false after workout is done
  const setExercisesToFalse = async () => {
    try {
      let response = await fetch(
        SERVICE_ADDRESS + '/rest/workoutservice/updatecheckedstofalse',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(exerciseList),
        },
      );
      let json = await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  // let timeOut = 
  // setTimeout(() => {
  //   toggleSaveVisibility();
  //   clearTimeout(timeout);
  // }, timeout);
  

  //Toggle function for Save buttons Dialog, closes after 2 seconds if not clicked
    const showSavedAlert = () => {
  
      setToggleSaveVisibility(true);   
  
      setTimeout(()=>{
  
        setToggleSaveVisibility(false);
  
      },1000);
  
    };
    


  //Toggle function for Finish Workout buttons Dialog
  const showFinishedAlert = () => {
    setToggleFinishVisibility(!toggleFinishVisibility);
  };

  const renderItem = ({item, index}) => {
    return (
      // Flatlist rendering
      <View
        style={{marginBottom: 20, backgroundColor: 'white', borderRadius: 15}}>
        {/* Wraps one exercise chart */}
        <View style={styles.containerAll}>
          <Text
            style={{
              fontSize: 18,
              padding: 10,
              paddingLeft: 20,
              color: '#6533F9',
            }}>
            {item.movename}
          </Text>
          {/* Titles for chart */}
          <View style={{width: '100%'}}>
            <View style={{flexDirection: 'row', paddingLeft: 40}}>
              <Text style={{paddingLeft: 35, paddingRight: 25, fontFamily:'OpenSans-Regular', fontSize:15}}>Repeats</Text>
              <Text style={{paddingRight: 25, paddingLeft: 10, fontFamily:'OpenSans-Regular', fontSize:15}}>Weights</Text>
              <Text style={{paddingRight: 20, paddingLeft: 10, fontFamily:'OpenSans-Regular', fontSize:15}}>Duration</Text>
            </View>
          </View>

          {/* First set with Set titles */}
          <View>
            <View style={{flexDirection: 'column', width: '45%'}}>
              {/* One line */}
              <View style={{width: '60%', flexDirection: 'row'}}>
                {/* Set 1 title */}
                <Text
                  style={{paddingTop: 20, marginRight: 15, paddingLeft: 20, fontFamily:'OpenSans-Regular', fontSize:15}}>
                  Set 1
                </Text>
                {/* Input for repeats, weights and duration*/}
                <Input
                  inputContainerStyle={{flexDirection: 'row', width: 50}}
                  inputStyle={{fontSize: 20}}
                  keyboardType="numeric"
                  maxLength={2}
                  onChangeText={reps => {
                    inputReps1(item.exerciseid, reps);
                  }}
                />
                <Input
                  inputContainerStyle={{flexDirection: 'row', width: 50}}
                  inputStyle={{fontSize: 20}}
                  keyboardType="numeric"
                  maxLength={3}
                  onChangeText={weights => {
                    inputWeights1(item.exerciseid, weights);
                  }}
                />
                <Input
                  inputContainerStyle={{flexDirection: 'row', width: 50}}
                  inputStyle={{fontSize: 20}}
                  keyboardType="numeric"
                  maxLength={3}
                  onChangeText={dura => {
                    inputDuration1(item.exerciseid, dura);
                  }}
                />
              </View>

              {/* Second set */}
              <View style={{width: '60%', flexDirection: 'row'}}>
                <Text
                  style={{paddingTop: 20, marginRight: 15, paddingLeft: 20, fontFamily:'OpenSans-Regular', fontSize:15}}>
                  Set 2
                </Text>
                <Input
                  inputContainerStyle={{flexDirection: 'row', width: 50}}
                  inputStyle={{fontSize: 20}}
                  keyboardType="numeric"
                  maxLength={2}
                  onChangeText={reps => {
                    inputReps2(item.exerciseid, reps);
                  }}
                />
                <Input
                  inputContainerStyle={{flexDirection: 'row', width: 50}}
                  inputStyle={{fontSize: 20}}
                  keyboardType="numeric"
                  maxLength={3}
                  onChangeText={weights => {
                    inputWeights2(item.exerciseid, weights);
                  }}
                />
                <Input
                  inputContainerStyle={{flexDirection: 'row', width: 50}}
                  inputStyle={{fontSize: 20}}
                  keyboardType="numeric"
                  maxLength={3}
                  onChangeText={dura => {
                    inputDuration2(item.exerciseid, dura);
                  }}
                />
              </View>

              {/* Third set*/}
              <View style={{width: '60%', flexDirection: 'row'}}>
                <Text
                  style={{paddingTop: 20, marginRight: 15, paddingLeft: 20, fontFamily:'OpenSans-Regular', fontSize:15}}>
                  Set 3
                </Text>
                <Input
                  inputContainerStyle={{flexDirection: 'row', width: 50}}
                  inputStyle={{fontSize: 20}}
                  keyboardType="numeric"
                  maxLength={2}
                  onChangeText={reps => {
                    inputReps3(item.exerciseid, reps);
                  }}
                />
                <Input
                  inputContainerStyle={{flexDirection: 'row', width: 50}}
                  inputStyle={{fontSize: 20}}
                  keyboardType="numeric"
                  maxLength={3}
                  onChangeText={weights => {
                    inputWeights3(item.exerciseid, weights);
                  }}
                />
                <Input
                  inputContainerStyle={{flexDirection: 'row', width: 50}}
                  inputStyle={{fontSize: 20}}
                  keyboardType="numeric"
                  maxLength={3}
                  onChangeText={dura => {
                    inputDuration3(item.exerciseid, dura);
                  }}
                />
              </View>
            </View>
          </View>
          {/* Save button for saving sets for one exercise */}
          <Button
            buttonStyle={styles.buttonSave}
            title="SAVE"
            onPress={() => {
              addNewWorkoutExercise();
              showSavedAlert();
            }}
          />
        </View>
      </View>
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
            fontSize: 22,
            paddingTop: 15,
            paddingBottom: 15,
            textAlign: 'center',
            color: 'white',
            fontFamily:'OpenSans-Regular'
          }}>
          Fill your workout
        </Text>

        {/* Flatlist component, Button at the end of the list for Finishing workout
        -> Sets all exercises checked values as false and shows Finished Dialog*/}
        <View style={styles.flatlist}>
          <FlatList
            keyExtractor={keyExtractor}
            data={exerciseList}
            renderItem={renderItem}
            ListFooterComponent={() => (
              <Button
                buttonStyle={styles.button}
                title="FINISH WORKOUT"
                onPress={() => {
                  showFinishedAlert();
                }}
              />
            )}
          />
        </View>
        {/* Dialog for Save button */}
        <Dialog
          
          isVisible={toggleSaveVisibility}
          onBackdropPress={showSavedAlert}
          overlayStyle={{borderRadius:10}}>
            
 

         

          <Dialog.Title
            title="Set saved succesfully!"
            titleStyle={{textAlign: 'center', color: '#6533F9', fontSize:19}}
          />
          <Text style={{textAlign: 'center', fontSize: 15, fontFamily:'OpenSans-Regular'}}>
            You can not edit this anymore.
          </Text>
        </Dialog>

        {/*Dialog for Finish Workout button  */}
        <Dialog
          isVisible={toggleFinishVisibility}
          onBackdropPress={showFinishedAlert}
          overlayStyle={{borderRadius:10}}>
          <Dialog.Title
            title="Finished workout!"
            titleStyle={{textAlign: 'center', color: '#6533F9'}}
          />
          <Dialog.Actions>
            <Text style={{fontSize: 15, textAlign: 'center', marginRight: 40}}>
              Are you sure you are ready?
            </Text>

              {/* NO button */}
            <Dialog.Button
              buttonStyle={{
                backgroundColor: '#C940E6',
                width: 80,
                marginTop: 20,
                borderRadius: 10,
                marginRight: 20,
              }}
              titleStyle={{color: 'white'}}
              title="NO"
              onPress={() => showFinishedAlert()}
            />

            {/* YES button, calls function setExercisesToFalse, navigates to ViewAfterWorkout with workoutId and workoutDate as props  */}
            <Dialog.Button
              buttonStyle={{
                backgroundColor: '#C940E6',
                width: 80,
                marginTop: 20,
                borderRadius: 10,
                marginRight: 45,
              }}
              titleStyle={{color: 'white'}}
              title="YES"
              onPress={() => {
                props.navigation.navigate('Workout Summary', {
                  workoutId,
                  workoutDate,
                });
                setExercisesToFalse();
              }}
            />

            {/* Workout Rating: doesn't save ratings anywhere at this point */}
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                textAlign: 'center',
                color: '#C940E6',
                marginRight: 40,
                marginTop: 30,
              }}>
              How was your workout?
            </Text>
            <AirbnbRating
              ratingContainerStyle={{marginRight: 60}}
              starContainerStyle={{textAlign: 'center'}}
              reviewColor="#C940E6"
              selectedColor="#C940E6"
              count={5}
              reviews={['Terrible', 'Meh', 'OK', 'Good', 'Great']}
              defaultRating={5}
              size={20}
            />
          </Dialog.Actions>
        </Dialog>
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
    alignItems: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  flatlist: {
    flex: 8,
    height: '100%',
    paddingLeft: 20,
    paddingRight: 20,
  },

  containerAll: {
    flex: 1,
    width: '100%',
    marginBottom: 20,
  },
  buttonSave: {
    marginTop: 5,
    backgroundColor: '#29F2B9',
    marginBottom: 10,
    borderRadius: 20,
    width: 100,
    height: 50,
    alignSelf: 'center',
  },
  button: {
    marginTop: 5,
    backgroundColor: '#9F40E6',
    marginBottom: 25,
    borderRadius: 20,
    width: 200,
    height: 60,
    alignSelf: 'center',
  },
  bottom: {
    flexDirection: 'row',
  },
});

export default ViewDuringWorkout;
