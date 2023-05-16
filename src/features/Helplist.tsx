import { useEffect, useContext, useState } from 'react'
import React from 'react';
import ListComponent from './List'
import { StackScreenProps } from '@react-navigation/stack'
import { AppState, RootStackParamList } from '../types'
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Button } from 'react-native-paper';
import { ThemeContext } from '../Components/ThemeContext';
import { View, Text } from 'react-native'
import { useSignalR } from '../hook/useSignalR';
import { actions } from '../reducers/helplistReducer';
import { actions as archiveActions} from '../reducers/archiveReducer';
import { TicketWithId } from '../types/ticket';
import Styles from "../styles/styles";
import { useListener } from '../hook/useListener';


const Helplist = ({ route, navigation }: StackScreenProps<RootStackParamList, 'HelpListScreen'>) => {

  const { course } = route.params
  const { user: { token } } = useSelector((state: AppState) => state.user)
  const { text, background } = useContext(ThemeContext)
  const state = useSelector((state: AppState) => state.helplist)
  const dispatch = useDispatch()

  const { connection } = useSignalR(course)
  useListener(course)

  const dataMapper = (data: any) => data.map((d: any) => {
    return {
      Id: d.id,
      Nickname: d.nickname,
      Description: d.description,
      Room: d.room
    }
  })


  useEffect(() => {
    if (!state.isLoadedCourse[course]) {
        fetch(
          `https://chanv2.duckdns.org:7006/api/Helplist?course=${course}`,
          {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          })
            .then(response => response.json())
            .then((data) => {
                dispatch(actions.setHelplist({key: course, tickets: dataMapper(data)}))
            })
            .finally(() => dispatch(actions.setIsLoaded({key: course, isLoaded: true})))
            .catch((error) => {
              console.error("Failed to get help list", error)
            })
            .finally(() => dispatch(actions.setIsLoaded({key: course, isLoaded: true})))
            .catch((error) => {
              console.error("Failed to get helplist", error)
            })
      }
  }, [course])

  const invokeUpdate = (id: string) => {
    connection.stop()
    connection.start()
          .then(() => connection.invoke("RemoveFromHelplist", id))
          .catch(err => console.error(err.toString()))
  }


  const updateCourse = (updatedData: TicketWithId) => {
    const id = updatedData.Id

    const link = "https://chanv2.duckdns.org:7006/api/Helplist?id=" + id

    fetch(link, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([updatedData])
    })
      .then(() => {
        
        invokeUpdate(id)
        dispatch(actions.filterHelplist({courseKey: course, ticketId: updatedData.Id}))
        // dispatch(archiveActions.setArchive({courseKey: course, tickets: [updatedData]}))
      })
      .catch((error) => console.error("Failed to update ticket from helplist: ", error))
  }

  const handleClick = () => {
    navigation.navigate('ArchiveScreen', { course })
  }

  const handleNavigate = () => {
    navigation.navigate('LabQueues')
  }

  return (
    <ListComponent
      title={`HELPLIST ${course}`}
      loading={!state.isLoadedCourse[course]}
      onUpdate={updateCourse}
      data={state.helplist[course] ?? []}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
          <IconButton
            icon="arrow-left"
            iconColor={text}
            onPress={handleNavigate}
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end'}}>
          <Button style={[Styles.buttonStyle, { backgroundColor: background, margin: '2%' }]}
            mode="contained"
            textColor={text}
            onPress={handleClick}
            contentStyle={{ flexDirection: 'row-reverse', height: "100%", width: "100%" }}
            icon= "archive-outline">
            Archive
          </Button>
        </View>
      </View>
    </ListComponent>
  );
};

export default Helplist;
