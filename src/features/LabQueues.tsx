import React from 'react';
import { View, FlatList, useWindowDimensions } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { useState, useContext } from "react";
import { AppState, RootStackParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';
import { ThemeContext } from "../Components/ThemeContext";
import { useSelector } from 'react-redux';
import { Logo } from '../Components/CustomComponents';

const LabQueues = ({ navigation }: StackScreenProps<RootStackParamList, 'LabQueues'>) => {
  const {height} = useWindowDimensions();
  const { background, text, boxes  } = useContext(ThemeContext)
    const [courses, setCourses] = useState([])
    const { user: { token, email }} = useSelector((state: AppState) => state.user)

    const fetchData = () => {
        fetch('https://chanv2.duckdns.org:7006/api/User/Courses', {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({email: email})
      })
          .then(response => response.json())
          .then(setCourses)
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
            contentStyle={{ flexDirection: 'row-reverse', height: height*0.08,  width: "100%" }}
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
            <Logo/>
            <View style={[{backgroundColor: boxes, alignItems: 'center', width: '90%', height: '70%', borderRadius: 20}]}>
                <View style={{height:"5%"}}/>
                <Text style={[{color: text , fontSize: 24, height: '10%'}]}>Lab Queues</Text>
                <FlatList
                    data={courses}
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
