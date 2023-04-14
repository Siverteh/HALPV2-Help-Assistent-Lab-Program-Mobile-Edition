import React, { useMemo, useState } from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import {
  MD3DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperLightTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import NavigationBar from "../Components/NavigationBar/NavigationBar";

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
import LabQueues from "../features/LabQueues";
import { Text, View } from 'react-native';

function App(): JSX.Element {
  const [theme, setTheme] = useState(DefaultTheme);

  const paperTheme = useMemo(() => {
    const t = theme.dark ? PaperDarkTheme : PaperLightTheme;

    return {
      ...t,
      colors: {
        ...t.colors,
        ...theme.colors,
        surface: theme.colors.card,
        accent: theme.dark ? 'rgb(255, 55, 95)' : 'rgb(255, 45, 85)',
      },
    };
  }, [theme.colors, theme.dark]);
  
  return (
    // <View>
      <PaperProvider theme={paperTheme}>
        <NavigationContainer>
          <NavigationBar/>
        </NavigationContainer>
        </PaperProvider>

    // </View>
    );
}


export default App;
