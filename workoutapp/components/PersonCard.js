import React, { useState } from 'react';
import { View, StyleSheet, Image, FlatList } from 'react-native';
import { Text, Card } from '@rneui/base';


const PersonCard = (props) => {
    const imageurl = 'http://10.0.2.2:8080/images/profile/';
    keyExtractor = (item, index) => index.toString();
    const renderItem=({item,index})=>{
       

        let path= imageurl+item.picture;
        
        return (
            <Card containerStyle={{ backgroundColor: 'white', borderRadius: 7 }}>
                <Card.Title style={{ fontSize: 20,  color:'#9F40E6'}}>Your Profile</Card.Title>
                <Card.Divider />
                        <View style={styles.user}>
                            <Image
                                style={styles.image}
                                resizeMode="cover"
                                source={{ uri: path }}
                            />
                            <Text style={styles.fonts}>Name: <Text style={styles.fontsinfo}>{item.firstname} {item.lastname}</Text></Text>
                            <Text style={styles.fonts}>Height: <Text style={styles.fontsinfo}>{item.height}</Text></Text>
                            <Text style={styles.fonts}>Location: <Text style={styles.fontsinfo}>{item.location}</Text></Text>
                            <Text style={styles.fonts}>Slogan: <Text style={styles.fontsinfo}>"{item.slogan}"</Text></Text>
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
        borderRadius:10
    },
    fonts: {
        marginBottom: 30,
        fontSize: 18,
        textAlign:'center',
        color:'#9F40E6',
        fontFamily:'OpenSans-SemiBold',
    },
    fontsinfo: {
        marginBottom: 30,
        fontSize: 18,
        textAlign:'center',
        fontFamily:'OpenSans-Regular',
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