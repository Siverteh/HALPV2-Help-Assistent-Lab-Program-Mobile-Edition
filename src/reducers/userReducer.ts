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
    user: StateValue
}

const initialState = {
    user: {
        isLoggedIn: false
    },
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
        }
    }

})

export const { actions, reducer } = userReducer