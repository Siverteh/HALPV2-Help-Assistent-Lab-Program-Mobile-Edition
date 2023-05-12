export type Ticket = {
    nickname: string
    description: string
    room: string | null
}

export type TicketWithId = {
    Id: string;
    Nickname: string;
    Description: string;
    Room: string;
}