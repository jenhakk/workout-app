import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Button } from '@rneui/base';
import NavButtons from '../components/NavButtons';
import { Input } from '@rneui/themed';
import PersonLabels from '../components/PersonLabels';

const ViewEditProfile = (props) => {

    const [person, setPerson] = useState(props.route.params == undefined ? "" : props.route.params.person);
    console.log(person);

    const firstnameInputHandler = (enteredText) => {
        setPerson(enteredText);
    }
    const lastnameInputHandler = (enteredText) => {
        setPerson(enteredText);
    }
    const locationInputHandler = (enteredText) => {
        setPerson(enteredText);
    }
    const sloganInputHandler = (enteredText) => {
        setPerson(enteredText);
    }


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.PersonContainer}>
                <Text style={styles.personHeader}>Edit your profile</Text>
                <View style={{marginBottom:20}}>
                    <Image
                        style={styles.image}
                        resizeMode="cover"
                        source={{ uri: 'https://www.drodd.com/images11/meme-faces14.png', }}
                    />
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
                            value={person[0].Firstname}
                        />
                        <Input
                            inputContainerStyle={styles.inputStyle}
                            inputStyle={styles.textStyle}
                            placeholder="Lastname..."
                            onChangeText={lastnameInputHandler}
                            value={person[0].Lastname}
                        />
                        <Input
                            inputContainerStyle={styles.inputStyle}
                            inputStyle={styles.textStyle}
                            placeholder="Location..."
                            onChangeText={locationInputHandler}
                            value={person[0].Location}
                        />
                        <Input
                            inputContainerStyle={styles.inputStyle}
                            inputStyle={styles.textStyle}
                            placeholder="Slogan..."
                            onChangeText={sloganInputHandler}
                            value={person[0].Slogan}
                        />
                    </View>
                </View>         
            </View>
            <Button
                    buttonStyle={styles.button}
                    title='SAVE CHANGES'
                    onPress={() => settingPerson()}></Button>
            <View style={styles.buttonContainer}>
                <NavButtons params={props} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    PersonContainer: {
        width: '85%',
        alignSelf: 'center',
        marginVertical: 40,
        paddingVertical: 25,
        paddingHorizontal: 30,
        borderRadius: 7,
        backgroundColor: '#C1ACFB',
        alignItems: 'center',
    },
    image: {
        width: 80,
        height: 80,
        marginBottom: 10,
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
        marginTop: 5,
        backgroundColor: '#9F40E6',
        marginBottom: 20,
        borderRadius: 20,
        width: 200,
        height: 70,
        alignSelf: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
});

export default ViewEditProfile;