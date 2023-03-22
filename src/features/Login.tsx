/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

//import CheckBox from '@react-native-community/checkbox';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { Button, TextInput, Checkbox, DefaultTheme } from 'react-native-paper';

import Styles from '../styles/styles';

function Password(dm: Boolean) {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  return (
    <TextInput style={styles.textInput}
      label="Password"
      mode="outlined"
      activeOutlineColor = {dm ? '#E0E0E0' : '#201C24'}
      outlineColor = {dm ? '#0070C0' : '#201C24'}
      secureTextEntry={secureTextEntry}
      theme={{ colors: { background: dm ? '#0070C0' : '#FFFFFF',
                        onSurfaceVariant: dm ? '#FFFFFF' : '#201C24' } }}
      right={
        <TextInput.Icon
          icon="eye"
          iconColor = {dm ? '#E0E0E0' : '#201C24'}
          onPress={() => {
            setSecureTextEntry(!secureTextEntry);
            return false;
          }}
        />
      }
    />
  );
}

function Login(): JSX.Element {
  //const isDarkMode = useColorScheme() === 'dark';
  const isDarkMode = false;

  const [checked, setChecked] = React.useState(true);

  const handleChecked = () => {
    setChecked(!checked);
  }

  const handleLogin = () => {
    console.log(isDarkMode);
  }

  const handleForgottenPassword = () => {

  }

  const handleDiscord = () => {

  }

  const handleRegister = () => {
    
  }

  return (
    <View style={
        [isDarkMode ? Styles.dm_background : Styles.lm_background,
        styles.view]}>
      <Image
      style={styles.image}
      source={require('.././img/halpy3.png')} />
      <TextInput style={styles.textInput}
        activeOutlineColor = {isDarkMode ? '#FFFFFF' : '#201C24'}
        outlineColor = {isDarkMode ? '#0070C0' : '#201C24'}
        theme={{ colors: { background: isDarkMode ? '#0070C0' : '#FFFFFF',
                            onSurfaceVariant: isDarkMode ? '#FFFFFF' : '#201C24' } }}
        label="Email Address"
        mode="outlined"
      />
      <View style={{height:20}}></View>
      <Password dm={isDarkMode}></Password>
      <View style={{height:10}}></View>
      <View style={{flexDirection: "row"}}>
        <Checkbox
        color={isDarkMode ? '#FFFFFF' : '#0070C0'}
        uncheckedColor={isDarkMode ? '#FFFFFF' : '#201C24'}
        status={checked ? 'checked' : 'unchecked'}
        onPress={handleChecked}
        />
        <Text style={
            [isDarkMode ? Styles.dm_text : Styles.lm_text, styles.text_sm]}>
            Remember me
        </Text>
      </View>
      <View style={{height:20}}></View>
      <Button style={[isDarkMode ? Styles.dm_button : Styles.lm_button, styles.button]}
        mode="contained"
        textColor={isDarkMode ? "#FFFFFF" : "#201C24"}
        onPress={handleLogin}>
        SIGN IN
      </Button>
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
      <View style={{height:40}}></View>
      <Text
        style={[isDarkMode ? Styles.dm_text : Styles.lm_text, styles.text_lg]}>
          USE ANOTHER SERVICE TO LOG IN
      </Text>
      <View style={{height:10}}></View>
      <Button style={[isDarkMode ? Styles.dm_button : Styles.lm_button, styles.button]}
        mode="contained"
        textColor={isDarkMode ? "#FFFFFF" : "#201C24"}
        onPress={handleDiscord}
        contentStyle={{flexDirection: 'row-reverse'}}
        icon="discord">
        DISCORD
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: 24,
    width: "100%",
    height: "100%"
    },
  textInput: {
    width: 336
  },
  button: {
    width: 336
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
    height: 200,
    aspectRatio:1
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});


export default Login;
