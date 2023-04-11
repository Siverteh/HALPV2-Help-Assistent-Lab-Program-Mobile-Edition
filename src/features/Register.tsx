import React, { useState } from 'react';
import {
  Image,
  View,
} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Styles from '../styles/styles';
import { StackNavigationProp } from '@react-navigation/stack';


type RegisterScreenNavigationProp = StackNavigationProp<any, 'Register'>;

interface RegisterProps {
    navigation: RegisterScreenNavigationProp;
  }
  

function Register({ navigation }: RegisterProps): JSX.Element {
  const isDarkMode = false;
  const stylePrefix = isDarkMode ? "dm" : "lm";

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
        console.log('Registration successful:', data);
        navigation.navigate("Login");
      } else {
        console.log('Registration failed:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <View style={[Styles[`${stylePrefix}_background`], { flex: 1, alignItems: "center" }]}>
      <Image source={require(".././img/halpy3.png")} style={Styles.logo} />
      <TextInput
        style={{ ...Styles[`${stylePrefix}_text`], ...Styles[`${stylePrefix}_boxes`], width: "85%", height: 50, margin: "1%", marginBottom: -10 }}
        textColor={isDarkMode ? '#FFFFFF' : '#201C24'}
        activeOutlineColor={isDarkMode ? '#FFFFFF' : '#201C24'}
        outlineColor={isDarkMode ? '#0070C0' : '#201C24'}
        onChangeText={text => setEmail(text)}
        theme={{
          colors: {
            background: isDarkMode ? '#0070C0' : '#FFFFFF',
            onSurfaceVariant: isDarkMode ? '#FFFFFF' : '#201C24',
          },
        }}
        label="Email Address"
        mode="outlined"
      />
      <View style={{height: "2%"}}></View>
      <TextInput
        style={{ ...Styles[`${stylePrefix}_text`], ...Styles[`${stylePrefix}_boxes`], width: "85%", height: 50, margin: "2%", marginBottom: -10 }}
        label="Nickname"
        mode="outlined"
        textColor={isDarkMode ? '#FFFFFF' : '#201C24'}
        activeOutlineColor={isDarkMode ? '#E0E0E0' : '#201C24'}
        outlineColor={isDarkMode ? '#0070C0' : '#201C24'}
        onChangeText={text => setUsername(text)}
        theme={{
          colors: {
            background: isDarkMode ? '#0070C0' : '#FFFFFF',
            onSurfaceVariant: isDarkMode ? '#FFFFFF' : '#201C24',
          },
        }}
      />
      <View style={{height: "2%"}}></View>
      <TextInput
        style={{ ...Styles[`${stylePrefix}_text`], ...Styles[`${stylePrefix}_boxes`], width: "85%", height: 50, margin: "2%", marginBottom: -10 }}
        label="Discord Tag"
        mode="outlined"
        textColor={isDarkMode ? '#FFFFFF' : '#201C24'}
        activeOutlineColor={isDarkMode ? '#E0E0E0' : '#201C24'}
        outlineColor={isDarkMode ? '#0070C0' : '#201C24'}
        onChangeText={text => setDiscordtag(text)}
        theme={{
          colors: {
            background: isDarkMode ? '#0070C0' : '#FFFFFF',
            onSurfaceVariant: isDarkMode ? '#FFFFFF' : '#201C24',
          },
        }}
      />
      <View style={{height: "2%"}}></View>
      <TextInput
        style={{ ...Styles[`${stylePrefix}_text`], ...Styles[`${stylePrefix}_boxes`], width: "85%", height: 50, margin: "2%", marginBottom: -10 }}
        label="Password"
        mode="outlined"
        textColor={isDarkMode ? '#FFFFFF' : '#201C24'}
        activeOutlineColor={isDarkMode ? '#E0E0E0' : '#201C24'}
        outlineColor={isDarkMode ? '#0070C0' : '#201C24'}
        onChangeText={text => setPassword(text)}
        secureTextEntry={secureTextEntry}
        theme={{
          colors: {
            background: isDarkMode ? '#0070C0' : '#FFFFFF',
            onSurfaceVariant: isDarkMode ? '#FFFFFF' : '#201C24',
          },
        }}
        right={
          <TextInput.Icon
            icon="eye"
            iconColor={isDarkMode ? '#E0E0E0' : '#201C24'}
            onPress={() => {
              setSecureTextEntry(!secureTextEntry);
              return false;
            }}
          />
        }
      />
      <View style={{height: "2%"}}></View>
      <TextInput
        style={{ ...Styles[`${stylePrefix}_text`], ...Styles[`${stylePrefix}_boxes`], width: "85%", height: 50, margin: "2%", marginBottom: 10 }}
        label="Confirm Password"
        mode="outlined"
        textColor={isDarkMode ? '#FFFFFF' : '#201C24'}
        activeOutlineColor={isDarkMode ? '#E0E0E0' : '#201C24'}
        outlineColor={isDarkMode ? '#0070C0' : '#201C24'}
        secureTextEntry={secureConfirmTextEntry}
        theme={{
          colors: {
            background: isDarkMode ? '#0070C0' : '#FFFFFF',
            onSurfaceVariant: isDarkMode ? '#FFFFFF' : '#201C24',
          },
        }}
        right={
          <TextInput.Icon
            icon="eye"
            iconColor={isDarkMode ? '#E0E0E0' : '#201C24'}
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
          isDarkMode ? Styles.dm_button : Styles.lm_button,
          { height: "8%", width: "40%", alignSelf: "center" },
        ]}
        mode="contained"
        textColor={isDarkMode ? "#FFFFFF" : "#201C24"}
        contentStyle={{ flexDirection: "row-reverse", height: "100%", width: "100%" }}
        onPress={handleRegister}
      >
        REGISTER
      </Button>
    </View>

  );
}

export default Register;