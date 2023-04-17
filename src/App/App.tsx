import React, { useMemo, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import {
  Provider as PaperProvider,
} from 'react-native-paper';
import NavigationBar from "../Components/NavigationBar/NavigationBar";

function App(): JSX.Element {
  return (
      // <PaperProvider> // theme={paperTheme}>
      <PaperProvider>
        <NavigationContainer>
          <NavigationBar isStudass={true}/>
        </NavigationContainer>
        </PaperProvider>
    );
}

export default App;