import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Modal, TouchableOpacity, ImageBackground } from 'react-native';
import { Text, Button } from '@rneui/base';
import { Input, Icon } from '@rneui/themed';
import PersonLabels from '../components/PersonLabels';
import NavButtons from '../components/NavButtons';
import { validateNumbers } from '../components/Validation';

const ViewEditProfile = (props) => {
    // Path for avatars
    const path = 'http://10.0.2.2:8080/images/profile/';
    // Path for rest requests
    const LOCAL_ADDRESS = "http://10.0.2.2:8080";
    const SERVICE_ADDRESS = LOCAL_ADDRESS;
    //getting person as a parameter from a ViewPerson
    const [person, setPerson] = useState(props.route.params == undefined ? "" : props.route.params.person);
    const [firstname, setFirstname] = useState("");
    const [height, setHeight] = useState("");
    const [lastname, setLastname] = useState("");
    const [location, setLocation] = useState("")
    const [slogan, setSlogan] = useState("");
    const [picture, setPicture] = useState("");
    const [visibility, setVisibility] = useState(false);
    // first one to get instructions-page button to the header
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
                )
            })
        }
    })
    // second one for adding person details to variables from a person array from route.params
    useEffect(() => {
        setFirstname(person[0].firstname);
        setLastname(person[0].lastname);
        setLocation(person[0].location);
        setHeight(person[0].height);
        setSlogan(person[0].slogan);
        setPicture(person[0].picture);

    }, [])
    // variable for images path, will be used as image source
    const imgpath = path + picture;

    // input handlers for person details
    const firstnameInputHandler = (enteredText) => {
        setFirstname(enteredText);
    }
    const lastnameInputHandler = (enteredText) => {
        setLastname(enteredText);
    }
    const heightInputHandler = (enteredText) => {
        setHeight(validateNumbers(enteredText));
    }
    const locationInputHandler = (enteredText) => {
        setLocation(enteredText);
    }
    const sloganInputHandler = (enteredText) => {
        setSlogan(enteredText);
    }
    // updating person-arrays information from input fields after saving, will be called from button save changes
    const updatePersonList = () => {
        person[0].firstname = firstname.trim();
        person[0].lastname = lastname.trim();
        person[0].location = location.trim();
        person[0].height = Number(height);
        person[0].slogan = slogan.trim();
        person[0].picture = picture;
        updatePerson();
    }
    // updating person details to a database and after that setting new database details to a setPerson
    const updatePerson = async () => {

        try {
            let response =
                await fetch(SERVICE_ADDRESS + "/rest/workoutservice/updateperson",
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ "personid": person[0].personid, "firstname": person[0].firstname, "lastname": person[0].lastname, "slogan": person[0].slogan, "height": person[0].height, "location": person[0].location, "picture": person[0].picture })
                    });

            let json = await response.json();
            setPerson(json);
        }
        catch (error) {
            console.log(error);
        }
        // these next three methods are for modal view
    }
    handleModalOpen = () => {
        setVisibility(true);
    };

    handleModalClose = () => {
        setVisibility(false);
    };

    // this modals method takes the choosed pictures name and set its to a picture variable
    const chooseImage = (img) => {
        setPicture(img);
        handleModalClose();
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ImageBackground
        source={require('../assets/imageback.png')}
        resizeMode="cover"
        style={styles.imageBackground}>
            <View style={styles.PersonContainer}>
                <Text style={styles.personHeader}>Edit your profile</Text>
                <View style={{ marginBottom: 20 }}>
                    <TouchableOpacity onPress={() => handleModalOpen()}>
                        <Image
                            style={styles.image}
                            resizeMode="cover"
                            source={{ uri: imgpath }}
                        />

                    </TouchableOpacity>

                    {/* Here is te opening modal for choosing avatar */}
                    <Modal
                        visible={visibility}
                        setVisibility={setVisibility}
                        onClose={handleModalClose}
                        transparent={true}
                    >
                        {/*Wrapping all items inside container */}

                        <View style={styles.modalContainer}>
                            <View style={styles.modalContainerPic}>
                                <View style={styles.modalStillPic}>
                                    {/*Wrapping first 3 items inside view */}
                                    <View>
                                        <TouchableOpacity onPress={() => chooseImage('pingu.png')}><Image
                                            style={styles.image}

                                            source={{ uri: path + 'pingu.png' }}
                                        /></TouchableOpacity>
                                        <TouchableOpacity onPress={() => chooseImage('pingu2.png')}>
                                            <Image
                                                style={styles.image}

                                                source={{ uri: path + 'pingu2.png' }}
                                            /></TouchableOpacity>
                                        <TouchableOpacity onPress={() => chooseImage('pingu3.png')}>
                                            <Image
                                                style={styles.image}

                                                source={{ uri: path + 'pingu3.png' }}
                                            /></TouchableOpacity>
                                    </View>
                                    {/*Wrapping next 3 items inside view */}
                                    <View>
                                        <TouchableOpacity onPress={() => chooseImage('pingu4.png')}>
                                            <Image
                                                style={styles.image}
                                                resizeMode="cover"
                                                source={{ uri: path + 'pingu4.png' }}
                                            /></TouchableOpacity>
                                        <TouchableOpacity onPress={() => chooseImage('pingu5.png')}>
                                            <Image
                                                style={styles.image}
                                                resizeMode="cover"
                                                source={{ uri: path + 'pingu5.png' }}
                                            /></TouchableOpacity>
                                        <TouchableOpacity onPress={() => chooseImage('pingu6.png')}>
                                            <Image
                                                style={styles.image}
                                                resizeMode="cover"
                                                source={{ uri: path + 'pingu6.png' }}
                                            /></TouchableOpacity>
                                    </View>
                                    {/*Wrapping last 3 items inside view */}
                                    <View>
                                        <TouchableOpacity onPress={() => chooseImage('pingu7.png')}>
                                            <Image
                                                style={styles.image}
                                                resizeMode="cover"
                                                source={{ uri: path + 'pingu7.png' }}
                                            /></TouchableOpacity>
                                        <TouchableOpacity onPress={() => chooseImage('pingu8.png')}>
                                            <Image
                                                style={styles.image}
                                                resizeMode="cover"
                                                source={{ uri: path + 'pingu8.png' }}
                                            /></TouchableOpacity>
                                        <TouchableOpacity onPress={() => chooseImage('pingu9.png')}>
                                            <Image
                                                style={styles.image}
                                                resizeMode="cover"
                                                source={{ uri: path + 'pingu9.png' }}
                                            /></TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <Button onPress={handleModalClose}><Icon name='close'
                                        type='ionicon' /></Button>
                                </View>
                            </View>
                        </View>

                    </Modal>
                    {/* Modal ends */}
                </View>
                <View style={styles.personContainerList}>
                    <View style={styles.personWrapLists}>
                        <PersonLabels />
                    </View>
                    <View style={styles.personWrapLists}>
                        <Input
                            inputContainerStyle={styles.inputStyle}
                            inputStyle={styles.textStyle}
                            placeholder="Firstname..."
                            maxLength={50}
                            onChangeText={firstnameInputHandler}
                            value={firstname}
                        />
                        <Input
                            inputContainerStyle={styles.inputStyle}
                            inputStyle={styles.textStyle}
                            placeholder="Lastname..."
                            maxLength={50}
                            onChangeText={lastnameInputHandler}
                            value={lastname}
                        />
                        <Input
                            inputContainerStyle={styles.inputStyle}
                            inputStyle={styles.textStyle}
                            keyboardType='numeric'
                            placeholder="Height..."
                            maxLength={3}
                            onChangeText={heightInputHandler}
                            value={'' + height}
                        />
                        <Input
                            inputContainerStyle={styles.inputStyle}
                            inputStyle={styles.textStyle}
                            placeholder="Location..."
                            maxLength={50}
                            onChangeText={locationInputHandler}
                            value={location}
                        />
                        <Input
                            inputContainerStyle={styles.inputStyle}
                            inputStyle={styles.textStyle}
                            placeholder="Slogan..."
                            maxLength={200}
                            onChangeText={sloganInputHandler}
                            value={slogan}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    buttonStyle={styles.button}
                    title='SAVE CHANGES'
                    onPress={() => { { props.navigation.navigate('Profile', { person: person }) }; { updatePersonList() } }}></Button>
            </View>
            </ImageBackground>
            <View style={styles.buttonContainerNav}>
                <NavButtons params={props} />
            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    PersonContainer: {
        width: '93%',
        alignSelf: 'center',
        marginVertical: 20,
        borderRadius: 7,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    modalContainer: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'rgba(92, 99,216, 0.5)',
    },
    modalContainerPic: {
        marginTop: 90,
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: 'rgba(92, 99,216, 1)',
    },
    modalStillPic: {
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginLeft: 27,
        marginBottom: 50,
    },
    image: {
        width: 90,
        height:90,
        margin: 10,
        borderRadius:10
    },
    personHeader: {
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 21,
        color:'#9F40E6',
        fontFamily:'OpenSans-SemiBold',
        paddingTop:10
    },
    personContainerList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    personWrapLists: {
        flexDirection: 'column',
    },
    textStyle: {
        textAlign: 'left',
        fontSize: 18,
        borderBottomColor: 'black',
    },
    inputStyle: {
        width: 200,
        height: 37,
    },
    button: {
        backgroundColor: '#9F40E6',
        marginBottom: 10,
        borderRadius: 20,
        width: 200,
        height: 55,
        alignSelf: 'center',
    },
    buttonContainer: {
        marginBottom: 2,
    },
    buttonContainerNav: {
        flex: 1,
    },
});

export default ViewEditProfile;