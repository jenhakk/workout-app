import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Card, Button } from '@rneui/base';
import NavButtons from '../components/NavButtons';
import PersonCard from '../components/PersonCard';

const ViewPerson = (props) => {
    const [person, setPerson] = useState([{ 'Firstname': 'Pertti', 'Lastname': 'Rönkkö', 'Location': 'Kempele', 'Slogan': 'Life is my opportunity', 'Picture': 'null' }]);

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <PersonCard person={person} />

            </View>
            <View style={styles.buttoncont}>
                <Button
                buttonStyle={styles.button}
                title='EDIT YOUR PROFILE'
                onPress={()=> {props.navigation.navigate('Edit profile', {person: person})}}></Button>
            </View>
            <View style={styles.buttonContainer}>
                <NavButtons params={props} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    buttoncont: {
        flex: 1,
    },
    button: {
        marginTop: 40,
        backgroundColor: '#9F40E6',
        marginBottom: 20,
        borderRadius: 20,
        width: 200,
        height: 70,
        
        
    },
    card: {
        marginTop: 40,
        
    },
    buttonContainer: {
        
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
});

export default ViewPerson;