import { useDispatch } from 'react-redux'
import { actions } from '../reducers/helplistReducer';
import { actions as archiveActions} from '../reducers/archiveReducer';
import { useSignalR } from './useSignalR';

export const useListener = (course: string) => {
  const { connection } = useSignalR(course)
  const dispatch = useDispatch()


  //archive
  connection.on("AddToArchive", (id, nickname, description, status, room) => 
  {
    console.log("add to archive ", id)
  dispatch(archiveActions.setArchive({
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
    console.log("removed from archive ", id)
    dispatch(archiveActions.filterArchive({courseKey: course, ticketId: id}))
  }
  )

// helplist
  connection.on("AddToHelplist", (id, nickname, description, room) => 
  {
    console.log("add to helplist ", id)
  dispatch(actions.setHelplist({
    key: course,
    tickets: [{
      Id: id,
      Nickname: nickname,
      Description: description,
      Room: room
    }]
  }))
  }
)


connection.on("UpdateHelplist", (id, nickname, description, room) => {
dispatch(actions.updateTicket({
  courseKey: course,
  ticket: {
    Id: id,
    Nickname: nickname,
    Description: description,
    Room: room
  }
}))
})

connection.on("RemovedByUser",
  (id) => dispatch(actions.filterHelplist({courseKey: course, ticketId: id}))
);

connection.on("RemoveFromArchive",
  (id) => dispatch(actions.filterHelplist({courseKey: course, ticketId: id}))
);

}
  