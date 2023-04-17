import { Ticket as TicketProp } from "../types/ticket"
import Ticket from "./Ticket"

const CreateTicket = () => {

    const handleSubmit = (ticket: TicketProp) => {
        //navigation.navigate('Queue')
    }

    return (
        <Ticket
            onSubmit={handleSubmit}        
        />
    )
}

export default CreateTicket