type boxes = {
    backgroundColor: string,
}
type  buttons = {
    backgroundColor: string,
}
type textButton = {
    color: string,
}
type listItem_dark = {
    backgroundColor: string,
}
type listItem_light = {
    backgroundColor: string,
}


export type Theme = {
    text: string
    background: string
    outline: string
    boxes: boxes
    buttons:  buttons
    textButton: textButton
    listItem_dark: listItem_dark
    listItem_light: listItem_light
  };

export type CustomTheme = {
    light: Theme
    dark: Theme
}
  