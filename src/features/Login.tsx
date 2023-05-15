import React, { useState, useContext } from "react";
import {
  Text,
  View
} from "react-native";
import { Button, TextInput, Checkbox } from "react-native-paper";
import Styles from "../styles/styles";

import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList, Login as LoginType } from "../types";
import { useDispatch } from "react-redux";
import { isEmpty } from "lodash";
import { actions } from "../reducers/userReducer";
import { Logo } from "../Components/CustomComponents";
import { asyncStorageHook } from "../hook/asyncStorageHook";
import { ThemeContext } from "../Components/ThemeContext";
import { authorize } from "react-native-app-auth";
import { isValidEmail, isValidPassword } from "../utils";

function Login({ navigation }: StackScreenProps<RootStackParamList, "LoginScreen">): JSX.Element {
  const dispatch = useDispatch();
  const { background, text, outline, iconColor, buttons, boxes, checkUncheck } = useContext(ThemeContext);

  const [value, setValue] = useState<LoginType>({ password: '', email: ''});
  const [checked, setChecked] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const {
    setItem
  } = asyncStorageHook();

  const handleChecked = () => {
    setChecked(x => !x);
    setItem("@remember_me_login", `${!checked}`);
  };
  const handleLogin = async () => {
    if (isEmpty(value.email) || isEmpty(value.password)) {
      console.error("Empty login values");
      return
    }
    if (!isValidEmail(value.email) || !isValidPassword(value.password)) {
      console.error("Validation error");
      return
    }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(value)
    };

    fetch("https://chanv2.duckdns.org:7006/Auth/login", requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.status != 401) {
          if (checked) {
            setItem("@user_email", data.email);
            setItem("@user_token", data.token);
          }
          dispatch(actions.setUser({ ...data, isLoggedIn: true }));
          navigation.navigate("SettingScreen");
        }
      })
      .catch((error) => {
        console.error("Failed to login", error);
      });
  };

  const handleForgottenPassword = () => {
    navigation.navigate("ForgottenPassword");
  };

  const discordConfig = {
    clientId: "1037686187588067419",
    clientSecret: "SIenibsqkRxwigs_ChMg41OmmqOxjS2v",
    redirectUrl: "com.halp://oauthredirect",
    scopes: ["email", "identify"],
    serviceConfiguration: {
      authorizationEndpoint: "https://discordapp.com/api/oauth2/authorize",
      tokenEndpoint: "https://discordapp.com/api/oauth2/token",
      revocationEndpoint: "https://discordapp.com/api/oauth2/token/revoke"
    }
  };

  const handleDiscord = async () => {
    const authState = await authorize(discordConfig);
    const user = await getUserInfo(authState.accessToken);
    const discordTag = `${user.username}#${user.discriminator}`;
    const email = `${user.email}`;
    const discordId = `${user.id}`;

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, discordId: discordId })
    };
    fetch("https://chanv2.duckdns.org:7006/api/User/validateDiscord", requestOptions)
      .then(response => {
        if (response.ok) {
          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ discordId: discordId })
          };
          fetch("https://chanv2.duckdns.org:7006/Auth/discord/login", requestOptions)
            .then(response => response.json())
            .then(response => {
              if (response.status != 401) {

                dispatch(actions.setUser({ ...response, isLoggedIn: true }));
                navigation.navigate("SettingScreen");
              }
            })
            .catch((error) => {
              console.error("Failed to log in: " + error);
            });

        } else if (response.status === 404) {
          console.error("User not found: " + response.status);
          navigation.navigate("RegisterDiscord", { email: email, discordTag: discordTag, discordId: discordId });
        }
      });
  };

  const getUserInfo = async (accessToken: string) => {
    const response = await fetch("https://discordapp.com/api/users/@me", {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user info");
    }

    return await response.json();
  };


  const handleChange = (name: string) => (text: string) => {
    setValue((prev) => {
      return { ...prev, [name]: text } as any;
    });
  };

  const handleRegister = () => navigation.navigate("Register");

  return (
    <View style={
      [{ backgroundColor: background, height: "100%", alignItems: "center" }]}>
      <Logo />
      <TextInput
        style={[Styles.textInput, { backgroundColor: boxes, color: text }]}
        textColor={text}
        outlineColor={outline.activeOutlineColor}
        activeOutlineColor={outline.outlineColor}
        theme={{
          colors: {
            background: background,
            onSurfaceVariant: outline.outlineColor
          }
        }}
        label="Email Address"
        mode="outlined"
        value={value?.email ?? ""}
        onChangeText={handleChange("email")}
        error={!isValidEmail(value.email)}
      />
      <TextInput
        style={[Styles.textInput, { backgroundColor: boxes, color: text }]}
        label="Password"
        mode="outlined"
        textColor={text}
        secureTextEntry={secureTextEntry}
        outlineColor={outline.activeOutlineColor}
        activeOutlineColor={outline.outlineColor}
        theme={{
          colors: {
            background: background,
            onSurfaceVariant: outline.outlineColor
          }
        }}
        right={
          <TextInput.Icon
            icon={secureTextEntry ? 'eye-off': 'eye' }
            iconColor={iconColor}
            onPress={() => {
              setSecureTextEntry(!secureTextEntry);
              return false;
            }}
          />
        }
        value={value?.password ?? ""}
        onChangeText={handleChange("password")}
        error={!isValidPassword(value.password)}
      />
      <View style={{ flexDirection: "row", justifyContent: "flex-start", width: "85%", marginTop: "2%" }}>
        <Checkbox
          color={checkUncheck}
          uncheckedColor={outline.outlineColor}

          status={checked ? "checked" : "unchecked"}
          onPress={handleChecked}
        />
        <Text style={[Styles.text_sm, { color: text }]}>
          Remember me
        </Text>
      </View>
      <View style={{ height: "2%" }}></View>
      <Button
        style={[Styles.buttonStyle, { backgroundColor: buttons.backgroundColor }]}
        mode="contained"
        textColor={text}
        contentStyle={{ flexDirection: "row-reverse", height: "100%", width: "100%" }}
        onPress={handleLogin}
        // disabled={isNotValid}
      >
        SIGN IN
      </Button>
      <View style={{ height: "1%" }}></View>
      <Button
        mode="text"
        textColor={text}
        onPress={handleForgottenPassword}>
        FORGOT YOUR PASSWORD?
      </Button>
      <Button
        mode="text"
        textColor={text}
        onPress={handleRegister}>
        REGISTER AS A USER
      </Button>
      <Text
        style={[Styles.text_lg, { color: text, marginTop: "4%" }]}>
        USE ANOTHER SERVICE TO LOG IN
      </Text>
      <Button style={[Styles.buttonStyle, { backgroundColor: buttons.backgroundColor, margin: "2%" }]}
              mode="contained"
              textColor={text}
              onPress={handleDiscord}
              contentStyle={{ flexDirection: "row-reverse", height: "100%", width: "100%" }}
              icon="discord">
        DISCORD
      </Button>
    </View>
  );
}

export default Login;
