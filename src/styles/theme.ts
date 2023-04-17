import { CustomTheme } from "../types/theme";

export const theme: CustomTheme = {
    light: {
        text: "#000000",
        outline: "#B0B4BC",
        background: "#E0EEF7",
        boxes: {
            backgroundColor: "#FFFFFF",
        },
        buttons: {
            backgroundColor: "#94CCFF",
        },
        textButton: {
            color: "#686464",
        },
        listItem_light: {
            backgroundColor: "#FFFFFF",
        },
        listItem_dark: {
            backgroundColor: "#94CCFF",
        },
      
    },

    dark: {
        text: "#FFFFFF",
        outline: "#083464",
        background: "#004082",
        boxes: {
            backgroundColor: "#0070C0",
          },
        buttons: {
            backgroundColor: "#0070C0",
        },
        textButton: {
            color: "#E0E0E0",
        },

        listItem_light: {
            backgroundColor: "#94CCFF"
        },
        listItem_dark: {
            backgroundColor: "#004082",
        },
    }
}