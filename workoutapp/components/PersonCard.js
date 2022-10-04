import React, { useState } from 'react';
import { View, StyleSheet, Image, FlatList } from 'react-native';
import { Text, Card } from '@rneui/base';


const PersonCard = (props) => {
    const imageurl = 'http://10.0.2.2:8080/images/profile/';
    keyExtractor = (item, index) => index.toString();
    const renderItem=({item,index})=>{
       

        let path= imageurl+item.picture;
        
        return (
            <Card containerStyle={{ backgroundColor: '#C1ACFB', borderRadius: 7 }}>
                <Card.Title style={{ fontSize: 20 }}>Your Profile</Card.Title>
                <Card.Divider />
                        <View style={styles.user}>
                            <Image
                                style={styles.image}
                                resizeMode="cover"
                                source={{ uri: path }}
                            />
                            <Text style={styles.fonts}>Name: {item.firstname} {item.lastname}</Text>
                            <Text style={styles.fonts}>Height: {item.height}</Text>
                            <Text style={styles.fonts}>Location: {item.location}</Text>
                            <Text style={styles.fonts}>Slogan: "{item.slogan}"</Text>
                        </View>
            </Card>
        )
    }
    return (
        <>
        <FlatList
            keyExtractor={keyExtractor}
            data={props.person}
            renderItem={renderItem}
          />   
        </>
    )

}

const styles = StyleSheet.create({
    image: {
        width: 120,
        height: 120,
        marginBottom: 15,
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
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom: 6,
    },
});

export default PersonCard;