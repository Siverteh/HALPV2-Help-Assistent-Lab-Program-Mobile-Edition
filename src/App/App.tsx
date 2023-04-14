import React from "react";
import {
  Dimensions,
  ScrollView,
  useColorScheme,
  View
} from "react-native";
import Styles from "../styles/styles";

import CreateTicket from "../features/CreateTicket";
import Queue from "../features/Queue";
import Tabs from "../features/Settings";
import Login from "../features/Login";
import Helplist from "../features/Helplist";
import NavigationBar from "../Components/NavigationBar";
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { routes } from "./routing";

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === "dark";
  
  
  return (
    <>
    hei </>
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     {routes.map(({ name, component}, i) => (
    //       <Stack.Screen key={i} name={name} component={component} />
    //     ))}
    //   </Stack.Navigator>
    // </NavigationContainer>
    );
}


export default App;
