import { useContext } from 'react'
import React from 'react';
import ListComponent from './List'
import { StackScreenProps } from '@react-navigation/stack'
import { AppState, RootStackParamList } from '../types'
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Button } from 'react-native-paper';
import { ThemeContext } from '../Components/ThemeContext';
import { View } from 'react-native'
import { useSignalR } from '../hook/useSignalR';
import { actions as helplistAction } from '../reducers/helplistReducer';
import { actions as archiveActions} from '../reducers/archiveReducer';
import { TicketWithId } from '../types/ticket';
import Styles from "../styles/styles";
import { useArchive } from '../hook/useArchive';
import { useHelplist } from '../hook/useHelplist';


const Helplist = ({ route, navigation }: StackScreenProps<RootStackParamList, 'HelpListScreen'>) => {

  const { course } = route.params

  useArchive(course)
  useHelplist(course)
  
  const { user: { token } } = useSelector((state: AppState) => state.user)
  const { text, background } = useContext(ThemeContext)
  const state = useSelector((state: AppState) => state.helplist)


  const { connection } = useSignalR(course)
  const dispatch = useDispatch()

  connection.on("AddToHelplist", (id, nickname, description, room) => 
    {
      console.log("add to helplist ", id)
    dispatch(helplistAction.addTicket({
      key: course,
      ticket: {
        Id: id,
        Nickname: nickname,
        Description: description,
        Room: room
      }
    }))
    }
  )

  connection.on("AddToArchive", (id, nickname, description, status, room) => 
  {
    console.log("add to archive ", id)
  dispatch(archiveActions.addArchive({
    courseKey: course,
    ticket: {
      Id: id,
      Nickname: nickname,
      Description: description,
      Room: room
    }
  }))
  }
)


connection.on("RemoveFromArchive", (id) => 
{
  console.log("removed from archive ", id)
  dispatch(archiveActions.filterArchive({courseKey: course, ticketId: id}))
}
)


connection.on("UpdateHelplist", (id, nickname, description, room, Course) => {
  console.log("updated by user: ", id)
  if(course !== Course) {
    dispatch(helplistAction.filterHelplist({
      courseKey: course,
      ticketId: id
    }))
  }
  dispatch(helplistAction.updateTicket({
    courseKey: Course,
    ticket: {
      Id: id,
      Nickname: nickname,
      Description: description,
      Room: room
    }
  }))
})

  connection.on("RemovedByUser",
    (id) => dispatch(helplistAction.filterHelplist({courseKey: course, ticketId: id}))
);

connection.on("RemoveFromHelplist",
    (id) =>{ 
    console.log("Remove from helplist", id)
      dispatch(helplistAction.filterHelplist({courseKey: course, ticketId: id}))
    });


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
