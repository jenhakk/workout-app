import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from '@rneui/base';
import NavButtons from '../components/NavButtons';
import { Table, Row, Rows } from 'react-native-table-component';

const ViewDuringWorkout = (props) => {

    const tableData = {
        tableHead: ['weights', 'reps', 'duration']
    }

    const [exercise, setExercises] = useState([{ 'id': 1, 'exercise': 'Maastaveto' }, { 'id': 2, 'exercise': 'Pystypunnerrus' }, { 'id': 3, 'exercise': 'Lankutus' }]);
    const [data, setData] = useState(tableData);
    return (
        <View style={styles.container}>
            
            <View style={{ width: '60%', marginTop: 200, alignItems: 'stretch', flexDirection: 'column' }}><Text>Exercise 1 : {exercise[0].exercise}</Text></View>
            <View style={{ width: '60%', marginTop: 20, alignItems: 'stretch', flexDirection: 'column' }}>

                <Table borderStyle={{ borderWidth: 4, borderColor: 'teal' }}>
                    <Row data={data.tableHead} style={styles.head} textStyle={styles.headText} />
                    <Rows />
                </Table>
            </View>
            <View>
                <NavButtons />
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
    head: {
        backgroundColor: 'purple',
    },
    headText: {
        fontSize: 16,
        color: 'white',
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

export default ViewDuringWorkout;