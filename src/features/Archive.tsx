import { useContext } from 'react'
import React from 'react';
import ListComponent from './List'
import { useSelector } from 'react-redux';
import { AppState, RootStackParamList } from '../types';
import { IconButton } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
import { ThemeContext } from '../Components/ThemeContext';
import { TicketWithId } from '../types/ticket';
import { useArchive } from '../hook/useArchive';

const Archive = ({ route, navigation }:  StackScreenProps<RootStackParamList, 'ArchiveScreen'>) => {

  const { user: { token }} = useSelector((state: AppState) => state.user)
  const { course } = route.params
  const { text } = useContext(ThemeContext)
  const { isLoaded, archive} = useSelector((state: AppState) => state.archive)

  useArchive(course)

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
