import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, ImageBackground} from 'react-native';
import {Icon, Text, Input, Button, Dialog, AirbnbRating} from '@rneui/themed';
import NavButtons from '../components/NavButtons';
import {getCurrentDate} from '../components/Date.js';
import {validateNumbers} from '../components/Validation';

const ViewDuringWorkout = props => {

  // for measurement labels

  const [exerciseList, setExercise] = useState([
    // {exerciseid:1, movename: 'Biceps curl', movepic: require('../assets/benchpress.jpg'),checked:false},
    // {exerciseid:2, movename: 'Weight lift', movepic: require('../assets/weightlift.png'),checked:false}
  ]);

  //List for one set
  const [workoutList, setWorkouts] = useState([]);
  //List for new workout
  const [newWorkout, setNewWorkOut] = useState([]);
  const [reps1, setReps1] = useState('');
  const [weights1, setWeights1] = useState('');
  const [duration1, setDuration1] = useState('');
  const [reps2, setReps2] = useState('');
  const [weights2, setWeights2] = useState('');
  const [duration2, setDuration2] = useState('');
  const [reps3, setReps3] = useState('');
  const [weights3, setWeights3] = useState('');
  const [duration3, setDuration3] = useState('');
  const [exerId, setExerId] = useState();
  const [workoutId, setWorkoutId] = useState();
  const [workoutDate, setWorkoutDate] = useState('');
  const [toggleSaveVisibility, setToggleSaveVisibility] = useState(false);
  const [toggleFinishVisibility, setToggleFinishVisibility] = useState(false);

  const date = getCurrentDate();

  const LOCAL_ADDRESS = 'http://10.0.2.2:8080';
  const SERVICE_ADDRESS = LOCAL_ADDRESS;
  const [isLoading, setLoading] = useState(true);

  const addSerieToList = () => {
    console.log(
      'pääseekö ',
      Number(reps1),
      'workoutid ',
      workoutId,
      'exerId ',
      exerId,
    );
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
    // console.log("workoutList", workoutList);
    //addNewWorkoutExercise();
  };

  const inputReps1 = (id, reps) => {
    setReps1(validateNumbers(reps));
    setExerId(id);
    // console.log('reps', reps);
    // console.log('id', id);

    setWorkoutId(newWorkout[0].workoutid);
  };

  const inputWeights1 = (id, weights) => {
    setWeights1(validateNumbers(weights));
    setExerId(id);
    // console.log('w', weights);
    // console.log('id', id);
  };
  const inputDuration1 = (id, dura) => {
    setDuration1(validateNumbers(dura));
    setExerId(id);
    // console.log('d', dura);
    // console.log('id', id);
  };
  const inputReps2 = (id, reps) => {
    setReps2(validateNumbers(reps));
    setExerId(id);
    // console.log('reps', reps);
  };

  const inputWeights2 = (id, weights) => {
    setWeights2(validateNumbers(weights));
    setExerId(id);
    // console.log('we', weights);
  };
  const inputDuration2 = (id, duration) => {
    setDuration2(validateNumbers(duration));
    setExerId(id);
    // console.log('id', id);
    // console.log('dura', duration);
  };
  const inputReps3 = (id, reps) => {
    setReps3(validateNumbers(reps));
    setExerId(id);
    // console.log('reps', reps);
  };

  const inputWeights3 = (id, weights) => {
    setWeights3(validateNumbers(weights));
    setExerId(id);
    // console.log('wei', weights);
  };
  const inputDuration3 = (id, duration) => {
    setDuration3(validateNumbers(duration));
    setExerId(id);
    // console.log('id', id);
    // console.log('duration', duration);
  };

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
      fetchCheckedExercises();
      addNewWorkout();
      setLoading(false);
    }
  }, []);

  const fetchCheckedExercises = async () => {
    try {
      let response = await fetch(
        SERVICE_ADDRESS + '/rest/workoutservice/readcheckedexercises',
      );
      let json = await response.json();

      setExercise(json);
      // console.log('onko tämä json', json);
    } catch (error) {
      console.log(error);
    }
    //console.log('mikä tämä on', exerciseList);
  };

  const keyExtractor = (item, index) => {
    return index.toString();
  };

  //   Creating new record for workout in Workout table
  const addNewWorkout = async () => {
    try {
      let response = await fetch(
        SERVICE_ADDRESS + '/rest/workoutservice/addworkout',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            date: date,
            personid: 1,
          }),
        },
      );
      let data = await response.json();
      setNewWorkOut(data);
      // console.log("workoutid", data[0].workoutid);
      setWorkoutId(data[0].workoutid);
      setWorkoutDate(data[0].date);
    } catch (error) {
      console.log(error);
    } finally {
      // console.log("workoutid", newWorkout.workoutid);
    }
  };
  //END

  //   Creating new record for row in WorkoutExercise table
  const addNewWorkoutExercise = async () => {
    // console.log('IN ADDNEWWORKOUTEXERCISE list ', workoutList);
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
  };
  //END

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

  const showSavedAlert = () => {
    setToggleSaveVisibility(!toggleSaveVisibility);
  };

  const showFinishedAlert = () => {
    setToggleFinishVisibility(!toggleFinishVisibility);
  };

  const renderItem = ({item, index}) => {
    //console.log("lista", exerciseList);
    return (
      // wraps everything, is there for bottom navbar
      <View
        style={{marginBottom: 20, backgroundColor: 'white', borderRadius: 15}}>
        {/* wraps whole page */}
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
          {/* Taulukon otsikot */}
          <View style={{width: '100%'}}>
            <View style={{flexDirection: 'row', paddingLeft: 40}}>
              <Text style={{paddingLeft: 35, paddingRight: 25}}>Repeats</Text>
              <Text style={{paddingRight: 25, paddingLeft: 10}}>Weights</Text>
              <Text style={{paddingRight: 20, paddingLeft: 10}}>Duration</Text>
            </View>
          </View>

          {/* Yhden liikkeen taulukko */}
          <View>
            <View style={{flexDirection: 'column', width: '45%'}}>
              {/* Yksi rivi */}
              <View style={{width: '60%', flexDirection: 'row'}}>
                {/* Setti */}
                <Text
                  style={{paddingTop: 20, marginRight: 15, paddingLeft: 20}}>
                  Set 1
                </Text>
                {/* Inputit toistoille, painoille ja kestolle */}
                <Input
                  inputContainerStyle={{flexDirection: 'row', width: 50}}
                  inputStyle={{fontSize: 12}}
                  keyboardType="numeric"
                  maxLength={2}
                  onChangeText={reps => {
                    inputReps1(item.exerciseid, reps);
                  }}
                />
                <Input
                  inputContainerStyle={{flexDirection: 'row', width: 50}}
                  inputStyle={{fontSize: 12}}
                  keyboardType="numeric"
                  maxLength={3}
                  onChangeText={weights => {
                    inputWeights1(item.exerciseid, weights);
                  }}
                />
                <Input
                  inputContainerStyle={{flexDirection: 'row', width: 50}}
                  inputStyle={{fontSize: 12}}
                  keyboardType="numeric"
                  maxLength={3}
                  onChangeText={dura => {
                    inputDuration1(item.exerciseid, dura);
                  }}
                />
              </View>

              {/* Uusi rivi ilman otsikoita */}
              <View style={{width: '60%', flexDirection: 'row'}}>
                <Text
                  style={{paddingTop: 20, marginRight: 15, paddingLeft: 20}}>
                  Set 2
                </Text>
                <Input
                  inputContainerStyle={{flexDirection: 'row', width: 50}}
                  inputStyle={{fontSize: 12}}
                  keyboardType="numeric"
                  maxLength={2}
                  onChangeText={reps => {
                    inputReps2(item.exerciseid, reps);
                  }}
                />
                <Input
                  inputContainerStyle={{flexDirection: 'row', width: 50}}
                  inputStyle={{fontSize: 12}}
                  keyboardType="numeric"
                  maxLength={3}
                  onChangeText={weights => {
                    inputWeights2(item.exerciseid, weights);
                  }}
                />
                <Input
                  inputContainerStyle={{flexDirection: 'row', width: 50}}
                  inputStyle={{fontSize: 12}}
                  keyboardType="numeric"
                  maxLength={3}
                  onChangeText={dura => {
                    inputDuration2(item.exerciseid, dura);
                  }}
                />
              </View>

              {/* Uusi rivi ilman otsikoita*/}
              <View style={{width: '60%', flexDirection: 'row'}}>
                <Text
                  style={{paddingTop: 20, marginRight: 15, paddingLeft: 20}}>
                  Set 3
                </Text>
                <Input
                  inputContainerStyle={{flexDirection: 'row', width: 50}}
                  inputStyle={{fontSize: 12}}
                  keyboardType="numeric"
                  maxLength={2}
                  onChangeText={reps => {
                    inputReps3(item.exerciseid, reps);
                  }}
                />
                <Input
                  inputContainerStyle={{flexDirection: 'row', width: 50}}
                  inputStyle={{fontSize: 12}}
                  keyboardType="numeric"
                  maxLength={3}
                  onChangeText={weights => {
                    inputWeights3(item.exerciseid, weights);
                  }}
                />
                <Input
                  inputContainerStyle={{flexDirection: 'row', width: 50}}
                  inputStyle={{fontSize: 12}}
                  keyboardType="numeric"
                  maxLength={3}
                  onChangeText={dura => {
                    inputDuration3(item.exerciseid, dura);
                  }}
                />
              </View>
            </View>
          </View>
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
            paddingTop: 10,
            paddingBottom: 15,
            textAlign: 'center',
            color: 'white',
          }}>
          Fill your workout
        </Text>
        <View style={styles.flatlist}>
          <FlatList
            // style={{height: '50%', marginBottom:20}}
            keyExtractor={keyExtractor}
            data={exerciseList}
            renderItem={renderItem}
            ListFooterComponent={() => (
              <Button
                buttonStyle={styles.button}
                title="FINISH WORKOUT"
                onPress={() => {
                  setExercisesToFalse();
                  showFinishedAlert();
                }}
              />
            
            )
            
          }
          />
        </View>
        {/* Dialog for Save button */}
        <Dialog
          isVisible={toggleSaveVisibility}
          onBackdropPress={showSavedAlert}>
          <Dialog.Title
            title="Set saved succesfully!"
            titleStyle={{textAlign: 'center', color: '#6533F9'}}
          />
          <Text style={{textAlign: 'center', fontSize: 15}}>
            You can edit it by changing values and saving again.
          </Text>
          {/* <Dialog.Button buttonStyle={{backgroundColor:'#C940E6', width:80, alignSelf:'center', marginTop: 20, borderRadius:10}} titleStyle={{color:'white'}} title="OK" onPress={() => showSavedAlert()}/> */}
        </Dialog>

        {/*Dialog for Finish Workout button  */}
        <Dialog
          isVisible={toggleFinishVisibility}
          onBackdropPress={showFinishedAlert}>
          <Dialog.Title
            title="Finished workout!"
            titleStyle={{textAlign: 'center', color: '#6533F9'}}
          />
          <Dialog.Actions>
            <Text style={{fontSize: 15, textAlign: 'center', marginRight: 40}}>
              Are you sure you are ready?
            </Text>

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
            <Text
              style={{
                fontSize: 16,
                fontWeight:'700',
                textAlign: 'center',
                color:'#C940E6',
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
          <NavButtons />
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
    flex:8,
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
