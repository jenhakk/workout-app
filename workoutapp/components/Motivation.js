import React, { useState, useEffect } from "react";
import { View, Image } from "react-native";
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
            <Card>
                <Card.Title>Todays quote:</Card.Title>
                <Card.Divider />
                {list.map((q, a) => {
                    return (
                        <View key={q}>
                            <Text>{q.q} -{q.a}</Text>
                        </View>
                    );
                })}
            </Card>
        </View>
    )
}

export default Motivation;