import { HelplistState } from "../reducers/helplistReducer";
import { ThemeState } from "../reducers/themeReducer";
import { UserState } from "../reducers/userReducer";

export type RouteType = {
    name: string
    component: any // ScreenComponentType<RootStackParamList, string>
    icon: string
}

export type RootStackParamList = {
    CreateScreen: undefined
    Edit: {name: string, description: string, room: string, id: string}
    LoginScreen: undefined
    LabQueues: undefined
    ArchiveScreen: { course: string }
    HelpListScreen: { course: string }
    Queue: {name: string, description: string, room: string, id: string}
    SettingScreen: undefined
    Register: undefined
    ChangePassword: undefined
    ForgottenPassword: undefined
  };

  export type Login = {
    email: string
    password: string
  }

  

  export interface AppState {
    user: UserState
    helplist: HelplistState
    theme: ThemeState
}