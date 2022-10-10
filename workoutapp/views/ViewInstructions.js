import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/base';
import {

    Dialog,
    CheckBox,
    ListItem,
    Avatar,
} from '@rneui/themed';
import NavButtons from '../components/NavButtons';
import PersonCard from '../components/PersonCard';

const ViewInstructions = (props) => {

    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [visible3, setVisible3] = useState(false);


    const CustomTitleWorkout = () => {
        return (
            <View style={{ flexDirection: 'column' }}>
                <Icon
                    name="weight-lifter"
                    type="material-community"
                    color="white"
                    size={45}
                />
                <Text
                    style={{
                        fontSize: 15,
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
            <View style={{ flexDirection: 'column' }}>
                <Icon
                    name="scale-bathroom"
                    type="material-community"
                    color="white"
                    size={45}
                />
                <Text
                    style={{
                        fontSize: 15,
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
            <View style={{ flexDirection: 'column' }}>
                <Icon
                    name="head"
                    type="material-community"
                    color="white"
                    size={45}
                />
                <Text
                    style={{
                        fontSize: 15,
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
    }
    const openMeasDialog = () => {
        setVisible2(!visible2);
    }
    const openPersonDialog = () => {
        setVisible3(!visible3);
    }

    return (
        <ImageBackground
            source={require('../assets/imageback.png')}
            resizeMode="cover"
        ><View style={{ height: '100%' }}>
                <View style={{ flex: 1 }}><Text h2>INSTRUCTIONS</Text>
                    <Text>Here you can see the Instructions for this application. Choose above what </Text>
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
                        overlayStyle={{ backgroundColor: 'rgba(92, 99,216, 0.6)', height: '50%', width: '100%' }}

                    ><ImageBackground
                        source={require('../assets/imageback.png')}
                        resizeMode="cover"
                    >

                            <Dialog.Title title="Workout" />
                        </ImageBackground>
                        <ScrollView style={styles.scrollviewstyle}>
                            <Text h4 h4Style={{ marginBottom: 5 }}>Starting a new workout</Text>

                            <Text style={styles.text}>Choose "Start workout" and choose the exercises you're gonna do. Once you have choosed exercises,
                                press the "start" button.
                            </Text>
                            <Text style={styles.text}>Next you can see a view where you can fill the details about your workout: Repeats, Weights and Duration. Every exercise consists three sets.</Text>
                            <Text style={styles.text}>Once you have filled all three sets press "Save". When you have filled and saved all of the exercises choose "Finish workout". After that you will receive a summary of your training.</Text>
                        </ScrollView>
                        <Text style={{ alignSelf: 'flex-end' }}>...</Text>
                        <View style={styles.buttonContainer}>
                            <Button title='close' buttonStyle={{ backgroundColor: 'transparent', alignSelf: 'center' }} onPress={openWorkoutDialog} />
                        </View>
                    </Dialog>
                    {/* First dialog ends */}

                    {/* Second dialog starts */}
                    <Dialog
                        isVisible={visible2}
                        onBackdropPress={openMeasDialog}
                        overlayStyle={{ backgroundColor: 'rgba(92, 99,216, 0.6)', height: '50%', width: '100%' }}

                    ><ImageBackground
                        source={require('../assets/imageback.png')}
                        resizeMode="cover"
                    >

                            <Dialog.Title title="Measurements" />
                        </ImageBackground>
                        <ScrollView style={styles.scrollviewstyle}>
                            <Text h4 h4Style={{ marginBottom: 5 }}>Measurements</Text>

                            <Text style={styles.text}>You can add your measurements by choosing "add measurements". There you are able to fill in your measurements.
                            </Text>
                            <Text style={styles.text}>In measurements history you are able to see last three records of measurements.</Text>
                            <Text style={styles.text}></Text>
                        </ScrollView>
                        <Text style={{ alignSelf: 'flex-end' }}>...</Text>
                        <View style={styles.buttonContainer}>
                            <Button title='close' buttonStyle={{ backgroundColor: 'transparent', alignSelf: 'center' }} onPress={openMeasDialog} />
                        </View>
                    </Dialog>
                    {/* Second dialog ends */}

                    {/* Third dialog starts */}
                    <Dialog
                        isVisible={visible3}
                        onBackdropPress={openPersonDialog}
                        overlayStyle={{ backgroundColor: 'rgba(92, 99,216, 0.6)', height: '50%', width: '100%' }}

                    ><ImageBackground
                        source={require('../assets/imageback.png')}
                        resizeMode="cover"
                    >

                            <Dialog.Title title="Profile" />
                        </ImageBackground>
                        <ScrollView style={styles.scrollviewstyle}>
                            <Text h4 h4Style={{ marginBottom: 5 }}>Profile</Text>

                            <Text style={styles.text}>You can see you profile bt choosing profile silhouette from the navbar.
                            </Text>
                            <Text style={styles.text}>In profile page you can see your avatar and some personal details. By choosing "edit your profile" you are able to edit these details and avatar.</Text>
                            <Text style={styles.text}>If you want to change your icon, click the icon and choose which one you want to use. Check your personal details and choose "save changes".</Text>
                        </ScrollView>
                        <Text style={{ alignSelf: 'flex-end' }}>...</Text>
                        <View style={styles.buttonContainer}>
                            <Button title='close' buttonStyle={{ backgroundColor: 'transparent', alignSelf: 'center' }} onPress={openPersonDialog} />
                        </View>
                    </Dialog>
                    {/* Third dialog ends */}






                </View>
                <View style={styles.bottom}>
                    <NavButtons params={props} />
                </View>
            </View>
        </ImageBackground>


    )


}

const styles = StyleSheet.create({
    button1: {
        width: 125,
        height: 120,
        backgroundColor: '#4C40E6',
        borderColor: 'transparent',
        borderRadius: 30,
        margin: 3,
    },
    buttongroup: {
        marginTop: 60,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    text: {
        textAlign: 'justify',
        marginBottom: 5,
        fontSize: 16,
    },
    buttonContainer: {
        marginTop: 8,
        marginBottom: 2,
        alignSelf: 'center',
        flexDirection: 'row',
    },
    scrollviewstyle: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgb(207, 157, 221)',
    },
    bottom: {
        height: '7%'
    },
});

export default ViewInstructions;