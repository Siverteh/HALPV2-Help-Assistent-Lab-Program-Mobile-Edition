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
        filterArchive: (
            state: ArchiveState,
            { payload }: PayloadAction<{courseKey: string, ticketId: string}>
        ) => {
            const filtered = state.archive[payload.courseKey].filter(({ Id }) => Id !== payload.ticketId)
        
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