import { configureStore } from '@reduxjs/toolkit'
import { AppState } from '../types'
import { reducer as themeReducer} from '../reducers/themeReducer'
import { reducer as userReducer} from '../reducers/userReducer'
import { reducer as helplistReducer} from '../reducers/helplistReducer'
import { reducer as archiveReducer} from '../reducers/archiveReducer'
import { reducer as queueReducer} from '../reducers/queueReducer'

export const store = configureStore<AppState>({
    reducer: {
        user: userReducer,
        helplist: helplistReducer,
        archive: archiveReducer,
        theme: themeReducer,
        queue: queueReducer
    }
})