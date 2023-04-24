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
    ArchiveScreen: undefined
    HelpListScreen: { id: string }
    Queue: {name: string, description: string, room: string, id: string}
    SettingScreen: undefined
    Register: undefined
    ChangePassword: undefined
  };

  export type Login = {
    email: string
    password: string
  }