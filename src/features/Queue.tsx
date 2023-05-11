import React, { useContext } from 'react';
import { View, useColorScheme } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { Dimensions } from 'react-native';
import Styles from '../styles/styles';
import { RootStackParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';
import { ThemeContext } from '../Components/ThemeContext';
import { Logo } from '../Components/CustomComponents';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Queue = ({ route, navigation }:  StackScreenProps<RootStackParamList, 'Queue'>) => {

  const { background, text, buttons, boxes  } = useContext(ThemeContext)

  const ticket = route.params;

  const handleEdit = () => {
    navigation.navigate('Edit', ticket)
  };

  const handleCancel = () => {
    fetch("https://chanv2.duckdns.org:7006/api/Ticket", {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Cache-Control": "no-cache"
              },
              body: JSON.stringify({id: ticket.id})
            })
            .then(() => navigation.navigate('CreateScreen'))
            .catch((error) => {
            console.error(error);
          })
  };

  return (
    <View style={{backgroundColor: background, flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 0, paddingBottom: 100 }}>
      <Logo/>
      <View style={[{ justifyContent: 'space-between', alignItems: 'center', backgroundColor: boxes , width: '90%', height: screenHeight * 0.75, maxWidth: screenWidth * 0.9, maxHeight: screenHeight * 0.75, marginTop: -25, borderRadius: 20}]}>
        <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }}>
          <Text style={[{color: text, fontSize: 24 }]}>{`Hi ${ticket.name}`}</Text>
          <Text style={[{color: text, fontSize: 20 }]}>You are number</Text>
          <Text style={[{color: text, fontSize: 120 }]}>1</Text>
          <Text style={[{color: text, fontSize: 20 }]}>in the queue</Text>
        </View>
        <View style={{ alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center' }}>
          <Button 
            onPress={handleEdit} 
            textColor={text}
            style={[Styles.buttonStyle,{ backgroundColor: buttons.queueButton}]}
            contentStyle={{flexDirection: 'row-reverse', height: "100%", width: "100%"}}>
            EDIT TICKET          
            </Button>
            <View style={{height:20}}></View>
            <Button 
            onPress={handleCancel} 
            textColor={text}
            style={[{backgroundColor: buttons.queueButton}]}
            contentStyle={{flexDirection: 'row-reverse', height: "100%", width: "100%"}}>
            CANCEL          
            </Button>
        </View>
      </View>
    </View>
  );
};

export default Queue;
