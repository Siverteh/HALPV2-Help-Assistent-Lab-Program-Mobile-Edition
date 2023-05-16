import { ArchiveState } from "../reducers/archiveReducer";
import { HelplistState } from "../reducers/helplistReducer";
import { QueueState } from "../reducers/queueReducer";
import { ThemeState } from "../reducers/themeReducer";
import { UserState } from "../reducers/userReducer";

export type RouteType = {
    name: string
    component: any // ScreenComponentType<RootStackParamList, string>
    icon: string
}

export type RootStackParamList = {
    CreateScreen: undefined
    Edit: {nickname: string, description: string, room: string | null, id: string, placement: number}
    LoginScreen: undefined
    LabQueues: undefined
    ArchiveScreen: { course: string }
    HelpListScreen: { course: string }
    Queue: {nickname: string, description: string, room: string | null, id: string, placement: number}
    SettingScreen: { previousScreen?: string } | undefined
    Register: undefined
    ChangePassword: undefined
    RegisterDiscord: {
      email: string;
      discordTag: string;
      discordId: string;
    }
    ForgottenPassword: undefined
    PrivacyPolicy: { previousScreen: string } | undefined;
    };

  export type Login = {
    email: string
    password: string
  }

  export type DiscordLogin = {
    email: string
    discordTag: string
}



  export interface AppState {
    user: UserState
    helplist: HelplistState
    archive: ArchiveState
    theme: ThemeState
    queue: QueueState
}
