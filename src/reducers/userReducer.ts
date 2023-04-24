import {createSlice, PayloadAction} from '@reduxjs/toolkit'

type StateValue =  {
    email: string
    role: string
    tolken: string
    isLoggedIn: boolean
}

export type UserState = {
    user: StateValue
}

const initialState = {
    user: {
        email: '',
        role: '',
        tolken: '',
        isLoggedIn: false
    }
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