import React, { useState, useEffect } from "react";
import { View,  } from "react-native";
import { Card, Text, adjustsFontSizeToFit} from "@rneui/themed";
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
            {/* Card component for motivation title, quote, icon and author, imported in ViewStart*/}
            <Card containerStyle={{backgroundColor: '#F3F0FC', borderRadius:7}}>
                {list.map((q) => {
                    return (
                        <View key={q}>
                            <Text style={{textAlign:'center',fontSize:17, color:'black', fontFamily:'Lato-Bold', marginBottom:5}}>Todays quote:</Text>
                            <Text style={{adjustsFontSizeToFit:true, fontSize:15,textAlign:'center', fontFamily:'Lato-Regular', paddingLeft:20, paddingRight:20, paddingBottom:8, color:'black'}}>"{q.q}" </Text>
                            <Icon name="heart-sharp" type="ionicon" color="#7640E6" />
                            <Text style={{fontSize:15, paddingTop:8, fontStyle:'italic' ,color:'black', textAlign:'center', fontFamily:'Lato-Regular'}}>- {q.a}</Text>
                        </View>
                    );
                })}
            </Card>
        </View>
    )
}

export default Motivation;