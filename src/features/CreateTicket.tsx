import { Ticket as TicketProp } from "../types/ticket"
import Ticket from "./Ticket"

const CreateTicket = ({ navigation }: any) => {

    const handleSubmit = (ticket: TicketProp) => {
        console.log('ticket: ', ticket)
        navigation.navigate('Queue', ticket)
    }

    return (
        <Ticket
            onSubmit={handleSubmit}        
        />
    )
}

export default CreateTicket