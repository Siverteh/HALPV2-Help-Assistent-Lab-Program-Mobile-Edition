import {createSlice, PayloadAction} from '@reduxjs/toolkit'

type StateValue =  {
    email: string
    isLoggedIn: boolean
    isStudAss: boolean
}

export type UserState = {
    user: StateValue
}

const initialState = {
    user: {}
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