import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import NavigationBar from "../Components/NavigationBar/NavigationBar";
import { NavigationContainer } from '@react-navigation/native';

import ForgottenPassword from "../features/ForgottenPassword";

function App(): JSX.Element {

  return (
      <PaperProvider>
        <NavigationContainer>
          <NavigationBar isStudass={false}/>
        </NavigationContainer>
      </PaperProvider>
    );
}


export default App;
