import { Ticket } from "./ticket";

export type RouteType = {
    name: string
    component: any //ScreenComponentType<ParamListBase, string>
    icon: string
}

export type RootStackParamList = {
    CreateScreen: {name: string, description: string, room: string} | undefined
    Edit: {name: string, description: string, room: string}
    Login: undefined
    LabQueues: {name: string, description: string, room: string}
    ArchiveScreen: undefined
    HelpListScreen: { id: string }
    Queue: {name: string, description: string, room: string}
    SettingScreen: undefined
    Register: undefined
    ChangePassword: undefined
  };