import React, { useState, useEffect } from "react";
import { Provider as PaperProvider, Button } from "react-native-paper";
import NavigationBar from "../Components/NavigationBar/NavigationBar";
import { NavigationContainer } from '@react-navigation/native';
import { ThemeContext, themeHook  } from "../Components/GlobalHook";
import { theme } from "../styles/theme";
import { useColorScheme } from "react-native";

function App(): JSX.Element {

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
            isStudass={true}
            isLoggedIn={true}
            />
        </NavigationContainer>
        </ThemeContext.Provider>
      </PaperProvider>
    );
}
export default App;