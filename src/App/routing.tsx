import NavigationBar from "../Components/NavigationBar/NavigationBar"

type RoutingType = {
    name: string
    component: any //ScreenComponentType<ParamListBase, string>
}

export const routes: Array<RoutingType> = [{
    name: 'HelpList',
    component: NavigationBar
}, {
    name: 'Archive',
    component: NavigationBar
}, {
    name: 'Settings',
    component: NavigationBar
}]