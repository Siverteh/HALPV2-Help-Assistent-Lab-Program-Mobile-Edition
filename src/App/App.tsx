import React, { useMemo, useState } from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Dimensions,
  ScrollView,
  useColorScheme,
  View,
} from "react-native";
import {
  MD3DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperLightTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import NavigationBar from "../Components/NavigationBar/NavigationBar";

const Stack = createNativeStackNavigator();

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
  <PaperProvider theme={paperTheme}>
    <NavigationContainer>
      <NavigationBar/>
      {/* <Stack.Navigator>
        {routes.map(({ name, component}, i) => (
          <Stack.Screen key={i} name={name} component={component} />
        ))}
      </Stack.Navigator> */}
    </NavigationContainer>
    </PaperProvider>
    );
}


export default App;
