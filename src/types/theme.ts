import { StatusBarStyle } from "react-native"

type  buttons = {
    backgroundColor: string,
    queueButton: string
}

type listItem_dark = {
    backgroundColor: string,
}
type listItem_light = {
    backgroundColor: string,
}
type outline = {
    outlineColor: string,
    activeOutlineColor: string,
}



export type Theme = {
    text: string
    text2: string
    background: string
    barContent: StatusBarStyle | null | undefined
    outline: outline
    boxes: string
    buttons:  buttons
    listItem_dark: listItem_dark
    listItem_light: listItem_light
    iconColor: string
    checkUncheck: string
    icon: {
        active: string,
        inactive: string
    }
  };

export type CustomTheme = {
    light: Theme
    dark: Theme
}
  