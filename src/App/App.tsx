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

//import TicketComponent from "../features/Ticket";
import Queue from "../features/Queue";
import Styles from "../Styles/styles";

type SectionProps = PropsWithChildren<{
  title: string;
}>;


function App(): JSX.Element {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
  };

  return (
    <>
      <Queue/>
    </>
  );

}


export default App;