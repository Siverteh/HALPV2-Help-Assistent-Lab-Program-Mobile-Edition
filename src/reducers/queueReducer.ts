import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { TicketExpanded, TicketWithId } from '../types/ticket'

export type QueueState = {
    ticket: TicketExpanded
    isLoadedQueue: boolean
    isLoadedSignalR: boolean
}

const initialState = {
    ticket: {} as TicketExpanded,
    isLoadedQueue: false,
    isLoadedSignalR: false
}

const queueReducer = createSlice({
    name: 'queue',
    initialState,
    reducers: {
        setTicket: (
            state: QueueState,
            { payload }: PayloadAction<TicketExpanded>
        ) => {
            state.ticket = payload
        },
        setIsLoadedQueue: (
            state: QueueState,
            { payload }: PayloadAction<boolean>
        ) => {
            state.isLoadedQueue = payload
        },
        setIsStatedSignalR: (
            state: QueueState,
            { payload }: PayloadAction<boolean>
        ) => {
            state.isLoadedSignalR = payload
        }
    }

})

export const { actions, reducer } = queueReducer