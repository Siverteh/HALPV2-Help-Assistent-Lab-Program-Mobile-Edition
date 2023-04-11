import React from "react";
import { PropsWithChildren, useState } from "react";
import {
  Dimensions,
  ScrollView,
  useColorScheme,
  View,
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

import Styles from "../styles/styles";

import CreateTicket from "../features/CreateTicket";
import Queue from "../features/Queue";
import Tabs from "../features/Settings";
import Login from "../features/Login";
import Helplist from "../features/Helplist";
import Archive from "../features/Archive";


function App(): JSX.Element {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const screenHeight = Dimensions.get("window").height;
  return (
 <ScrollView>
      <View style={{height: 2*screenHeight}}>
      { <Helplist isDarkMode={false}></Helplist>  }
      { <Archive isDarkMode={false}></Archive> }
      </View>
    </ScrollView>
    );
}


export default App;
