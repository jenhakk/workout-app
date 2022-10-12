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
  Icon,
  Text,
  ListItem,
  Avatar,
  Image,
  Button,
  Overlay,
} from '@rneui/themed';
import NavButtons from '../components/NavButtons';
import {Dialog} from '@rneui/base';

const ViexExercises = props => {
  //List of exercises
  const [exerciseList, setExercise] = useState([]);
  //Address for backend
  const LOCAL_ADDRESS = 'http://10.0.2.2:8080';
  const SERVICE_ADDRESS = LOCAL_ADDRESS;
  const [isLoading, setLoading] = useState(true);
  const imageurl = 'http://10.0.2.2:8080/images/';
  //Checked value used in setting exercise as checked or not
  const [checked, setChecked] = useState();
  //Setting exercises id for update checked value
  const [exerciseToUpdate, updateExercise] = useState();
  //Confirmation dialogs visibility
  const [visibility, setVisibility] = useState(false);
  //Image overlays visibility
  const [imageVisibility, setImageVisibility] = useState(false);
  //Setting images path for showing it in Overlay
  const [imagePath, setImagePath] = useState('');
  //Setting persons id from ViewStart into personid state
  const [personId, setPersonId] = useState(props.route.params == undefined ? '' : props.route.params.personId);
  
 //View where user chooses exercises they want to add into their workout
 //After pressing 'Start Workout' button user will be navigated to actual Workout View

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
      //Fetching all exercises from database to be shown in Flatlist
      fetchExercises();
      setLoading(false);
    }
  }, []);

  //Fetch for reading exercises from database into the exerciseList
  const fetchExercises = async () => {
    try {
      let response = await fetch(
        SERVICE_ADDRESS + '/rest/workoutservice/readexercises',
      );
      let json = await response.json();

      setExercise(json);
     
    } catch (error) {
      console.log(error);
    }
   
  };

  //Updating chosen exercises checked attribute as "true" into database
  const saveExercisesToDb = async () => {
    try {
      let response = await fetch(
        SERVICE_ADDRESS + '/rest/workoutservice/updateexercises',
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
    } finally {
      //Finally opening confirmation dialog of Start Workout button
      toggleDialog();
    }
  };

  //Toggle Start workout dialog
  const toggleDialog = () => {
    setVisibility(!visibility);
  };

  //Open Image Overlay
  handleModalOpen = path => {
    setImagePath(path);
    setImageVisibility(!imageVisibility);
  };

  //Close Image Overlay
  handleModalClose = () => {
    setImageVisibility(!imageVisibility);
  };

  //KeyExtractor for Flatlist
  keyExtractor = (item, index) => index.toString();

  //Setting chosen exercises checked value as true or false
  //and setting it to exerciseList
  const updateItem = index => {
    updateExercise(exerciseList[index]);
    exerciseList[index].checked = !exerciseList[index].checked;
    setExercise(exerciseList);
    setChecked(!checked);
  };

  //rendering for Flatlist
  const renderItem = ({item, index}) => {
    // setting image path for avatar source
    let path = imageurl + item.movepic;

    return (
      // Start of ListItem
      <ListItem bottomDivider style={styles.listitem}>

        {/* Exercise image */}
        <Avatar
          source={{uri: path}}
          size={65}
          onPress={() => {
            handleModalOpen(path);
          }}
          avatarStyle={styles.avatar}
        />

        {/* ListItem.Content starts */}
        <ListItem.Content style={styles.content}>
          {/* Title */}
          <ListItem.Title style={{fontSize: 20, color: '#6533F9'}}>
            {item.movename}
          </ListItem.Title>
        </ListItem.Content>

        {/* Checkbox: with onPress updates chosen exercise into exerciseList as !checked */}
        <ListItem.CheckBox
          checked={item.checked}
          uncheckedColor="#6533F9"
          checkedColor="#CB4FF4"
          onPress={() => {
            updateItem(index), item.checked;
          }}
        />
      </ListItem>
    );
  };

  // Base View
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/imageback.png')}
        resizeMode="cover"
        style={styles.image}>

          {/* Dialog for Start Workout button */}
        <Dialog
          isVisible={visibility}
          onBackdropPress={toggleDialog}
          overlayStyle={{
            backgroundColor: '#C940E6',
            height: 200,
            borderRadius: 20,
          }}>
          <Dialog.Title
            titleStyle={{color: 'white', fontSize: 30, textAlign: 'center'}}
            title="Have a great workout!"
          />
          <Dialog.Actions>
            {/* Cancel action button */}
            <Dialog.Button
              buttonStyle={{
                backgroundColor: '#9F40E6',
                borderRadius: 5,
                margin: 10,
              }}
              titleStyle={{color: 'white', fontSize: 20}}
              title="Wait..."
              onPress={() => toggleDialog()}
            />

            {/* Moving to During Workout View button */}
            <Dialog.Button
              buttonStyle={{
                backgroundColor: '#9F40E6',
                borderRadius: 5,
                margin: 10,
                marginRight: 25,
              }}
              titleStyle={{color: 'white', fontSize: 20, fontWeight: '700'}}
              title="LET'S GO!"
              onPress={() => {
                props.navigation.navigate('During workout', { personId: personId });
              }}
            />
          </Dialog.Actions>
        </Dialog>
        {/* End of Dialog */}
        
        {/* Overlay for showing larger images  */}
        <Overlay
          isVisible={imageVisibility}
          onBackdropPress={handleModalClose}
          overlayStyle={{backgroundColor: 'white', height: 300, width: 300, borderRadius:10}}>
          <Image
            style={{width: '100%', height: '100%', resizeMode: 'stretch'}}
            source={{uri: imagePath}}
          />
        </Overlay>
        {/* End of Overlay */}

        {/* Flatlist View starts */}
        <View style={styles.flatlist}>
          <Text
            style={{
              color: 'white',
              fontSize: 17,
              textAlign: 'center',
              fontFamily:'OpenSans-SemiBold',
              marginTop: 10,
              marginBottom: 7,
            }}>
            Choose exercises you want to add to your workout
          </Text>
          {/* Flatlist starts: Button Start Workout updates exerciseList with new checked values into database */}
          <FlatList
            keyExtractor={keyExtractor}
            data={exerciseList}
            renderItem={renderItem}
            ListFooterComponent={() => (
              <Button
                buttonStyle={styles.button}
                title="START WORKOUT"
                onPress={() => {
                  saveExercisesToDb();
                }}
              />
            )}
          />
          {/* Flatlist ends */}

        </View>
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
  flatlist: {
    flex: 8,
  },
  listitem: {
    padding: 5,
    marginTop: 5,
  },
  content: {
    padding: 25,
  },
  avatar: {
    resizeMode: 'contain',
  },
  bottom: {
    height: 50,
  },
});

export default ViexExercises;
