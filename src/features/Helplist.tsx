import { useState, useEffect, useContext } from 'react'
import React from 'react';
import ListComponent, { Course } from './List'
import { StackScreenProps } from '@react-navigation/stack'
import { AppState, RootStackParamList } from '../types'
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from 'react-native-paper';
import { ThemeContext } from '../Components/ThemeContext';
import { View } from 'react-native'
import { useSignalR } from '../hook/useSignalR';
import { actions } from '../reducers/helplistReducer';
import { actions as archiveActions} from '../reducers/archiveReducer';

const Helplist = ({ route, navigation }:  StackScreenProps<RootStackParamList, 'HelpListScreen'>) => {

  const { course } = route.params
  const { user: { token }} = useSelector((state: AppState) => state.user)
  const { text } = useContext(ThemeContext)
  const state = useSelector((state: AppState) => state.helplist)
  const dispatch = useDispatch()

  const { connection } = useSignalR("AddToGroup", course)

  const dataMapper = (data: any) => data.map((d: any) => {
    return {
    Id: d.id,
    Nickname: d.nickname,
    Description: d.description,
    Room: d.room
}})

  connection.on("AddToHelplist", (Id, Nickname, Description, Room) => 
    {
    dispatch(actions.setHelplist([{
      Id: Id, Nickname: Nickname, Description: Description, Room: Room
    }]))
    }
  )
  useEffect(() => {
    if (!state.isLoaded) {
        fetch(
          `https://chanv2.duckdns.org:7006/api/Helplist?course=${course}`,
          {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          })
            .then(response => response.json())
            .then((data) => {
                dispatch(actions.setHelplist(dataMapper(data)))   
            })
            .finally(() => dispatch(actions.setIsLoaded(true)))
            .catch((error) => console.log('error: ', error))
      }
  }, [course])

  const updateCourse = async (updatedData: Course) => {

      const link = "https://chanv2.duckdns.org:7006/api/Helplist?id=" + updatedData.Id
      
      fetch(link, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([updatedData])
      })
      .then(() => {
        dispatch(actions.filterHelplist(updatedData))
        dispatch(archiveActions.setArchive([updatedData]))
      })
      .catch((error) => console.error(error))
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
      urlLive={`https://chanv2.duckdns.org:7006/api/SSE/Helplist?course=${course}`}
      onUpdate={updateCourse}
      data={state.helplist}
    >
     <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <IconButton
        icon="arrow-left"
        iconColor={text}
        onPress={handleNavigate}     
      />
      <IconButton
        icon="archive-outline"
        iconColor={text}
        onPress={handleClick}     
      />
      </View>
      </ListComponent>
  );
};

export default Helplist;
