import React from 'react';
import { Image, View, FlatList } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { Dimensions } from 'react-native';
import Styles from '../styles/styles';
import { useState, useContext } from "react";
import { AppState, RootStackParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';
import { ThemeContext } from "../Components/GlobalHook";
import { useSelector } from 'react-redux';

const screenHeight = Dimensions.get('window').height;


const LabQueues = ({ navigation }: StackScreenProps<RootStackParamList, 'LabQueues'>) => {
  const { background, text, boxes  } = useContext(ThemeContext)
    const [newCours, setNewCours] = useState([])
    const { user: { token }} = useSelector((state: AppState) => state.user)

    const fetchData = () => {
        fetch('https://chanv2.duckdns.org:7006/api/Courses/all', {
          headers: {
            "Authorization": `Bearer ${token}`
          }
      })
          .then(response => response.json())
          .then(setNewCours)
          .catch(error => {
            console.error(error);
          });
      };

    React.useEffect(() => {
        fetchData();
    }, []);

    const handlePress = (item: string) => {
      navigation.navigate('HelpListScreen', {course: item})
    }

    const renderItem = ({ item }: { item: string }) => {
        return (
          <Button
            style={[{backgroundColor: background, marginBottom: '5%'}]}
            mode="contained"
            contentStyle={{ flexDirection: 'row-reverse', height: screenHeight*0.08,  width: "100%" }}
            labelStyle={[{color: text,  fontSize: 20, textAlign: 'center' }]}
            onPress={() => handlePress(item)}
            key={item}
          >
            {item}
          </Button>
        );
      };
    
  
      return (
        <View style={[{backgroundColor: background, flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 0, paddingBottom: '7%' }]}>
            <Image source={require('.././img/halpy3.png')} style={Styles.logo} />
            <View style={[Styles.boxStyle, {backgroundColor: boxes, alignItems: 'center', width: '90%', height: '70%', borderRadius: 20}]}>
                <View style={{height:"5%"}}/>
                <Text style={[{color: text , fontSize: 24, height: '10%'}]}>Lab Queues</Text>
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
