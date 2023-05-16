import { useEffect, useContext } from 'react'
import React from 'react';
import ListComponent from './List'
import { useDispatch, useSelector } from 'react-redux';
import { AppState, RootStackParamList } from '../types';
import { IconButton } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
import { ThemeContext } from '../Components/ThemeContext';
import { actions } from '../reducers/archiveReducer';
import { actions as helplistActions } from '../reducers/helplistReducer';
import { TicketWithId } from '../types/ticket';
import { useSignalR } from '../hook/useSignalR';
import { useListener } from '../hook/useListener';
import { useArchive } from '../hook/useArchive';

const Archive = ({ route, navigation }:  StackScreenProps<RootStackParamList, 'ArchiveScreen'>) => {

  const { user: { token }} = useSelector((state: AppState) => state.user)
  const { course } = route.params
  const { text } = useContext(ThemeContext)
  const { isLoaded, archive} = useSelector((state: AppState) => state.archive)
  const dispatch = useDispatch()
  const { connection } = useSignalR(course)

  useArchive(course)
  // useListener(course)


  const invokeUpdate = (id: string) => {
    connection.stop()
    connection.start()
          .then(() => connection.invoke("RemoveFromArchive", id))
          .catch(err => console.error(err.toString()));
  }

  const updateCourse = (updatedData: TicketWithId) => {

    const id = updatedData.Id
      const link = "https://chanv2.duckdns.org:7006/api/Archive?id=" +  id
      
      fetch(link, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify([updatedData])
      })
      .then(() => {
        // invokeUpdate(id)
        // dispatch(actions.filterArchive({courseKey: course, ticketId: updatedData.Id}))
        // dispatch(helplistActions.setHelplist({key: course, tickets: [updatedData]}))
      })
      .catch((error) => console.error("Failed to update ticket from archive: ", error))
  };

  const handleNavigate = () => {
    navigation.navigate('HelpListScreen', { course })
  }
  
  return (
    <ListComponent
      title={`ARCHIVE ${course}`}
      loading={!isLoaded[course]}
      onUpdate={updateCourse}
      data={archive[course] ?? []}
    >
      <IconButton
        icon="arrow-left"
        iconColor={text}
        onPress={handleNavigate}     
      />
    </ListComponent>
  );
};

export default Archive;
