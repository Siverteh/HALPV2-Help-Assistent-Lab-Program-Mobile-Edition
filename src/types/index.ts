export type RouteType = {
    name: string
    component: any // ScreenComponentType<RootStackParamList, string>
    icon: string
}

export type RootStackParamList = {
    CreateScreen: {name: string, description: string, room: string} | undefined
    Edit: {name: string, description: string, room: string}
    LoginScreen: undefined
    LabQueues: undefined
    ArchiveScreen: undefined
    HelpListScreen: { id: string }
    Queue: {name: string, description: string, room: string}
    SettingScreen: undefined
    Register: undefined
    ChangePassword: undefined
  };