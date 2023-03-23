import React from "react";
import type { PropsWithChildren } from "react";
import {
  useColorScheme
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

import TicketComponent from "../features/Ticket";
import Queue from "../features/Queue";
import Tabs from "../features/Settings";
import Styles from "../styles/styles";

type SectionProps = PropsWithChildren<{
  title: string;
}>;


function App(): JSX.Element {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Styles.dm_background : Styles.lm_background
  };

  return (
    <>
      <TicketComponent  onSubmit={ticket => []} rooms={[]}/>
    </>
  );

}


export default App;
