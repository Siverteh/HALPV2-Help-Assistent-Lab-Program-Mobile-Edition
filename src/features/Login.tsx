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


import { StackNavigationProp } from '@react-navigation/stack';

type RegisterScreenNavigationProp = StackNavigationProp<any, 'Register'>;

interface RegisterProps {
    navigation: RegisterScreenNavigationProp;
  }
  

function Login({ navigation }: RegisterProps): JSX.Element {
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
    navigation.navigate("Register");
  }
  const { background, text, outline, iconColor, buttons, boxes, checkUncheck  } = useContext(DarkModeContext)

  return (
    <View style={
        [Styles.view, {backgroundColor: background}]}>
      <Image
      style={Styles.image}
      source={require('.././img/halpy3.png')} />
      <TextInput style={Styles.textInput}
        textColor={text}
        activeOutlineColor = {outline.activeOutlineColor}
        outlineColor = {outline.outlineColor}
        theme={{ colors: { background: background,
                            onSurfaceVariant: outline.outlineColor}}}
        label="Email Address"
        mode="outlined"
      />
      <View style={{height:"2%"}}></View>
      <TextInput style={Styles.textInput}
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
        <Text style={[Styles.text_sm ,{color: text}]}>
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
        style={[Styles.text_lg, {color:text}]}>
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

});


export default Login;
