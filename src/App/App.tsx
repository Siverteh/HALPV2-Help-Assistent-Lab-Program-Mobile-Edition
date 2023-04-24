import React, { useState, useEffect } from "react";
import { Provider as PaperProvider, Button } from "react-native-paper";
import NavigationBar from "../Components/NavigationBar/NavigationBar";
import { NavigationContainer } from '@react-navigation/native';
import { ThemeContext, themeHook  } from "../Components/GlobalHook";
import { theme } from "../styles/theme";
import { Appearance } from "react-native";

function App(): JSX.Element {

const {Thistheme, setTheme, onChangeTheme} = themeHook();


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
    setTheme(theme.light);
  } else {
    setTheme(theme.dark);
  }
}, [mobileColorScheme]);


  return (
    // <Provider store={store}>
      <PaperProvider>
        <ThemeContext.Provider value={Thistheme}>
        <NavigationContainer>
          <NavigationBar
            isStudass={false}
            isLoggedIn={false}
            />
        </NavigationContainer>
        </ThemeContext.Provider>
        <Button onPress={onChangeTheme}>Toggle dark mode</Button>
      </PaperProvider>
      // </Provider>
    );
}
export default App;
