/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

//import CheckBox from '@react-native-community/checkbox';

import { Button, TextInput, Checkbox, DefaultTheme } from 'react-native-paper';

import Styles from '../styles/styles';

import { StackNavigationProp } from '@react-navigation/stack';

type RegisterScreenNavigationProp = StackNavigationProp<any, 'Register'>;

interface RegisterProps {
    navigation: RegisterScreenNavigationProp;
  }
  

function Login({ navigation }: RegisterProps): JSX.Element {
  //const isDarkMode = useColorScheme() === 'dark';
  const isDarkMode = true;

  const [checked, setChecked] = React.useState(true);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleChecked = () => {
    setChecked(!checked);
  }

  const handleLogin = () => {

  }

  const handleForgottenPassword = () => {

  }

  const handleDiscord = () => {

  }

  const handleRegister = () => {
    navigation.navigate("Register");
  }

  return (
    <View style={
        [isDarkMode ? Styles.dm_background : Styles.lm_background,
        styles.view]}>
      <Image
      style={styles.image}
      source={require('.././img/halpy3.png')} />
      <TextInput style={styles.textInput}
        textColor={isDarkMode ? '#FFFFFF' : '#201C24'}
        activeOutlineColor = {isDarkMode ? '#FFFFFF' : '#201C24'}
        outlineColor = {isDarkMode ? '#0070C0' : '#201C24'}
        theme={{ colors: { background: isDarkMode ? '#0070C0' : '#FFFFFF',
                            onSurfaceVariant: isDarkMode ? '#FFFFFF' : '#201C24' } }}
        label="Email Address"
        mode="outlined"
      />
      <View style={{height:"2%"}}></View>
      <TextInput style={styles.textInput}
      label="Password"
      mode="outlined"
      textColor={isDarkMode ? '#FFFFFF' : '#201C24'}
      activeOutlineColor = {isDarkMode ? '#E0E0E0' : '#201C24'}
      outlineColor = {isDarkMode ? '#0070C0' : '#201C24'}
      secureTextEntry={secureTextEntry}
      theme={{ colors: { background: isDarkMode ? '#0070C0' : '#FFFFFF',
                        onSurfaceVariant: isDarkMode ? '#FFFFFF' : '#201C24' } }}
      right={
        <TextInput.Icon
          icon="eye"
          iconColor = {isDarkMode ? '#E0E0E0' : '#201C24'}
          onPress={() => {
            setSecureTextEntry(!secureTextEntry);
            return false;
          }}
        />
      }
    />
      <View style={{height:"2%"}}></View>
      <View style={{flexDirection: "row", justifyContent:"flex-start", width:"85%"}}>
        <Checkbox 
        color={isDarkMode ? '#FFFFFF' : '#0070C0'}
        uncheckedColor={isDarkMode ? '#FFFFFF' : '#201C24'}
        status={checked ? 'checked' : 'unchecked'}
        onPress={handleChecked}
        />
        <Text style={[isDarkMode ? Styles.dm_text : Styles.lm_text, styles.text_sm]}>
            Remember me
        </Text>
      </View>
      <View style={{height:"2%"}}></View>
      <Button style={[isDarkMode ? Styles.dm_button : Styles.lm_button, {height: "6%", width:"85%"}]}
        mode="contained"
        textColor={isDarkMode ? "#FFFFFF" : "#201C24"}
        contentStyle={{flexDirection: 'row-reverse', height: "100%", width: "100%"}}
        onPress={handleLogin}>
        SIGN IN
      </Button>
      <View style={{height:"1%"}}></View>
      <Button
        mode="text"
        textColor={isDarkMode ? "#FFFFFF" : "#201C24"}
        onPress={handleForgottenPassword}>
          FORGOT YOUR PASSWORD?
      </Button>
      <Button
        mode="text"
        textColor={isDarkMode ? "#FFFFFF" : "#201C24"}
        onPress={handleRegister}>
          REGISTER AS A USER
      </Button>
      <View style={{height:"4%"}}></View>
      <Text
        style={[isDarkMode ? Styles.dm_text : Styles.lm_text, styles.text_lg]}>
          USE ANOTHER SERVICE TO LOG IN
      </Text>
      <View style={{height:"1%"}}></View>
      <Button style={[isDarkMode ? Styles.dm_button : Styles.lm_button, {height: "6%", width:"85%"}]}
        mode="contained"
        textColor={isDarkMode ? "#FFFFFF" : "#201C24"}
        onPress={handleDiscord}
        contentStyle={{flexDirection: 'row-reverse', height: "100%", width: "100%"}}
        icon="discord">
        DISCORD
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    width: "100%",
    height: "100%"
    },
  textInput: {
    width: "85%"
  },
  text_lg: {
    fontWeight: "bold",
    alignItems: "center",
    textAlign: "center"
    },
  text_sm: {
    alignSelf: "center",
    textAlignVertical: "center",
  },
  image: {
    alignSelf: "center",
    width: "100%",
    height: "25%",
    aspectRatio:1
  }
});


export default Login;
