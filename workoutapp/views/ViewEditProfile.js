import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Button } from '@rneui/base';
import NavButtons from '../components/NavButtons';
import { Input } from '@rneui/themed';
import PersonLabels from '../components/PersonLabels';

const ViewEditProfile = (props) => {
    const LOCAL_ADDRESS = "http://10.0.2.2:8080";
    const SERVICE_ADDRESS = LOCAL_ADDRESS;

    const [person, setPerson] = useState(props.route.params == undefined ? "" : props.route.params.person);
    const [firstname, setFirstname] = useState("");
    const [height,setHeight] =useState();
    const [lastname, setLastname] = useState("");
    const [location, setLocation] = useState("")
    const [slogan, setSlogan] =useState("");
    

    useEffect(()=>{
    setFirstname(person[0].firstname);
    setLastname(person[0].lastname);
    setLocation(person[0].location);
    setHeight(person[0].height);
    setSlogan(person[0].slogan); 
    }, [])

    const firstnameInputHandler = (enteredText) => {
        setFirstname(enteredText);
        console.log(firstname);
    }
    const lastnameInputHandler = (enteredText) => {
        setLastname(enteredText);
    }
    const heightInputHandler = (enteredText) => {
        let numbered = Number(enteredText);
        setHeight(numbered);
    }
    const locationInputHandler = (enteredText) => {
        setLocation(enteredText);
    }
    const sloganInputHandler = (enteredText) => {
        setSlogan(enteredText);
    }

    const updatePersonList=()=>{
        person[0].firstname=firstname.trim();
        person[0].lastname=lastname.trim();
        person[0].location=location.trim();
        person[0].height=height;
        person[0].slogan=slogan.trim();
        updatePerson();
    }

    const updatePerson=async()=>{
        let json=JSON.stringify({"personid":person[0].personid, "firstname":person[0].firstname,"lastname":person[0].lastname, "height":person[0].height,"location":person[0].location,"picture":person[0].picture});
        console.log(json);
        try{
            let homma=JSON.stringify({"personid":person[0].personid, "firstname":person[0].firstname,"lastname":person[0].lastname, "height":person[0].height,"location":person[0].location,"picture":person[0].picture});
            console.log(homma);
            console.log("ollaanko täällä?");
          let response=await fetch(SERVICE_ADDRESS+"/rest/workoutservice/updateperson/1",
          {
            method:'PUT',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({"personid":person[0].personid, "firstname":person[0].firstname,"lastname":person[0].lastname, "height":Number(person[0].height),"location":person[0].location,"picture":person[0].picture})
          });
          
          let json=await response.json();
          setPerson(json);
        }
        catch(error){
          console.log(error);
        }
      }


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.PersonContainer}>
                <Text style={styles.personHeader}>Edit your profile</Text>
                <View style={{marginBottom:20}}>
                    <Image
                        style={styles.image}
                        resizeMode="cover"
                        source={require('../assets/picture.png' )}
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
                            value={''+height}
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
            <Button
                    buttonStyle={styles.button}
                    title='SAVE CHANGES'
                    onPress={() => updatePersonList()}></Button>
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