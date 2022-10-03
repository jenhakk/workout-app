import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Input } from '@rneui/base';
import NavButtons from '../components/NavButtons';
import { Table, Row, Rows } from 'react-native-table-component';
import WorkoutLabels from '../components/WorkoutLabels';

const ViewDuringWorkout = (props) => {

    const tableData = {
        tableHead: ['weights', 'reps', 'duration']
    }

    const [exercise, setExercises] = useState([{ 'id': 1, 'exercise': 'Maastaveto' }, { 'id': 2, 'exercise': 'Pystypunnerrus' }, { 'id': 3, 'exercise': 'Lankutus' }]);
    const [data, setData] = useState(tableData);
    return (
        <View style={{ backgroundColor: 'green' }}>
            <View style={styles.TrainContainer}>
                <Text style={styles.trainHeader}>Fill your train</Text>

                <View>
                    <WorkoutLabels />
                </View>
            </View>
            <Button
                buttonStyle={styles.button}
                title='SAVE TRAIN'
            ></Button>
            <View style={styles.buttonContainer}>
                <NavButtons params={props} />
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    TrainContainer: {
        width: '80%',
        height: '60%',
        alignSelf: 'center',
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 7,
        backgroundColor: '#C1ACFB',
        alignItems: 'flex-start',
    },
    trainHeader: {
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 20,
        fontWeight: 'normal',
    },
    personContainerList: {
        flexDirection: 'row',
        justifyContent: 'space-between',

        backgroundColor: 'blue',
    },
    personWrapLists: {
        flexDirection: 'column',
    },
    trainList: {
        flexDirection: 'row-reverse',

    },

    textStyle: {
        textAlign: 'right',
        fontSize: 10,
        borderBottomColor: 'black',
    },
    buttoncont: {
        flex: 1,
    },
    inputStyle: {
        width: 20,
        height: 10,
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

export default ViewDuringWorkout;