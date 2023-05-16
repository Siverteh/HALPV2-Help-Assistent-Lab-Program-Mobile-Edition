import React, { useEffect } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import NavigationBar from "../Components/NavigationBar/NavigationBar";
import { NavigationContainer } from '@react-navigation/native';
import { themeHook  } from "../hook/themeHook";
import { StatusBar, useColorScheme } from "react-native";
import { AppState } from "../types";
import { useDispatch, useSelector } from "react-redux"
import { ThemeContext } from "../Components/ThemeContext";
import { actions } from "../reducers/userReducer";
import { actions as actionsTheme} from "../reducers/themeReducer";
import { asyncStorageHook } from "../hook/asyncStorageHook";
import { delay, isEmpty } from "lodash";
import { theme } from "../styles/theme";

function App(): JSX.Element {

const { user: { role, isLoggedIn }} = useSelector((state: AppState) => state.user)

const {Thistheme} = themeHook();
themeHook().initializeBottomBar()

const colorScheme = useColorScheme();

const dispatch = useDispatch()

const {getItem, setItem} = asyncStorageHook()

useEffect(() => {
  if (colorScheme) {
    setItem('@theme', colorScheme)
    
    dispatch(actionsTheme.setTheme(colorScheme === 'light' ? theme.light : theme.dark))
  }
}, [colorScheme]);

const getUser = (email: string, token: string) => {
  fetch("https://chanv2.duckdns.org:7006/api/User/get", {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({email: email})
  })
  .then(response => response.json())
  .then(data => {
    if(data.status != 401) {
      dispatch(actions.setUser({...data, token: token, isLoggedIn: true}))
    }
  })
  .catch((error) => {
    console.error("Failed to get user info", error)
  })
}

useEffect(() => {
  getItem('@remember_me_login')
  .then(async (value) => {
    const email = await getItem("@user_email")
    const token = await getItem("@user_token")
    if (value === 'true' && email && !isEmpty(email) && token && !isEmpty(token)) {
        getUser(email, token)
    }
  })
  }, [])

  const topBar = () =>{
    
      delay(() => {
      }, 35)
      return (
        <StatusBar 
      barStyle={Thistheme.barContent} 
      backgroundColor={Thistheme.background}
      />
      )
  }

  return (
      <PaperProvider>
        <ThemeContext.Provider value={Thistheme}>
        {topBar()}
        <NavigationContainer>
          <NavigationBar
            isStudass={(role === 'Studass' || role === 'Admin')  ?? false}
            isLoggedIn={isLoggedIn}
            />
        </NavigationContainer>
        </ThemeContext.Provider>
      </PaperProvider>
    );
}
export default App;
