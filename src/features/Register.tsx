import React, { useState, useContext } from 'react';
import { ThemeContext } from '../Components/ThemeContext';
import {
  View,
  Alert,
} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Styles from '../styles/styles';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { Logo } from '../Components/CustomComponents';
  

function Register({ navigation }: StackScreenProps<RootStackParamList, 'Register'>): JSX.Element {
  const { background, text, buttons, outline, iconColor } = useContext(ThemeContext)


  // State for error message
  const [errorMessage, setErrorMessage] = useState('');

  // States for form fields
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [discordtag, setDiscordtag] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const isValidEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleRegister = async () => {
    // Check if all fields are filled
    if (!email || !username || !password || !confirmPassword || !discordtag) {
      Alert.alert('Error', 'All boxes needs to be filled.')
      return;
    }

    // Check if the email is valid
    if (!isValidEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email.')
      return;
    }
    
    // Check if the passwords match  
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    // Implement your registration logic here
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, username, discordtag, password }),
    };

    // Password requirements
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /\W|_/.test(password);
  
    if (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSymbol
    ) 
    {
      try {
        const response = await fetch(
          'https://chanv2.duckdns.org:7006/Auth/register',
          requestOptions,
        );
        const data = await response.json();
  
        if (response.ok) {
          Alert.alert('Success', 'Account successfully registered!')
          navigation.navigate('LoginScreen');
        } else {
          console.log('Registration failed:', data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } 
    else {
      let errMsg = 'Password must:';
      if (password.length < minLength) {
        errMsg += ' be at least 8 characters long,';
      }
      if (!hasUpperCase) {
        errMsg += ' have at least one uppercase letter,';
      }
      if (!hasLowerCase) {
        errMsg += ' have at least one lowercase letter,';
      }
      if (!hasNumber) {
        errMsg += ' have at least one number,';
      }
      if (!hasSymbol) {
        errMsg += ' have at least one symbol,';
      }
      errMsg = errMsg.slice(0, -1); // Remove the trailing comma
      Alert.alert('Error', errMsg);
    }
  };

  return (
      <View style={[{ backgroundColor: background, height: '100%', alignItems: 'center' }]}>
      <Logo/>
      <TextInput
        style={[Styles.textInput, { backgroundColor: background, color: text }]}
        label="Email"
        mode="outlined"
        textColor={text}
        activeOutlineColor={outline.activeOutlineColor}
        outlineColor={outline.outlineColor}

        onChangeText={text => setEmail(text)}
        theme={{
          colors: {
            background: background,
            onSurfaceVariant: outline.outlineColor
          }
        }}
      />
      <TextInput
        style={[Styles.textInput, { backgroundColor: background, color: text }]}
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
      <TextInput
       style={[Styles.textInput, { backgroundColor: background, color: text}]}
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
      <TextInput
       style={[Styles.textInput, { backgroundColor: background, color: text }]}
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
      <TextInput
       style={[Styles.textInput, { backgroundColor: background }]}
        label="Confirm password"
        mode="outlined"
        textColor={text}
        activeOutlineColor={outline.activeOutlineColor}
        outlineColor={outline.outlineColor}

        onChangeText={text => setConfirmPassword(text)}
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
      <Button
        style={[
          Styles.buttonStyle,
          {backgroundColor: buttons.backgroundColor, margin: '2%' },
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

export default Register;