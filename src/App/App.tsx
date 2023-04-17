import React from "react";
import { PropsWithChildren, useState } from "react";
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
import { SafeAreaProvider } from "react-native-safe-area-context";

import Styles from "../styles/styles";

import CreateTicket from "../features/CreateTicket";
import Queue from "../features/Queue";
import Tabs from "../features/Settings";
import Login from "../features/Login";
import Helplist from "../features/Helplist";
import Archive from "../features/Archive";
import Register from "../features/Register";
import { Ticket } from "../types/ticket";

export const [isDarkMode, setIsDarkMode] = useState(true);

function App(): JSX.Element {

  const screenHeight = Dimensions.get("window").height;
  return (
    <PaperProvider>
      <ScrollView>
        <View style={[{ height: screenHeight }]}>
          <CreateTicket onSubmit={ticket => {
            return ticket;
          }} rooms={[]}></CreateTicket>
        </View>
        <View style={[{ height: screenHeight }]}>
          <Helplist isDarkMode={true}></Helplist>
        </View>
      </ScrollView>
    </PaperProvider>
  );
}


export default App;
