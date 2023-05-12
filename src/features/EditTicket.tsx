import Ticket from "./Ticket"
import { Ticket as TicketProp } from "../types/ticket"
import { RootStackParamList } from "../types"
import { StackScreenProps } from "@react-navigation/stack"

const EditTicket = ({ route, navigation }: StackScreenProps<RootStackParamList, 'Edit'>) => {

    const ticket = route.params;

    const handleSubmit = async (ticketProp: TicketProp) => {

          fetch("https://chanv2.duckdns.org:7006/api/Ticket", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Cache-Control": "no-cache"
              },
              body: JSON.stringify(ticketProp)
            })
            .then(() => navigation.navigate('Queue', {...ticketProp, id: ticket.id}))
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