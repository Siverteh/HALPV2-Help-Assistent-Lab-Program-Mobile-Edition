import ArchiveTab from "../Components/navigation-tabs/ArchiveTab";
import CreateTab from "../Components/navigation-tabs/CreateTab";
import HelpListTab from "../Components/navigation-tabs/HelpListTab"
import SettingsTab from "../Components/navigation-tabs/SettingsTab"
import { RouteType } from "../types"


export const studassRoutes: Array<RouteType> = [{
    name: 'HelpList',
    component: HelpListTab,
    icon: 'list'
}, {
    name: 'Archive',
    component: ArchiveTab,
    icon: 'checkmark-done'
}, {
    name: 'Settings',
    component: SettingsTab,
    icon: 'settings'
}]

export const userRoutes: Array<RouteType> = [{
    name: 'Create',
    component: CreateTab,
    icon: 'create'
}, {
    name: 'Settings',
    component: SettingsTab,
    icon: 'settings'
}]