import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { TicketWithId } from '../types/ticket'

export type ArchiveState = {
    archive: {[courseKey: string]: Array<TicketWithId>},
    isLoaded: {[key: string]: boolean}
}

const initialState = {
    archive: {},
    isLoaded: {}
}

const archiveReducer = createSlice({
    name: 'archive',
    initialState,
    reducers: {
        setArchive: (
            state: ArchiveState,
            { payload }: PayloadAction<{courseKey: string, tickets: Array<TicketWithId>}>
        ) => {
            state.archive = {
                ...state.archive,
                [payload.courseKey]: [...payload.tickets, ...state.archive[payload.courseKey] ?? []]
            }
        },
        addArchive: (
            state: ArchiveState,
            { payload }: PayloadAction<{courseKey: string, ticket: TicketWithId}>
        ) => {
            const currentlist = state.archive[payload.courseKey] ?? []
            const exists = currentlist.map(({Id}) =>  {
                if(Id === payload.ticket.Id) {
                    return true
                } else return false
            })
            if(exists.includes(true)) return
            const list = [payload.ticket, ...currentlist]
            const sortedList = list.sort((a, b) => { 
                return Number(a.Id) - Number(b.Id)
              })
            state.archive = {
                ...state.archive,
                [payload.courseKey]: sortedList
            }
        },
        filterArchive: (
            state: ArchiveState,
            { payload }: PayloadAction<{courseKey: string, ticketId: string}>
        ) => {
            const list = state.archive[payload.courseKey] ?? []
            const filtered = list.filter(({ Id }) => Id !== payload.ticketId)
        
            state.archive = {
                ...state.archive,
                [payload.courseKey]: filtered
            }
        },
        setIsLoaded: (
            state: ArchiveState,
            { payload }: PayloadAction<{key: string, isLoaded: boolean}>
        ) => {
            state.isLoaded = {
                ...state.isLoaded, 
                [payload.key]: payload.isLoaded
            }
        }
    }

})

export const { actions, reducer } = archiveReducer