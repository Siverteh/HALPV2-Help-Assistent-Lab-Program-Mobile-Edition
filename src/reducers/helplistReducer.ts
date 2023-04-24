import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { Course } from '../features/List'

export type HelplistState = {
    helplist: Array<Course>
}

const initialState = {
    helplist: []
}

const helplistReducer = createSlice({
    name: 'helplist',
    initialState,
    reducers: {
        setHelplist: (
            state: HelplistState,
            { payload }: PayloadAction<Array<Course>>
        ) => {
            state.helplist = payload
        },
        filterHelplist: (
            state: HelplistState,
            { payload }: PayloadAction<Course>
        ) => {

            const filtered = state.helplist.filter((hl) => hl.Id === payload.Id)

            state.helplist = filtered
        }
    }

})

export const { actions, reducer } = helplistReducer