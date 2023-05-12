import React, { useState, useContext } from "react";
import { ThemeContext } from '../Components/ThemeContext';
import {
  Image,
  View,
  Text,
  Alert
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import Styles from "../styles/styles";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../types";

type RegisterDiscordProps = {
  email: string,
  discordTag: string;
}

function RegisterDiscord({ navigation, route }: StackScreenProps<RootStackParamList, "RegisterDiscord">): JSX.Element {
  const { email, discordTag } = route.params;
  const { background, text, buttons, boxes, outline, iconColor, checkUncheck } = useContext(ThemeContext);

  // State for error message
  const [errorMessage, setErrorMessage] = useState("");

  // States for form fields
  const [nickname, setNickname] = useState("");

  const handleRegister = async () => {
    // Check if the username field is filled
    if (!nickname) {
      Alert.alert("Error", "The nickname box needs to be filled.");
      return;
    }

    // Implement your registration logic here
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, nickname, discordTag })
    };

    try {
      const response = await fetch(
        "https://chanv2.duckdns.org:7006/Auth/discord/register",
        requestOptions
      );
      const data = await response.json();

      console.log(response.status);

      if (response.ok) {
        Alert.alert("Success", "Account successfully registered!");
        navigation.navigate("LoginScreen");
      } else {
        console.log("Registration failed:", data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <View style={[{ backgroundColor: background, flex: 1, height: "100%" }]}>
      <Image
        style={Styles.logo}
        source={require(".././img/halpy3.png")} />
      <Text style={[Styles.text_lg, {
        color: text,
        margin: "2%",
        textAlign: "center"
      }]}>Successfully authenticated with Discord! Set a nickname to complete registration.</Text>
      <TextInput
        style={[Styles.textInput, {
          backgroundColor: background,
          color: text,
          width: "85%",
          height: 50,
          margin: "2%",
          marginBottom: 10
        }]}
        label="Nickname"
        mode="outlined"
        textColor={text}
        activeOutlineColor={outline.activeOutlineColor}
        outlineColor={outline.outlineColor}

        onChangeText={text => setNickname(text)}
        theme={{
          colors: {
            background: background,
            onSurfaceVariant: outline.outlineColor
          }
        }}
      />
      <View style={{ height: "6%" }}></View>
      <Button
        style={[
          Styles.buttonStyle,
          {
            backgroundColor: buttons.backgroundColor, height: "8%", width: "40%", alignSelf: "center"
          }
        ]}
        mode="contained"
        textColor={text}
        contentStyle={{ flexDirection: "row-reverse", height: "100%", width: "100%" }}
        onPress={handleRegister}
      >
        REGISTER
      </Button>
      <View style={{ height: "4%" }}></View>
    </View>
  );
}

export default RegisterDiscord;
