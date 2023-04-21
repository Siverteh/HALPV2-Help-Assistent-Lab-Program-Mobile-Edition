import React, { useState } from "react";
import { Provider as PaperProvider, Button } from "react-native-paper";
import NavigationBar from "../Components/NavigationBar/NavigationBar";
import { NavigationContainer } from '@react-navigation/native';
import { ThemeContext } from "../Components/GlobalHook";
import { theme } from "../styles/theme";


function App(): JSX.Element {
  const [currentTheme, setCurrentTheme] = useState(theme.dark);

  const toggleDarkMode = () => {
    setCurrentTheme(currentTheme === theme.light ? theme.dark : theme.light)
  }
 
  return (
      <PaperProvider>
        <ThemeContext.Provider value={currentTheme}>
        <NavigationContainer>
          <NavigationBar
            isStudass={false}
            isLoggedIn={false}
            />
        </NavigationContainer>
        </ThemeContext.Provider>
        <Button onPress={toggleDarkMode}>Toggle dark mode</Button>
      </PaperProvider>
    );
}


export default App;
