import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Modal, TouchableOpacity } from 'react-native';
import { Text, Button } from '@rneui/base';
import { Input, Icon } from '@rneui/themed';
import PersonLabels from '../components/PersonLabels';
import NavButtons from '../components/NavButtons';

const ViewEditProfile = (props) => {
    const path = 'http://10.0.2.2:8080/images/profile/';
    const LOCAL_ADDRESS = "http://10.0.2.2:8080";
    const SERVICE_ADDRESS = LOCAL_ADDRESS;

    const [person, setPerson] = useState(props.route.params == undefined ? "" : props.route.params.person);
    const [firstname, setFirstname] = useState("");
    const [height, setHeight] = useState("");
    const [lastname, setLastname] = useState("");
    const [location, setLocation] = useState("")
    const [slogan, setSlogan] = useState("");
    const [picture, setPicture] = useState("");
    const [visibility, setVisibility] = useState(false);

    useEffect(() => {
        setFirstname(person[0].firstname);
        setLastname(person[0].lastname);
        setLocation(person[0].location);
        setHeight(person[0].height);
        setSlogan(person[0].slogan);
        setPicture(person[0].picture);

    }, [])

    const imgpath = path + picture;

    const firstnameInputHandler = (enteredText) => {
        setFirstname(enteredText);
        console.log(firstname);
    }
    const lastnameInputHandler = (enteredText) => {
        setLastname(enteredText);
    }
    const heightInputHandler = (enteredText) => {
        setHeight(enteredText);
    }
    const locationInputHandler = (enteredText) => {
        setLocation(enteredText);
    }
    const sloganInputHandler = (enteredText) => {
        setSlogan(enteredText);
    }

    const updatePersonList = () => {
        person[0].firstname = firstname.trim();
        person[0].lastname = lastname.trim();
        person[0].location = location.trim();
        person[0].height = Number(height);
        person[0].slogan = slogan.trim();
        person[0].picture = picture;
        updatePerson();
    }

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

    }
    handleModalOpen = () => {
        setVisibility(true);
    };

    handleModalClose = () => {
        setVisibility(false);
    };

    const chooseImage = (uri) => {
        setPicture(uri);
        handleModalClose();

    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
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

                    {/* There is te opening modal: */}
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
                            onChangeText={firstnameInputHandler}
                            value={firstname}
                        />
                        <Input
                            inputContainerStyle={styles.inputStyle}
                            inputStyle={styles.textStyle}
                            placeholder="Lastname..."
                            onChangeText={lastnameInputHandler}
                            value={lastname}
                        />
                        <Input
                            inputContainerStyle={styles.inputStyle}
                            inputStyle={styles.textStyle}
                            placeholder="Height..."
                            onChangeText={heightInputHandler}
                            value={'' + height}
                        />
                        <Input
                            inputContainerStyle={styles.inputStyle}
                            inputStyle={styles.textStyle}
                            placeholder="Location..."
                            onChangeText={locationInputHandler}
                            value={location}
                        />
                        <Input
                            inputContainerStyle={styles.inputStyle}
                            inputStyle={styles.textStyle}
                            placeholder="Slogan..."
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
        backgroundColor: '#C1ACFB',
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
        width: 80,
        height: 80,
        margin: 10,
    },
    personHeader: {
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 20,
        fontWeight: 'normal',
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
    buttoncont: {
        flex: 1,
    },
    inputStyle: {
        width: 200,
        height: 35,
    },
    button: {
        backgroundColor: '#9F40E6',
        marginBottom: 20,
        borderRadius: 20,
        width: 200,
        height: 70,
        alignSelf: 'center',
    },
    buttonContainer: {
        marginTop: 8,
        marginBottom: 2,
    },
    buttonContainerNav: {
        flex: 1,
        marginTop:10,
    },
});

export default ViewEditProfile;