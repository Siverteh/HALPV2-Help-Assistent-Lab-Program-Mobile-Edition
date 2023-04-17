import React from 'react';
import { Image, View, TouchableOpacity, useColorScheme, ScrollView, FlatList } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { Dimensions } from 'react-native';
import Styles from '../styles/styles';
import { useState } from "react";

const screenHeight = Dimensions.get('window').height;



const LabQueues = () => {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    const backgroundStyle = isDarkMode ? Styles.dm_background : Styles.lm_background;
    const textStyle = isDarkMode ? Styles.dm_text : Styles.lm_text;
    const boxesStyle = isDarkMode ? Styles.dm_boxes : Styles.lm_boxes;
    const [newCours, setNewCours] = useState([]);

    const fetchData = () => {
        fetch('https://chanv2.duckdns.org:7006/api/Courses/all')
          .then(response => response.json())
          .then(data => {
            setNewCours(data);
          })
          .catch(error => {
            console.error(error);
          });
      };

    React.useEffect(() => {
        fetchData();
        const interval = setInterval(() => {
            fetchData();
        }, 6000); // 1 minute interval
        return () => clearInterval(interval);
    }, []);

    const renderItem = ({ item }: { item: string }) => {
        return (
          <Button
            style={[backgroundStyle, {marginBottom: '5%'}]}
            mode="contained"
            contentStyle={{ flexDirection: 'row-reverse', height: screenHeight*0.08,  width: "100%" }}
            labelStyle={[textStyle, { fontSize: 20, textAlign: 'center' }]}
            onPress={()=>console.log(item)}
            key={item}
          >
            {item}
          </Button>
        );
      };
    
  
      return (
        <View style={[backgroundStyle, { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 0, paddingBottom: '7%' }]}>
            <Image source={require('.././img/halpy3.png')} style={Styles.logo} />
            <View style={{ alignItems: 'center', ...boxesStyle, width: '90%', height: '70%', borderRadius: 20}}>
                <View style={{height:"5%"}}/>
                <Text style={[textStyle, { fontSize: 24, height: '10%'}]}>Lab Queues</Text>
                <FlatList
                    data={newCours}
                    renderItem={renderItem}
                    style={{height:"100%"}}
                    keyExtractor={(item) => item}
                    showsVerticalScrollIndicator={false}
                />
                <View style={{height:"5%"}}/>
            </View>
        </View>
      );
  };
  

export default LabQueues;
