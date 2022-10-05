import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Card, Text, Input, Button} from '@rneui/themed';
import NavButtons from '../components/NavButtons';
import {getCurrentDate} from '../components/Date.js';

const ViewDuringWorkout = (props) => {
  // for measurement labels

  const [exerciseList, setExercise] = useState([
    // {exerciseid:1, movename: 'Biceps curl', movepic: require('../assets/benchpress.jpg'),checked:false},
    // {exerciseid:2, movename: 'Weight lift', movepic: require('../assets/weightlift.png'),checked:false}
  ]);

  //List for one set
  const [workoutList, setWorkouts] = useState([]);
  //List for new workout
  const [newWorkout, setNewWorkOut] = useState([]);
  const [reps1, setReps1] = useState("");
  const [weights1, setWeights1] = useState("");
  const [duration1, setDuration1] = useState("");
  const [reps2, setReps2] = useState("");
  const [weights2, setWeights2] = useState("");
  const [duration2, setDuration2] = useState("");
  const [reps3, setReps3] = useState("");
  const [weights3, setWeights3] = useState("");
  const [duration3, setDuration3] = useState("");
  const [exerId, setExerId] = useState();
  const [workoutId, setWorkoutId] = useState();

  const date = getCurrentDate();

  const LOCAL_ADDRESS = 'http://10.0.2.2:8080';
  const SERVICE_ADDRESS = LOCAL_ADDRESS;
  const [isLoading, setLoading] = useState(true);
  
  const addSerieToList = () => {
    setWorkouts(workoutList => [...workoutList, {Number(reps1), Number(weights1), Number(duration1),workoutId,exerId}]);
    console.log("workoutList",workoutList);
  }

  const inputReps1 = (id, reps) => {
    setReps1(reps);
    setExerId(id);
    // console.log("reps",reps);
    // console.log("id",id);
    
    setWorkoutId(newWorkout[0].workoutid);
  }

  const inputWeights1 = (id, weights) => {
    setWeights1(weights);
    setExerId(id);
    
  }
  const inputDuration1 = (id, dura) => {
    setDuration1(dura);
    setExerId(id);
  }
  const inputReps2 = (reps) => {
    setReps2(reps);
  }

  const inputWeights2 = (weights) => {
    setWeights2(weights);
  }
  const inputDuration2 = (duration) => {
    setDuration2(duration);
  }
  const inputReps3 = (reps) => {
    setReps3(reps);
  }

  const inputWeights3 = (weights) => {
    setWeights3(weights);
  }
  const inputDuration3 = (duration) => {
    setDuration3(duration);
  }

  useEffect(() => {
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
      console.log('onko tämä json', json, ' ', exerciseList);
    } catch (error) {
      console.log(error);
    }
    console.log('mikä tämä on', exerciseList);
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
                 
                  date: "3.10.2022",
                  personid: 1,
                }),
              },
            );
              let data = await response.json();
              setNewWorkOut(data);
              console.log("workoutid", data[0].workoutid);
              setWorkoutId(data[0].workoutid);
              
              
          } catch (error) {
            console.log(error);
          }
          finally{
            // console.log("workoutid", newWorkout.workoutid);
          }
        };
        //END
    
  



  const renderItem = ({item, index}) => {
    console.log("lista", exerciseList);
    return (
        // wraps everything, is there for bottom navbar
        <View style={{marginBottom:20, backgroundColor:'white', borderRadius:15}}>
          {/* wraps whole page */}
          <View style={styles.containerAll}>
            <Text style={{fontSize:18, padding:10, paddingLeft:15}}>{item.movename}</Text>
            {/* Taulukon otsikot */}
            <View style={{width: '100%'}}>
              <View style={{flexDirection: 'row', paddingLeft: 40}}>
                <Text style={{paddingLeft: 35, paddingRight: 25}}>Repeats</Text>
                <Text style={{paddingRight: 25, paddingLeft:10}}>Weights</Text>
                <Text style={{paddingRight: 20, paddingLeft:10}}>Duration</Text>
              </View>
            </View>
    
            {/* Yhden liikkeen taulukko */}
            <View style={styles.listContainer}>
              <View style={{flexDirection: 'column', width: '50%'}}>
                {/* Yksi rivi */}
                <View style={{width: '60%', flexDirection: 'row'}}>
                  {/* Setti */}
                  <Text style={{paddingTop: 20, marginRight: 15, paddingLeft:20}}>Set 1</Text>
                  {/* Inputit toistoille, painoille ja kestolle */}
                  <Input
                    inputContainerStyle={{flexDirection: 'row', width: 50}}
                    inputStyle={{fontSize: 12}}
                    value={item.exerciseid}
                    onChangeText={(reps) => {inputReps1(item.exerciseid, reps)}}
                  />
                  <Input
                    inputContainerStyle={{flexDirection: 'row', width: 50}}
                    inputStyle={{fontSize: 12}}
                    onChangeText={(weights) => {inputWeights1(item.exerciseid, weights)}}
                  />
                  <Input
                    inputContainerStyle={{flexDirection: 'row', width: 50}}
                    inputStyle={{fontSize: 12}}
                    onChangeText={(dura) => {inputDuration1(item.exerciseid, dura)}}
                  />
                </View>
    
                {/* Uusi rivi ilman otsikoita */}
                <View style={{width: '60%', flexDirection: 'row'}}>
                  <Text style={{paddingTop: 20, marginRight: 15, paddingLeft:20}}>Set 2</Text>
                  <Input
                    inputContainerStyle={{flexDirection: 'row', width: 50}}
                    inputStyle={{fontSize: 12}}
                    onChangeText={inputReps2}
                  />
                  <Input
                    inputContainerStyle={{flexDirection: 'row', width: 50}}
                    inputStyle={{fontSize: 12}}
                    onChangeText={inputWeights2}
                  />
                  <Input
                    inputContainerStyle={{flexDirection: 'row', width: 50}}
                    inputStyle={{fontSize: 12}}
                    onChangeText={inputDuration2}
                  />
                </View>
    
                {/* Uusi rivi ilman otsikoita*/}
                <View style={{width: '60%', flexDirection: 'row'}}>
                  <Text style={{paddingTop: 20, marginRight: 15, paddingLeft:20}}>Set 3</Text>
                  <Input
                    inputContainerStyle={{flexDirection: 'row', width: 50}}
                    inputStyle={{fontSize: 12}}
                    onChangeText={inputReps3}
                  />
                  <Input
                    inputContainerStyle={{flexDirection: 'row', width: 50}}
                    inputStyle={{fontSize: 12}}
                    onChangeText={inputWeights3}
                  />
                  <Input
                    inputContainerStyle={{flexDirection: 'row', width: 50}}
                    inputStyle={{fontSize: 12}}
                    onChangeText={inputDuration3}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      );
  };
  
  return(
    <View style={styles.container}>
        <Text style={{fontSize:22, paddingTop:10, paddingBottom:15}}>Fill your workout</Text>
        <View style={styles.flatlist}>
    <FlatList style={{height:'50%', marginBottom:20}}
      keyExtractor={keyExtractor}
      data={exerciseList}
      renderItem={renderItem}
      ListFooterComponent={() => (
        <Button
          buttonStyle={styles.button}
          title="START WORKOUT"
          onPress={() => {
            addSerieToList();
          }}
        />
      )}
    />
    </View>
    <View style={styles.bottom}>
        <NavButtons params={props} />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        
    },
    flatlist:{
      height:'80%',
      marginBottom:20
    },

  containerAll: {
    flex:1,
    width: '80%',
    marginBottom:20
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
  bottom: {
    height: 50,
    flexDirection:'row'
  },
});

export default ViewDuringWorkout;
