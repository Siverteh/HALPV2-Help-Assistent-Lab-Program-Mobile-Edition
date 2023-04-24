import React, { useState, useEffect } from "react";
import { Provider as PaperProvider, Button } from "react-native-paper";
import NavigationBar from "../Components/NavigationBar/NavigationBar";
import { NavigationContainer } from '@react-navigation/native';
import { ThemeContext, themeHook  } from "../Components/GlobalHook";
import { theme } from "../styles/theme";
import { useColorScheme } from "react-native";
import { AppState } from "../types";
import { useSelector } from "react-redux"

function App(): JSX.Element {

  const { user: { role, isLoggedIn }} = useSelector((state: AppState) => state.user)


const {Thistheme, onChangeTheme} = themeHook();

const colorScheme = useColorScheme();

useEffect(() => {
  if (colorScheme === 'light') {
    onChangeTheme(theme.light);
  } else {
    onChangeTheme(theme.dark);
  }
}, []);


  return (
      <PaperProvider>
        <ThemeContext.Provider value={Thistheme}>
        <NavigationContainer>
          <NavigationBar
            isStudass={role === 'Studass' ?? false}
            isLoggedIn={isLoggedIn}
            />
        </NavigationContainer>
        </ThemeContext.Provider>
      </PaperProvider>
    );
}
export default App;