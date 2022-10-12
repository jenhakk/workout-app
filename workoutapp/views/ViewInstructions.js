import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, ImageBackground} from 'react-native';
import {Text, Card, Button, Icon} from '@rneui/base';
import {Dialog, CheckBox, ListItem, Avatar} from '@rneui/themed';
import NavButtons from '../components/NavButtons';
import PersonCard from '../components/PersonCard';

const ViewInstructions = props => {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);

  const CustomTitleWorkout = () => {
    return (
      <View style={{flexDirection: 'column'}}>
        <Icon
          name="weight-lifter"
          type="material-community"
          color="white"
          size={35}
        />
        <Text
          style={{
            fontSize: 12,
            color: 'white',
            marginTop: 15,
            fontWeight: '700',
            textAlign: 'center',
          }}>
          Workout
        </Text>
      </View>
    );
  };

  const CustomTitleAddMeas = () => {
    return (
      <View style={{flexDirection: 'column'}}>
        <Icon
          name="scale-bathroom"
          type="material-community"
          color="white"
          size={35}
        />
        <Text
          style={{
            fontSize: 11,
            color: 'white',
            marginTop: 15,
            textAlign: 'center',
            fontWeight: '700',
          }}>
          Measurements
        </Text>
      </View>
    );
  };

  const CustomTitleProfile = () => {
    return (
      <View style={{flexDirection: 'column'}}>
        <Icon
          name="account"
          type="material-community"
          color="white"
          size={38}
        />
        <Text
          style={{
            fontSize: 12,
            color: 'white',
            marginTop: 15,
            textAlign: 'center',
            fontWeight: '700',
          }}>
          Profile
        </Text>
      </View>
    );
  };

  const openWorkoutDialog = () => {
    setVisible1(!visible1);
  };
  const openMeasDialog = () => {
    setVisible2(!visible2);
  };
  const openPersonDialog = () => {
    setVisible3(!visible3);
  };

  return (
    <ImageBackground
      source={require('../assets/imageback.png')}
      resizeMode="cover">
      <View style={{height: '100%'}}>
        <View style={{flex: 1}}>
          <View style={{width: '90%', alignSelf: 'center'}}>
            <Text
              h2
              h2Style={{
                alignSelf: 'center',
                marginBottom: 20,
                marginTop: 20,
                color: 'white',
              }}>
              INSTRUCTIONS
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: 'white',
                textAlign: 'center',
                fontFamily:'OpenSans-SemiBold'
              }}>
              Here you can see the instructions for this application.
            </Text>
          </View>
          <View style={{alignSelf: 'center', width: '85%', marginTop: 20}}>
            <Text style={{fontSize: 16, color: 'white', marginVertical: 10, fontFamily:'OpenSans-Regular'}}>
              Choose{' '}
              <Text style={{fontWeight: '700', color: 'white', fontFamily:'OpenSans-Regular'}}>WORKOUT</Text>{' '}
              if you need some guidance on how to save your workouts.
            </Text>
            <Text style={{fontSize: 16, color: 'white', marginVertical: 10, fontFamily:'OpenSans-Regular'}}>
              Choose{' '}
              <Text style={{fontWeight: '700', color: 'white', fontFamily:'OpenSans-Regular'}}>
                MEASUREMENTS
              </Text>{' '}
              if you need to know, how to add measurements and inspect them.
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: 'white',
                marginVertical: 10,
                width: '100%',
                fontFamily:'OpenSans-Regular'
              }}>
              In{' '}
              <Text style={{fontWeight: '700', color: 'white', fontFamily:'OpenSans-Regular'}}>PROFILE</Text>{' '}
              section you can get to know how to modify your personal
              information and avatar.
            </Text>
          </View>

          <View style={styles.buttongroup}>
            <Button
              title={<CustomTitleWorkout />}
              buttonStyle={styles.button1}
              onPress={() => {
                openWorkoutDialog();
              }}></Button>

            <Button
              title={<CustomTitleAddMeas />}
              buttonStyle={styles.button1}
              onPress={() => {
                openMeasDialog();
              }}></Button>

            <Button
              title={<CustomTitleProfile />}
              buttonStyle={styles.button1}
              onPress={() => {
                openPersonDialog();
              }}></Button>
          </View>
          {/* First dialog starts */}
          <Dialog
            isVisible={visible1}
            onBackdropPress={openWorkoutDialog}
            overlayStyle={{
              backgroundColor: '#A456E8',
              height: '60%',
              width: '90%',
              borderRadius:20
            }}>

            <ScrollView style={styles.scrollviewstyle}>
              <Text h4 h4Style={{marginBottom: 5, color:'white'}}>
                Workout
              </Text>

              <Text style={styles.text}>
                Choose "Start workout" and choose the exercises you're going to do.
                Once you have choosed exercises, press the "Start Workout" button.
              </Text>
              <Text style={styles.text}>
                Next you can see a view where you can fill the details about
                your workout: Repeats, Weights and Duration. Every exercise
                consists of three sets.
              </Text>
              <Text style={styles.text}>
                Once you have filled all three sets press "Save". When you have
                filled and saved all of the exercises choose "Finish workout".
                After that you will receive a summary of your training.
              </Text>
            </ScrollView>
            <Text style={{alignSelf: 'flex-end'}}>...</Text>
            <View style={styles.buttonContainer}>
              <Button
                title="CLOSE"
                buttonStyle={{
                  backgroundColor: 'transparent',
                  alignSelf: 'center',
                }}
                titleStyle={{color:'white'}}
                onPress={openWorkoutDialog}
              />
            </View>
          </Dialog>
          {/* First dialog ends */}

          {/* Second dialog starts */}
          <Dialog
            isVisible={visible2}
            onBackdropPress={openMeasDialog}
            overlayStyle={{
                backgroundColor: '#A456E8',
                height: '60%',
                width: '90%',
                borderRadius:20
            }}>
            
            <ScrollView>
              <Text h4 h4Style={{marginBottom: 5, color:'white'}}>
                Measurements
              </Text>

              <Text style={styles.text}>
                You can add your measurements by choosing "Add measurements".
                There you are able to fill in your measurements.
              </Text>
              <Text style={styles.text}>
                In Measurements History you are able to see last three records
                of your measurements.
              </Text>
              <Text style={styles.text}></Text>
            </ScrollView>
            <Text style={{alignSelf: 'flex-end'}}>...</Text>
            <View style={styles.buttonContainer}>
              <Button
                title="CLOSE"
                buttonStyle={{
                  backgroundColor: 'transparent',
                  alignSelf: 'center',
                }}
                titleStyle={{color:'white'}}
                onPress={openMeasDialog}
              />
            </View>
          </Dialog>
          {/* Second dialog ends */}

          {/* Third dialog starts */}
          <Dialog
            isVisible={visible3}
            onBackdropPress={openPersonDialog}
            overlayStyle={{
                backgroundColor: '#A456E8',
                height: '60%',
                width: '90%',
                borderRadius:20
            }}>
           
            <ScrollView style={styles.scrollviewstyle}>
              <Text h4 h4Style={{marginBottom: 5, color:'white'}}>
                Profile
              </Text>

              <Text style={styles.text}>
                You can see you profile by choosing the profile silhouette from the
                navbar.
              </Text>
              <Text style={styles.text}>
                In profile page you can see your avatar and some personal
                details. By choosing "edit your profile" you are able to edit
                these details and avatar.
              </Text>
              <Text style={styles.text}>
                If you want to change your avatar, click the avatar and choose which
                one you want to use. Check your personal details and choose
                "Save changes".
              </Text>
            </ScrollView>
            <Text style={{alignSelf: 'flex-end'}}>...</Text>
            <View style={styles.buttonContainer}>
              <Button
                title="CLOSE"
                buttonStyle={{
                  backgroundColor: 'transparent',
                  alignSelf: 'center',
                }}
                titleStyle={{color:'white'}}
                onPress={openPersonDialog}
              />
            </View>
          </Dialog>
          {/* Third dialog ends */}
        </View>
        <View style={styles.bottom}>
          <NavButtons params={props} />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  button1: {
    width: 100,
    height: 95,
    backgroundColor: '#4C40E6',
    borderColor: 'transparent',
    borderRadius: 10,
    margin: 10,
  },
  buttongroup: {
    marginTop: 60,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'justify',
    marginBottom: 15,
    fontSize: 18,
    color:'white',
    fontFamily:'OpenSans-Regular',

  },
  buttonContainer: {
    
    marginBottom: 2,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  scrollviewstyle: {
    width: '95%',
    height: '100%',
  },
  bottom: {
    height: '7%',
  },
});

export default ViewInstructions;
