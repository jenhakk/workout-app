import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from '@rneui/base';
import Motivation from '../components/Motivation';

const ViewStart = () => {

    return(

        <View style={styles.container}>
            <View style={styles.motivation}>
            <Motivation />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
       
    
    },
    motivation: {
        
    }

  });
  

export default ViewStart;