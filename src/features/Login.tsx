/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState, useContext } from 'react';
import type {PropsWithChildren} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

//import CheckBox from '@react-native-community/checkbox';

import { Button, TextInput, Checkbox, DefaultTheme } from 'react-native-paper';
import { DarkModeContext } from '../Components/GlobalHook';
import Styles from '../styles/styles';


function Login(): JSX.Element {
  //const isDarkMode = useColorScheme() === 'dark';
  const isDarkMode = false;

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
    
  }
  const { background, text, outline, iconColor, buttons, boxes, checkUncheck  } = useContext(DarkModeContext)

  return (
    <View style={
        [styles.view, {backgroundColor: background}]}>
      <Image
      style={styles.image}
      source={require('.././img/halpy3.png')} />
      <TextInput style={styles.textInput}
        textColor={text}
        activeOutlineColor = {outline.activeOutlineColor}
        outlineColor = {outline.outlineColor}
        theme={{ colors: { background: background,
                            onSurfaceVariant: outline.outlineColor}}}
        label="Email Address"
        mode="outlined"
      />
      <View style={{height:"2%"}}></View>
      <TextInput style={styles.textInput}
      label="Password"
      mode="outlined"
      textColor={text}
      activeOutlineColor = {outline.activeOutlineColor}
      outlineColor = {outline.outlineColor}
      secureTextEntry={secureTextEntry}
      theme={{ colors: { background: background,
                        onSurfaceVariant: outline.outlineColor} }}
      right={
        <TextInput.Icon
          icon="eye"
          iconColor = {iconColor}
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
        color={checkUncheck}
        uncheckedColor={outline.outlineColor}
        status={checked ? 'checked' : 'unchecked'}
        onPress={handleChecked}
        />
        <Text style={[styles.text_sm ,{color: text}]}>
            Remember me
        </Text>
      </View>
      <View style={{height:"2%"}}></View>
      <Button style={[Styles.buttonStyle,{backgroundColor: background, height: "6%", width:"85%"}]}
        mode="contained"
        textColor={text}
        contentStyle={{flexDirection: 'row-reverse', height: "100%", width: "100%"}}
        onPress={handleLogin}>
        SIGN IN
      </Button>
      <View style={{height:"1%"}}></View>
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
      <View style={{height:"4%"}}></View>
      <Text
        style={[styles.text_lg, {color:text}]}>
          USE ANOTHER SERVICE TO LOG IN
      </Text>
      <View style={{height:"1%"}}></View>
      <Button style={[Styles.buttonStyle, {backgroundColor: buttons.backgroundColor ,height: "6%", width:"85%"}]}
        mode="contained"
        textColor={text}
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
    height: "90%"
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
