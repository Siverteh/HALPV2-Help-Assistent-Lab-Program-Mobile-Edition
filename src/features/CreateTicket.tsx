import { StackScreenProps } from "@react-navigation/stack"
import { RootStackParamList } from "../types"
import { Ticket as TicketProp } from "../types/ticket"
import Ticket from "./Ticket"

const CreateTicket = ({ navigation }: StackScreenProps<RootStackParamList, 'CreateScreen'>) => {

    const handleSubmit = (ticket: TicketProp) => {
        navigation.navigate('Queue', ticket)
    }

    return (
        <Ticket
            onSubmit={handleSubmit}        
        />
    )
}

export default CreateTicket