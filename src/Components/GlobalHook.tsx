    import React, { createContext, useContext, useState, useEffect } from 'react';
    import { theme } from '../styles/theme';
    import { Theme } from '../types/theme';
    export const DarkModeContext = createContext<Theme>(theme.dark);

    export const themeHook = () => {
        const [currentTheme, setCurrentTheme] = useState(theme.dark);

        const toggleDarkMode = () => {
                console.log("Pressed")
                setCurrentTheme(currentTheme === theme.light ? theme.dark : theme.light)
                console.log("theme:", currentTheme);
          };

          return {
            onChangeTheme: toggleDarkMode,
            Thistheme: currentTheme,
            setTheme: setCurrentTheme
          };
    }
  

    

