export type Ticket = {
    nickname: string
    description: string
    room: string
    id: string
    placement: number
}

export type TicketWithId = {
    Id: string;
    Nickname: string;
    Description: string;
    Room: string;
}