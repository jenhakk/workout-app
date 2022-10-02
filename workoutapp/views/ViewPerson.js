import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Card, Button } from '@rneui/base';
import NavButtons from '../components/NavButtons';
import PersonCard from '../components/PersonCard';

const ViewPerson = (props) => {
    const LOCAL_ADDRESS = "http://10.0.2.2:8080";
    const SERVICE_ADDRESS = LOCAL_ADDRESS;
    const [isLoading, setLoading] = useState(true);
    const [person, setPerson] = useState([]);

    useEffect(() => {
        if (isLoading){
        fetchPerson();
    setLoading(false);    
    }
    }, [])


    const fetchPerson = async () => {
        try {
            let response = await fetch(SERVICE_ADDRESS + "/rest/workoutservice/readperson");
            let json = await response.json();
            
            setPerson(json);
            console.log(json, ' ', person);
        }
        catch (error) {
            console.log(error);
        }
    } 



    return (
        <View style={styles.container}>
            
            <View style={styles.card}>

                <PersonCard person={person} />
            </View>
            <View style={styles.buttoncont}>
                <Button
                    buttonStyle={styles.button}
                    title='EDIT YOUR PROFILE'
                    onPress={() => { props.navigation.navigate('Edit profile', { person: person }) }}></Button>
            
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