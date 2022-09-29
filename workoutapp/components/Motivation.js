import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Card, Text, } from "@rneui/themed";


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
            <Card containerStyle={{backgroundColor: '#C1ACFB', borderRadius:7}}>
                <Card.Title style={{fontSize:22, color:'white', fontWeight:'500'}}>Todays quote:</Card.Title>
                <Card.Divider width={1} color='white'/>
                {list.map((q) => {
                    return (
                        <View key={q}>
                            <Text style={{fontSize:20, textAlign:'center', paddingLeft:20, paddingRight:20, color:'white'}}>"{q.q}" </Text>
                            <Text style={{fontSize:15, paddingLeft:15, fontStyle:'italic', color:'white'}}>- {q.a}</Text>
                        </View>
                    );
                })}
            </Card>
        </View>
    )
}

export default Motivation;