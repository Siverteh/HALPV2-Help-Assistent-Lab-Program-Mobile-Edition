import { useState } from "react";
import { theme } from "../styles/theme";

export const themeHook = () => {
    const [currentTheme, setCurrentTheme] = useState(theme.dark);

    const toggleDarkMode = () => {
      setCurrentTheme(currentTheme === theme.light ? theme.dark : theme.light)
    }

    return {
        onChangeTheme: toggleDarkMode,
        theme: currentTheme
    }
    
}