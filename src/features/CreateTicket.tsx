import { StackScreenProps } from "@react-navigation/stack"
import { RootStackParamList } from "../types"
import { Ticket as TicketProp } from "../types/ticket"
import Ticket from "./Ticket"

const CreateTicket = ({ navigation }: StackScreenProps<RootStackParamList, 'CreateScreen'>) => {

    const handleSubmit = async (ticket: TicketProp) => {
        try {
            const response = await fetch("https://chanv2.duckdns.org:7006/api/Ticket", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Cache-Control": "no-cache"
              },
              body: JSON.stringify(ticket)
            });
            if (response.ok) {
              if (response.headers.get("Content-Length") !== "0") {
                const responseData = await response.json();
              }
            } else {
              console.error(`Error: ${response.status} - ${response.statusText}`);
            }
          } catch (error) {
            console.error(error);
          }


        navigation.navigate('Queue', ticket)
    }

    return (
        <Ticket
            onSubmit={handleSubmit}        
        />
    )
}

export default CreateTicket