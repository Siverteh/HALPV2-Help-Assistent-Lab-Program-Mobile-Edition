import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { Theme } from '../types/theme'
import { theme } from '../styles/theme'

export type ThemeState = {
    theme: Theme
}

const initialState = {
    theme: theme.light
}

const themeReducer = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (
            state: ThemeState,
            { payload }: PayloadAction<Theme>
        ) => {
            state.theme = payload
        }
    }

})

export const { actions, reducer } = themeReducer