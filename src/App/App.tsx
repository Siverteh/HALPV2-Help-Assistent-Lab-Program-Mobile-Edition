import React, { useState, useEffect } from "react";
import { Provider as PaperProvider, Button } from "react-native-paper";
import NavigationBar from "../Components/NavigationBar/NavigationBar";
import { NavigationContainer } from '@react-navigation/native';
import { themeHook  } from "../hook/themeHook";
import { theme } from "../styles/theme";
import { useColorScheme } from "react-native";
import { AppState } from "../types";
import { useDispatch, useSelector } from "react-redux"
import { ThemeContext } from "../Components/ThemeContext";
import { actions } from "../reducers/userReducer";
import { asyncStorageHook } from "../hook/asyncStorageHook";

function App(): JSX.Element {

const { user: { role, isLoggedIn }} = useSelector((state: AppState) => state.user)

const {Thistheme, onChangeTheme} = themeHook();

const colorScheme = useColorScheme();

const dispatch = useDispatch()

const {
  getItem
} = asyncStorageHook()

useEffect(() => {
  if (colorScheme === 'light') {
    onChangeTheme(theme.light);
  } else {
    onChangeTheme(theme.dark);
  }
}, []);

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
  .catch(() => {
    console.log('get user error')
  })
}

useEffect(() => {
  getItem('@remember_me_login')
  .then(async (value) => {
    const email = await getItem("@user_email")
    const token = await getItem("@user_token")
    if (value === 'true' && email && token) {
        getUser(email, token)
    }
  })
  }, [])

  return (
      <PaperProvider>
        <ThemeContext.Provider value={Thistheme}>
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
