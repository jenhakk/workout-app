import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Card, Text } from "@rneui/themed";
import {Icon} from '@rneui/themed';
import {getCurrentDate} from '../components/Date.js';


function getQuote() {
    return fetch('https://zenquotes.io/api/today')
        .then(data => data.json())
}

function Motivation() {
    const [list, setList] = useState([]);

    useEffect(() => {
        let show = true;
        getQuote()
            .then(item => {
                if (show) {
                    setList(item)
                }
            })
        return () => show = false;
    }, [])
    return (
        <View>
            {/* Date */}
            <Text style={{color:'white', fontSize:17, textAlign:'center', fontWeight:'700'}}>{getCurrentDate()}</Text>
            <Card containerStyle={{backgroundColor: '#F3F0FC', borderRadius:7}}>
                {/* <Card.Title style={{fontSize:16, color:'black', fontWeight:'700'}}>Todays quote:</Card.Title> */}
                {/* <Card.Divider width={1} color='white'/> */}
                {list.map((q) => {
                    return (
                        <View key={q}>
                            <Text style={{textAlign:'center',fontSize:16, color:'black', fontWeight:'700'}}>Todays quote:</Text>
                            <Text style={{fontSize:13, fontWeight:'700',textAlign:'center', paddingLeft:20, paddingRight:20, paddingBottom:8, color:'black'}}>"{q.q}" </Text>
                            <Icon name="heart-sharp" type="ionicon" color="#7640E6" />
                            
                            <Text style={{fontSize:15, paddingTop:10, fontStyle:'italic', color:'black', textAlign:'center'}}>- {q.a}</Text>
                        </View>
                    );
                })}
            </Card>
        </View>
    )
}

export default Motivation;