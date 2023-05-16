import React, { useContext, useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { Button, Text } from 'react-native-paper';

import Styles from '../styles/styles';
import { AppState, RootStackParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';
import { ThemeContext } from '../Components/ThemeContext';
import { useSignalR } from '../hook/useSignalR';
import { asyncStorageHook } from '../hook/asyncStorageHook';
import { useQueue } from '../hook/useQueue';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../reducers/queueReducer';


const Queue = ({ route, navigation }:  StackScreenProps<RootStackParamList, 'Queue'>) => {
  const {height, width} = useWindowDimensions();
  const { background, text, buttons, boxes  } = useContext(ThemeContext)
  // const ticket = route.params;
  
  const {ticket} = useSelector((state: AppState) => state.queue)
  const [queue, setQueue] = useState<number>(ticket.placement)
  const {setItem} = asyncStorageHook()
  const dispatch = useDispatch()
  const { connection, stateConnection } = useSignalR()
  stateConnection()
  connection.on("Queue",
    (id, count, counter, course) => {
      if (ticket.id === id) {
        if (count === 1) {
          setItem('@Ticket', String(id))
          
          dispatch(actions.setIsLoadedQueue(false))
        }
        if (counter === 0) {
          setItem('@Ticket', '')
          setQueue(counter)
        }
        else {
          setQueue(counter)
        }
      }
    }
);

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
      .then(() => {
        setItem('@Ticket', '')
        navigation.navigate('CreateScreen')
      })
      .catch((error) => {
      console.error("Failed to delete ticket: ", error);
    })
  };

  return (
    <View style={{backgroundColor: background, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={[{ justifyContent: 'space-between', alignItems: 'center', backgroundColor: boxes , width: '90%', height: height * 0.75, maxWidth: width * 0.9, maxHeight: height * 0.75, marginTop: -25, borderRadius: 20}]}>
        <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }}>
          <Text style={[{color: text, fontSize: 24 }]}>{`Hi ${ticket.nickname}`}</Text>
          <Text style={[{color: text, fontSize: 20 }]}>You are number</Text>
          <Text style={[{color: text, fontSize: 120 }]}>{queue}</Text>
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
            style={[Styles.buttonStyle, {backgroundColor: buttons.queueButton}]}
            contentStyle={{flexDirection: 'row-reverse', height: "100%", width: "100%"}}>
            CANCEL
            </Button>

            <View style={{height:20}}></View>
        </View>
      </View>
    </View>
  );
};

export default Queue;
