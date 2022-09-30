import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Card } from '@rneui/base';
import NavButtons from '../components/NavButtons';
import PersonCard from '../components/PersonCard';

const ViewPerson = (props) => {
    const [person] = useState([{ 'Firstname': 'Pertti', 'Lastname': 'Rönkkö', 'Location': 'Kempele', 'Slogan': 'Life is my opportunity', 'Picture': 'null' }]);


    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <PersonCard person={person} />
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
        justifyContent: 'flex-start',
        backgroundColor: 'white',
    },
    card: {
        flex: 17,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
});

export default ViewPerson;