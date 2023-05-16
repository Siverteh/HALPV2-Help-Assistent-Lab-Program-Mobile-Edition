import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { TicketWithId } from '../types/ticket'

export type HelplistState = {
    helplist: {[courseKey: string]: Array<TicketWithId>},
    isConnected: boolean,
    isLoadedCourse: {[key: string]: boolean}
}

const initialState = {
    helplist: {},
    isConnected: false,
    isLoadedCourse: {}
}

const helplistReducer = createSlice({
    name: 'helplist',
    initialState,
    reducers: {
        setHelplist: (
            state: HelplistState,
            { payload }: PayloadAction<{key: string, tickets: Array<TicketWithId>}>
        ) => {
            state.helplist = {
                ...state.helplist, 
                [payload.key]: [...state.helplist[payload.key] ?? [], ...payload.tickets]
            }
        },
        addTicket: (
            state: HelplistState,
            { payload }: PayloadAction<{key: string, ticket: TicketWithId}>
        ) => {
            const currentlist = state.helplist[payload.key] ?? []
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
            state.helplist = {
                ...state.helplist,
                [payload.key]: sortedList
            }
        },
        filterHelplist: (
            state: HelplistState,
            { payload }: PayloadAction<{courseKey: string, ticketId: string}>
        ) => {
            const list = state.helplist[payload.courseKey] ??[]
            const filtered = list.filter(({ Id }) => Id !== payload.ticketId)
            state.helplist = {
                ...state.helplist,
                [payload.courseKey]: filtered
            }
        },
        updateTicket: (
            state: HelplistState,
            { payload }: PayloadAction<{courseKey: string, ticket: TicketWithId}>
        ) => {
            const filtered = state.helplist[payload.courseKey].map((t) => {
                if (t.Id === payload.ticket.Id) {
                    return payload.ticket
                }
                return t
            })
            state.helplist = {
                ...state.helplist,
                [payload.courseKey]: filtered
            }
        },
        setIsConnected: (
            state: HelplistState,
            { payload }: PayloadAction<boolean>
        ) => {
            state.isConnected = payload
        },
        setIsLoaded: (
            state: HelplistState,
            { payload }: PayloadAction<{key: string, isLoaded: boolean}>
        ) => {
            state.isLoadedCourse = {
                ...state.isLoadedCourse, 
                [payload.key]: payload.isLoaded
            }
        }
    }

})

export const { actions, reducer } = helplistReducer