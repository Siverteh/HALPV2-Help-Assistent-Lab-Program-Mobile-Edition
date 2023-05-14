import React, { useState, useContext } from "react";
import { ThemeContext } from "../Components/ThemeContext";
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


function RegisterDiscord({ navigation, route }: StackScreenProps<RootStackParamList, "RegisterDiscord">): JSX.Element {
  const { email, discordTag, discordId } = route.params;
  const { background, text, buttons, boxes, outline, iconColor, checkUncheck } = useContext(ThemeContext);
  const [validationName, setValidationName] = useState(false);
  const [validationEmpty, setValidationEmpty] = useState(false);

  // States for form fields
  const [nickname, setNickname] = useState("");

  const handleChange = (nickname: string) => {
    setNickname(nickname);
    setValidationName(false);
    setValidationEmpty(false);
  };

  const handleRegister = async () => {
    // Check if the username field is filled
    if (!nickname) {
      setValidationEmpty(true);
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, nickname, discordTag, discordId })
    };

    try {
      const response = await fetch(
        "https://chanv2.duckdns.org:7006/Auth/discord/register",
        requestOptions
      );
      const data = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Account successfully registered!");
        navigation.navigate("LoginScreen");
      } else {
        console.error("Registration failed:", data);
        setValidationName(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <View style={[{ backgroundColor: background, flex: 1, height: "100%", alignItems: "center" }]}>
      <Image
        style={Styles.logo}
        source={require(".././img/halpy3.png")} />
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
        label="Nickname"
        mode="outlined"
        onChangeText={text => handleChange(text)}

      />
      <Text style={[Styles.text_lg, {
        color: text,
        margin: "2%",
        textAlign: "center"
      }]}>Successfully authenticated with Discord! Set a nickname to complete registration.</Text>
      <View style={{ height: "1%" }}></View>
      {validationName && (

        <Text style={{ color: background == "#E0EEF7" ? "red" : "#f18ba5", fontSize: 20 }}>Nickname can only contain
          letters or digits.</Text>

      )
      }
      {validationEmpty && (

        <Text style={{ color: background == "#E0EEF7" ? "red" : "#f18ba5", fontSize: 20 }}>Nickname can not be
          empty.</Text>

      )
      }
      <View style={{ height: "3%" }}></View>
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
