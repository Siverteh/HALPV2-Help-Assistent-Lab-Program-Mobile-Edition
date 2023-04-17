import Ticket from "./Ticket"
import { Ticket as TicketProp } from "../types/ticket"
import { RootStackParamList } from "../types"
import { StackScreenProps } from "@react-navigation/stack"

const EditTicket = ({ navigation }: StackScreenProps<RootStackParamList, 'Edit'>) => {

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