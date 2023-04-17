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
    Archive: undefined
    HelpList: { id: string }
    Queue: {name: string, description: string, room: string}
    Settings: undefined
    Register: undefined
  };