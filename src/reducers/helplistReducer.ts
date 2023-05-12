import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { Course } from '../features/List'

export type HelplistState = {
    helplist: Array<Course>,
    isConnected: boolean,
    isLoaded: boolean
}

const initialState = {
    helplist: [],
    isConnected: false,
    isLoaded: false
}

const helplistReducer = createSlice({
    name: 'helplist',
    initialState,
    reducers: {
        setHelplist: (
            state: HelplistState,
            { payload }: PayloadAction<Array<Course>>
        ) => {
            state.helplist = [...payload, ...state.helplist]
        },
        filterHelplist: (
            state: HelplistState,
            { payload }: PayloadAction<Course>
        ) => {
            const filtered = state.helplist.filter(({ Id }) => Id !== payload.Id)
            state.helplist = filtered
        },
        setIsConnected: (
            state: HelplistState,
            { payload }: PayloadAction<boolean>
        ) => {
            state.isConnected = payload
        },
        setIsLoaded: (
            state: HelplistState,
            { payload }: PayloadAction<boolean>
        ) => {
            state.isLoaded = payload
        }
    }

})

export const { actions, reducer } = helplistReducer