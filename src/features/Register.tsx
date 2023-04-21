import React, { useState, useContext } from 'react';
import { DarkModeContext } from '../Components/GlobalHook';

import {
  Image,
  View,
} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Styles from '../styles/styles';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
  

function Register({ navigation }: StackScreenProps<RootStackParamList, 'Register'>): JSX.Element {
  const { background, text, buttons, boxes, outline, iconColor, checkUncheck } = useContext(DarkModeContext)


  // States for form fields
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [discordtag, setDiscordtag] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureConfirmTextEntry, setSecureConfirmTextEntry] = useState(true);

  const handleRegister = async () => {
    // Implement your registration logic here
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, username, discordtag, password }),
    };

    try {
      const response = await fetch('https://chanv2.duckdns.org:7006/Auth/register', requestOptions);
      const data = await response.json();

      console.log(response.status);

      if (response.ok) {
        navigation.navigate("LoginScreen");
      } else {
        console.log('Registration failed:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={[Styles.view, { backgroundColor: background }]}>
      <Image
        style={Styles.image}
        source={require('.././img/halpy3.png')} />
      <TextInput style={Styles.textInput}
        textColor={text}
        activeOutlineColor={outline.activeOutlineColor}
        outlineColor={outline.outlineColor}
        theme={{
          colors: {
            background: background,
            onSurfaceVariant: outline.outlineColor
          }
        }}
        label="Email Address"
        mode="outlined"
      />
      <View style={{ height: "2%" }}></View>
      <TextInput
        style={[Styles.boxStyle, { backgroundColor: background, color: text, width: "85%", height: 50, margin: "2%", marginBottom: 10 }]}
        label="Nickname"
        mode="outlined"
        textColor={text}
        activeOutlineColor={outline.activeOutlineColor}
        outlineColor={outline.outlineColor}

        onChangeText={text => setUsername(text)}
        theme={{
          colors: {
            background: background,
            onSurfaceVariant: outline.outlineColor
          }
        }}
      />
      <View style={{ height: "2%" }}></View>
      <TextInput
       style={[Styles.boxStyle, { backgroundColor: background, color: text, width: "85%", height: 50, margin: "2%", marginBottom: 10 }]}
        label="Discord Tag"
        mode="outlined"
        textColor={text}
        activeOutlineColor={outline.activeOutlineColor}
        outlineColor={outline.outlineColor}
        onChangeText={text => setDiscordtag(text)}
        theme={{
          colors: {
            background: background,
            onSurfaceVariant: outline.outlineColor
          }
        }}
      />
      <View style={{ height: "2%" }}></View>
      <TextInput
       style={[Styles.boxStyle, { backgroundColor: background, color: text, width: "85%", height: 50, margin: "2%", marginBottom: 10 }]}
        label="Password"
        mode="outlined"
        textColor={text}
        activeOutlineColor={outline.activeOutlineColor}
        outlineColor={outline.outlineColor}

        onChangeText={text => setPassword(text)}
        secureTextEntry={secureTextEntry}
        theme={{
          colors: {
            background: background,
            onSurfaceVariant: outline.outlineColor
          }
        }}
        right={
          <TextInput.Icon
            icon="eye"
            iconColor={iconColor}
            onPress={() => {
              setSecureTextEntry(!secureTextEntry);
              return false;
            }}
          />
        }
      />
      <View style={{ height: "2%" }}></View>
      <TextInput
        style={[Styles.boxStyle, { backgroundColor: background, color: text, width: "85%", height: 50, margin: "2%", marginBottom: 10 }]}
        label="Confirm Password"
        mode="outlined"
        textColor={text}
        activeOutlineColor={outline.activeOutlineColor}
        outlineColor={outline.outlineColor}

        secureTextEntry={secureConfirmTextEntry}
        theme={{
          colors: {
            background: background,
            onSurfaceVariant: outline.outlineColor
          }
        }}

        right={
          <TextInput.Icon
            icon="eye"
            iconColor={iconColor}
            onPress={() => {
              setSecureConfirmTextEntry(!secureConfirmTextEntry);
              return false;
            }}
          />
        }
      />
      <View style={{ height: "8%" }}></View>
      <Button
        style={[
          Styles.buttonStyle,
          {backgroundColor: buttons.backgroundColor, height: "8%", width: "40%", alignSelf: "center" },
        ]}
        mode="contained"
        textColor={text}
        contentStyle={{ flexDirection: "row-reverse", height: "100%", width: "100%" }}
        onPress={handleRegister}
      >
        REGISTER
      </Button>
    </View>

  );
}

export default Register;