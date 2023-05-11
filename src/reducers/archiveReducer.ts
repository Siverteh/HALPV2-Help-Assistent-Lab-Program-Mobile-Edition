import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { Course } from '../features/List'

export type ArchiveState = {
    archive: Array<Course>,
    isLoaded: boolean
}

const initialState = {
    archive: [],
    isLoaded: false
}

const archiveReducer = createSlice({
    name: 'archive',
    initialState,
    reducers: {
        setArchive: (
            state: ArchiveState,
            { payload }: PayloadAction<Array<Course>>
        ) => {
            state.archive = [...payload, ...state.archive]
        },
        filterArchive: (
            state: ArchiveState,
            { payload }: PayloadAction<Course>
        ) => {
            const filtered = state.archive.filter(({ Id }) => Id !== payload.Id)
            state.archive = filtered
        },
        setIsLoaded: (
            state: ArchiveState,
            { payload }: PayloadAction<boolean>
        ) => {
            state.isLoaded = payload
        }
    }

})

export const { actions, reducer } = archiveReducer