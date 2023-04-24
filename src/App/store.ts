import { createStore } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { AppState } from '../types'
import { reducer as themeReducer} from '../reducers/themeReducer'
import { reducer as userReducer} from '../reducers/userReducer'
import { reducer as helplistReducer} from '../reducers/helplistReducer'


export const store = configureStore<AppState>({
    reducer: {
        user: userReducer,
        helplist: helplistReducer,
        theme: themeReducer
    }
})