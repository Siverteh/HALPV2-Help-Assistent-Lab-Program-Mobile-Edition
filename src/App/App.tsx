import React, { useState, useEffect } from "react";
import { Provider as PaperProvider, Button } from "react-native-paper";
import NavigationBar from "../Components/NavigationBar/NavigationBar";
import { NavigationContainer } from '@react-navigation/native';
import { ThemeContext, themeHook  } from "../Components/GlobalHook";
import { theme } from "../styles/theme";
import { Appearance } from "react-native";

function App(): JSX.Element {

const {Thistheme, onChangeTheme} = themeHook();


const [mobileColorScheme, setMobileColorScheme] = useState(Appearance.getColorScheme());
const useMobileTheme = () => {
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme: newColorScheme }) => {
      setMobileColorScheme(newColorScheme);
    });
    return () => {
      subscription.remove();
    };
  }, []);
}
useMobileTheme(); 
useEffect(() => {
  if (mobileColorScheme === 'light') {
    onChangeTheme(theme.light);
  } else {
    onChangeTheme(theme.dark);
  }
}, [mobileColorScheme]);


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