import Ticket from "./Ticket"
import { Ticket as TicketProp } from "../types/ticket"

const EditTicket = () => {

    const handleSubmit = (ticket: TicketProp) => {
        //navigation.navigate('Details')
    }

    return (
        <Ticket
            ticket={{} as any}
            onSubmit={handleSubmit}
            
        />
    )
}

export default EditTicket