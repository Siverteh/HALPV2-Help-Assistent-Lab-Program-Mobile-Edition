import React, { useState } from "react";
import type { PropsWithChildren } from "react";
import {
  Settings,
  useColorScheme, View
} from "react-native";
import {
  Provider as PaperProvider,
  Button
} from "react-native-paper";


import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions
} from "react-native/Libraries/NewAppScreen";

//import TicketComponent from "../features/Ticket";
import Queue from "../features/Queue";
import Tabs from "../features/Settings";
import Styles from "../styles/styles";

import { fontFamily, style } from '@mui/system';
import Login from "../features/Login";


function App(): JSX.Element {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Styles.dm_background : Styles.lm_background
  };

  return (
    <Login></Login>
  );
}


export default App;