import Archive from "../features/Archive"
import CreateTicket from "../features/CreateTicket"
import Helplist from "../features/Helplist"
import Settings from "../features/Settings"
import { RouteType } from "../types"


export const studassRoutes: Array<RouteType> = [{
    name: 'HelpList',
    component: Helplist,
    icon: 'list'
}, {
    name: 'Archive',
    component: Archive,
    icon: 'checkmark-done'
}, {
    name: 'Settings',
    component: Settings,
    icon: 'settings'
}]

export const userRoutes: Array<RouteType> = [{
    name: 'Create',
    component: CreateTicket,
    icon: 'create'
}, {
    name: 'Settings',
    component: Settings,
    icon: 'settings'
}]