import { StackScreenProps } from "@react-navigation/stack"
import { RootStackParamList } from "../types"
import { Ticket as TicketProp } from "../types/ticket"
import Ticket from "./Ticket"

const CreateTicket = ({ navigation }: StackScreenProps<RootStackParamList, 'CreateScreen'>) => {

    const handleSubmit = async (ticket: TicketProp) => {
      fetch("https://chanv2.duckdns.org:7006/api/Ticket", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Cache-Control": "no-cache"
              },
              body: JSON.stringify(ticket)
            })
            .then(() => navigation.navigate('Queue', ticket))
            .catch((error) => {
            console.error(error);
          })
    }

    return (
        <Ticket
            onSubmit={handleSubmit}        
        />
    )
}

export default CreateTicket