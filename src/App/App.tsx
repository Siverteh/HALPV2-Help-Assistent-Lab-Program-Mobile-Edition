import React, { useState } from "react";
import { Provider as PaperProvider, Button } from "react-native-paper";
import NavigationBar from "../Components/NavigationBar/NavigationBar";
import { NavigationContainer } from '@react-navigation/native';
import { ThemeContext } from "../Components/GlobalHook";
import { themeHook } from "../hook/themeHook";
import { Provider } from 'react-redux'
// import { store } from "./store";


function App(): JSX.Element {
  const {onChangeTheme, theme}  = themeHook()
  console.log('test: ', theme)
  return (
    // <Provider store={store}>
      <PaperProvider>
        <ThemeContext.Provider value={theme}>
        <NavigationContainer>
          <NavigationBar
            isStudass={true}
            isLoggedIn={false}
            />
        </NavigationContainer>
        </ThemeContext.Provider>
        
      </PaperProvider>
      // </Provider>
    );
}


export default App;
