import NavigationBar from "../Components/NavigationBar/NavigationBar"
import Archive from "../features/Archive"
import Helplist from "../features/Helplist"
import Settings from "../features/Settings"

type RoutingType = {
    name: string
    component: any //ScreenComponentType<ParamListBase, string>
}

export const routes: Array<RoutingType> = [{
    name: 'HelpList',
    component: Helplist
}, {
    name: 'Archive',
    component: Archive
}, {
    name: 'Settings',
    component: Settings
}]