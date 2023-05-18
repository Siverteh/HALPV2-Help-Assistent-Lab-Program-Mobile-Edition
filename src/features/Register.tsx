import React, { useState, useContext } from 'react';
import { ThemeContext } from '../Components/ThemeContext';
import {
  View,
  Alert,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { Button, TextInput, IconButton } from 'react-native-paper';
import Styles from '../styles/styles';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { Logo } from '../Components/CustomComponents';
import { isValidPassword } from '../utils';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
  
function Register({ route, navigation }: StackScreenProps<RootStackParamList, 'Register'>): JSX.Element {
  const { background, text, outline, iconColor, buttons, boxes, checkUncheck  } = useContext(ThemeContext)
  const { height, width } = useWindowDimensions();
  const tabBarHeight = useBottomTabBarHeight();
  const viewHeight = height - tabBarHeight;

  // State for error message
  const [errorMessage, setErrorMessage] = useState('');

  // States for form fields
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [discordtag, setDiscordtag] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntryConfirm, setSecureTextEntryConfirm] = useState(true);


  const isValidEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleRegister = async () => {
    // Check if all fields are filled
    if (!email || !username || !password || !confirmPassword) {
      Alert.alert('Error', 'You need to fill all required boxes.')
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
      body: JSON.stringify({ email, nickname: username, discordtag, password }),
    };

    // Password requirements
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /\W|_/.test(password);
  
    if (isValidPassword(password)) 
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
          console.error("Registration failed: ", data)
        }
      } catch (error) {
        console.error("Registration failed")
        
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

  const handleNavigate = () => {
    navigation.navigate('LoginScreen')
  }

  return (
    <ScrollView>
    <View style={{
        backgroundColor: background,
        height: viewHeight,
        width: width,
        justifyContent: "center",
        marginTop: 0
      }}>
      <View style={[{ backgroundColor: background, height: '100%'}]}>
        
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start'}}>
          <IconButton
            icon="arrow-left"
            iconColor={text}
            onPress={handleNavigate}
          />
        </View>
      <Logo/>
      <View style={[{alignItems: 'center'}]}>
      <TextInput
        style={[Styles.textInput, {backgroundColor: boxes,  color: text }]}
        textColor={text}
        outlineColor={outline.activeOutlineColor}
          activeOutlineColor={outline.outlineColor}
          theme={{
            colors: {
              background: background,
              onSurfaceVariant: outline.outlineColor
            }
          }}
        label="Email"
        mode="outlined"
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={[Styles.textInput, {backgroundColor: boxes,  color: text }]}
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
        onChangeText={text => setUsername(text)}
      />
      <TextInput
       style={[Styles.textInput, {backgroundColor: boxes,  color: text }]}
       textColor={text}
       outlineColor={outline.activeOutlineColor}
         activeOutlineColor={outline.outlineColor}
         theme={{
           colors: {
             background: background,
             onSurfaceVariant: outline.outlineColor
           }
         }}
        label="Discord Tag"
        mode="outlined"
        onChangeText={text => setDiscordtag(text)}
      />
      <TextInput
       style={[Styles.textInput, {backgroundColor: boxes,  color: text }]}
       textColor={text}
       outlineColor={outline.activeOutlineColor}
         activeOutlineColor={outline.outlineColor}
         theme={{
           colors: {
             background: background,
             onSurfaceVariant: outline.outlineColor
           }
         }}
        label="Password"
        mode="outlined"
        onChangeText={text => setPassword(text)}
        secureTextEntry={secureTextEntry}
        right={
          <TextInput.Icon
            icon={secureTextEntry ? 'eye-off': 'eye'}
            iconColor={iconColor}
            style={{height: 48, width: 48}}
            onPress={() => {
              setSecureTextEntry(!secureTextEntry);
              return false;
            }}
          />
        }
      />
      <TextInput
       style={[Styles.textInput, {backgroundColor: boxes,  color: text }]}
       textColor={text}
       outlineColor={outline.activeOutlineColor}
         activeOutlineColor={outline.outlineColor}
         theme={{
           colors: {
             background: background,
             onSurfaceVariant: outline.outlineColor
           }
         }}
        label="Confirm password"
        mode="outlined"
        onChangeText={text => setConfirmPassword(text)}
        secureTextEntry={secureTextEntryConfirm}
        right={
          <TextInput.Icon
            icon={secureTextEntryConfirm ? 'eye-off': 'eye'}
            iconColor={iconColor}
            style={{height: 48, width: 48}}
            onPress={() => {
              setSecureTextEntryConfirm(!secureTextEntryConfirm);
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
  </View>
  </View>
  </ScrollView>
  );
}

export default Register;
