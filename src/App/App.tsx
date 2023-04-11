import React from "react";
import type { PropsWithChildren } from "react";
import {
  Dimensions,
  ScrollView,
  useColorScheme,
  View
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


function App(): JSX.Element {
  const isDarkMode = useColorScheme() === "dark";
  
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Styles.dm_background : Styles.lm_background
  };
  
  const screenHeight = Dimensions.get("window").height;
  return (
    <View style={[{height: screenHeight}]}>
      <PaperProvider>
        <Tabs/>
      </PaperProvider>
      <View style={[{height: screenHeight*0.05, backgroundColor:'red'}]}>
      </View>
    </View>
    );
}


export default App;
