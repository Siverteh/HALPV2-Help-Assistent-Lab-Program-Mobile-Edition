import Ticket from "./Ticket"
import { Ticket as TicketProp, TicketExpanded as TicketExpandedProp  } from "../types/ticket"
import { AppState, RootStackParamList } from "../types"
import { StackScreenProps } from "@react-navigation/stack"
import { useDispatch, useSelector } from "react-redux"
import { actions } from "../reducers/queueReducer"


const EditTicket = ({ route, navigation }: StackScreenProps<RootStackParamList, 'Edit'>) => {

    //const ticket = route.params;
    const {ticket} = useSelector((state: AppState) => state.queue)

    const dispatch = useDispatch()
    const handleSubmit = async (ticketProp: TicketExpandedProp) => {

          fetch(`https://chanv2.duckdns.org:7006/api/Ticket?id=${ticket.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Cache-Control": "no-cache"
              },
              body: JSON.stringify({nickname: ticketProp.nickname, room: ticketProp.room, description: ticketProp.description})
            })
            .then((res) => res.json())
            .then((res) => {
              if (res.status !== 404) {
                dispatch(actions.setTicket(res))
                navigation.navigate('Queue', ticketProp as any)
              }
            })
            .catch((error) => {
            console.error("Failed to edit ticket: ", error);
          })
    }

    return (
        <Ticket
            ticket={ticket}
            onSubmit={handleSubmit}

        />
    )
}

export default EditTicket
