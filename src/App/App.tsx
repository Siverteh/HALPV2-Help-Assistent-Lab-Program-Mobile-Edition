import React, { createContext } from "react";
import { PropsWithChildren, useState } from "react";
import {
  Dimensions,
  ScrollView,
  useColorScheme,
  View,
} from "react-native";
import {
  Provider as PaperProvider,
  Button,
  Provider
} from "react-native-paper";


import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions
} from "react-native/Libraries/NewAppScreen";
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Styles from "../styles/styles";

import CreateTicket from "../features/CreateTicket";
import Queue from "../features/Queue";
import Tabs from "../features/Settings";
import Login from "../features/Login";
import Helplist from "../features/Helplist";
import Archive from "../features/Archive";
import Register from "../features/Register"
import { Ticket } from "../types/ticket";
import { theme } from "../styles/theme";
import { DarkModeContext } from "../Components/GlobalHook";

function App(): JSX.Element {
  const screenHeight = Dimensions.get("window").height;
  const [currentTheme, setCurrentTheme] = useState(theme.dark);

  const toggleDarkMode = () => {
    console.log("pressed")
    setCurrentTheme(currentTheme === theme.light ? theme.dark : theme.light);
    
  };
 
  return (
    <ScrollView>
      <View style={[{ height: screenHeight }]}>
      <DarkModeContext.Provider value={currentTheme}>
      <Register></Register>
      
      </DarkModeContext.Provider>
      <Button onPress={toggleDarkMode}>Toggle dark mode</Button>
      </View>
    </ScrollView>
  );
}


export default App;
