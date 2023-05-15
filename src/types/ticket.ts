export type Ticket = {
    nickname: string
    description: string
    room: string | null
}


export type TicketExpanded = {
    id: string
    placement: number
} & Ticket


export type TicketWithId = {
    Id: string;
    Nickname: string;
    Description: string;
    Room: string;
}
