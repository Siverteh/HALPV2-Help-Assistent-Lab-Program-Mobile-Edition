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
import Ticket from "../features/Ticket";
import LabQueues from "../features/LabQueues";

function App(): JSX.Element {

  const screenHeight = Dimensions.get("window").height;
  return (
    <PaperProvider>
        <View style={[{ height: screenHeight }]}>
          <Tabs/>

        </View>
    </PaperProvider>
  );
}


export default App;
