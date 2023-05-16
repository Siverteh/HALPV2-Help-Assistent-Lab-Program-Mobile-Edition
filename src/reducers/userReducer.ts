import {createSlice, PayloadAction} from '@reduxjs/toolkit'

type StateValue =  {
    id?: string
    nickname?: string
    discordTag?: string
    email?: string
    role?: string
    token?: string
    isLoggedIn: boolean
}

export type UserState = {
    user: StateValue,
    isLoadedQueue: boolean
}

const initialState = {
    user: {
        isLoggedIn: false
    },
    isLoadedQueue: false
}

const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (
            state: UserState,
            { payload }: PayloadAction<Partial<StateValue>>
        ) => {
            state.user = {...state.user, ...payload}
        },
        setIsLoadedQueue: (
            state: UserState,
            { payload }: PayloadAction<boolean>
        ) => {
            state.isLoadedQueue = payload
        }
    }

})

export const { actions, reducer } = userReducer