import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Card } from '@rneui/base';


const PersonCard = (props) => {

    return (
        <>
            <Card containerStyle={{backgroundColor: '#C1ACFB', borderRadius:7}}>
                <Card.Title style={{fontSize:20}}>Your Profile</Card.Title>
                <Card.Divider />
                <View style={styles.user}>
                    <Image
                        style={styles.image}
                        resizeMode="cover"
                        source={require('../assets/picture.png' )}
                    />
                </View>
                {props.person.map((person, i) => {
                    return (
                        <View key={i} style={styles.details}>

                            <Text style={styles.fonts}>Name: {person.firstname} {person.lastname}</Text>
                            <Text style={styles.fonts}>Height: {person.height}</Text>
                            <Text style={styles.fonts}>Location: {person.location}</Text>
                            <Text style={styles.fonts}>Slogan: "{person.slogan}"</Text>
                        </View>
                    );
                })}
            </Card>
        </>
    )

}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 120,
        marginBottom: 10,
    },
    fonts: {
        marginBottom: 30,
        fontSize: 18,
    },
    details: {
        marginTop: 10,
        flexDirection: 'column',
        alignItems: 'center',
    },
    user: {
        marginTop: 10,
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom: 6,
    },
});

export default PersonCard;