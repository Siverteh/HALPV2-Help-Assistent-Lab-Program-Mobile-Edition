import ArchiveTab from "../Components/navigation-tabs/ArchiveTab";
import CreateTab from "../Components/navigation-tabs/CreateTab";
import HelpListTab from "../Components/navigation-tabs/HelpListTab"
import SettingsTab from "../Components/navigation-tabs/SettingsTab"
import LoginTab from "../Components/navigation-tabs/LoginTab"
import { RouteType } from "../types"

const settingRoute = [
    {
        name: 'Settings',
        component: SettingsTab,
        icon: 'settings'
    }
]

const loginRoute = [
    {
        name: 'Login',
        component: LoginTab,
        icon: 'log-in'
    }
]

const tabSwitcher = (isLoggedin: boolean) => {
    if(isLoggedin) {
        return loginRoute
    } else {
        return settingRoute
    }
}


export const studassRoutes: (isLoggedin: boolean) => Array<RouteType> = (isLoggedin: boolean) => [{
    name: 'HelpList',
    component: HelpListTab,
    icon: 'list'
}, {
    name: 'Archive',
    component: ArchiveTab,
    icon: 'checkmark-done'
}, ...tabSwitcher(isLoggedin)]

export const userRoutes: (isLoggedin: boolean) => Array<RouteType> = (isLoggedin: boolean) => [{
    name: 'Create',
    component: CreateTab,
    icon: 'create'
}, ...tabSwitcher(isLoggedin)]