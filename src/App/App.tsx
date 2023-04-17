import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import NavigationBar from "../Components/NavigationBar/NavigationBar";
import { NavigationContainer } from '@react-navigation/native';

function App(): JSX.Element {

  return (
      <PaperProvider>
        <NavigationContainer>
          <NavigationBar
            isStudass={false}
            isLoggedIn={true}
            />
        </NavigationContainer>
      </PaperProvider>
    );
}


export default App;
