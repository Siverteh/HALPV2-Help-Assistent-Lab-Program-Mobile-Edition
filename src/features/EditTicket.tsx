import Ticket from "./Ticket"
import { Ticket as TicketProp } from "../types/ticket"

const EditTicket = ({ navigation }: any) => {

    const handleSubmit = (ticket: TicketProp) => {
        navigation.navigate('Queue', ticket)
    }

    return (
        <Ticket
            ticket={{} as any}
            onSubmit={handleSubmit}
            
        />
    )
}

export default EditTicket