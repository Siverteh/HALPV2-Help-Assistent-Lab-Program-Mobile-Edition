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

const Archive = ({ route, navigation }:  StackScreenProps<RootStackParamList, 'ArchiveScreen'>) => {

  const { user: { token }} = useSelector((state: AppState) => state.user)
  const { course } = route.params
  const { text } = useContext(ThemeContext)
  const { isLoaded, archive} = useSelector((state: AppState) => state.archive)
  const dispatch = useDispatch()
  const { connection, startInvoke } = useSignalR(course)

  useEffect(() => {
    if (!isLoaded[course]) {
    fetch(`https://chanv2.duckdns.org:7006/api/Archive?course=${course}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then((data) => {
            const newDataMapper = data.map((d: any) => {
                return {
                Id: d.id,
                Nickname: d.nickname,
                Description: d.description,
                Room: d.room
            }})
             dispatch(actions.setArchive({courseKey: course, tickets: newDataMapper}))
        })
        .finally(() => dispatch(actions.setIsLoaded({key: course, isLoaded: true})))
        .catch((error) => {
          console.error("Failed to get archive list", error)
        })
      }
  }, [course])

  connection.on("AddToArchive", (id, nickname, description, status, room) => 
  {
    console.log("add to archive ", id)
  dispatch(actions.setArchive({
    courseKey: course,
    tickets: [{
      Id: id,
      Nickname: nickname,
      Description: description,
      Room: room
    }]
  }))
  }
)

  connection.on("RemoveFromArchive", (id) => 
  {
    console.log("removed from helplist ", id)
    dispatch(actions.filterArchive({courseKey: course, ticketId: id}))
    //dispatch(archiveActions.setArchive({courseKey: Course, tickets: [ticket]}))
  }
  )

  const invokeUpdate = (id: string) => {
    connection.start()
          .then(() => connection.invoke("RemoveFromArchive", id))
          .catch(err => console.error(err.toString()));
  }

  const updateCourse = (updatedData: TicketWithId) => {

    const id = updatedData.Id
  
      const link = "https://chanv2.duckdns.org:7006/api/Archive?id=" + updatedData.Id
      
      fetch(link, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify([updatedData])
      })
      .then(() => {
        invokeUpdate(id)
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
