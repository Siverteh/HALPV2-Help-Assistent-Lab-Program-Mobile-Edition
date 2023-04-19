import React, { useState, useContext } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Button, TextInput, Checkbox, DefaultTheme } from 'react-native-paper';
import { DarkModeContext } from '../Components/GlobalHook';
import Styles from '../styles/styles';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList, Login as LoginType } from '../types';
import { isEmpty } from 'lodash';
  
function Login({ navigation }: StackScreenProps<RootStackParamList, 'LoginScreen'>): JSX.Element {

  const isDarkMode = false;

  const [value, setValue] = useState<LoginType>()
  const [validation, setValidation] = useState({password: false, email: false})
  const [checked, setChecked] = useState(true);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleChecked = () => setChecked(x => !x)

  const handleLogin = async () => {
    console.log(value)
    if (isEmpty(value)) {
      console.log('feiiillll')
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(value),
    };
  
    fetch('https://chanv2.duckdns.org:7006/Auth/login', requestOptions)
      .then(response => {
        console.log(response)
      if (response.ok) {
        navigation.navigate("SettingScreen");
      }})
      .catch(() => {
        console.log('error')
      })
  }

  const handleForgottenPassword = () => {

  }

  const handleDiscord = () => {

  }

  const handleValidation = (name: string) => {
    if(isEmpty(value && (value as any)[name])) {
      setValidation(prev => {return {...prev, [name]: true}})
    }
    if (name === 'email' && value && !isEmail(value.email)) {
      setValidation(prev => {return {...prev, [name]: true}})
    }
    if (name === 'password' && value && !isValidPassword(value.password)) {
      setValidation(prev => {return {...prev, [name]: true}})
    }
  }
  const { background, text, outline, iconColor, buttons, boxes, checkUncheck  } = useContext(DarkModeContext)

  const handleChange = (name: string) => (text: string) => {
    setValue((prev) => {return {...prev, [name]: text} as any})
    if(!isEmpty(text)) {
      setValidation(prev => {return {...prev, [name]: false}})
    }
  }

  const isEmail = (value: string) =>  (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
  const isValidPassword = (value: string) =>(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(value))

  const handleRegister = () => navigation.navigate("Register")

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
        value={value?.email ?? ''}
        onChangeText={handleChange('email')}
        onBlur={() => handleValidation('email')}
        error={validation.email}
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
      value={value?.password ?? ''}
      onChangeText={handleChange('password')}
      onBlur={() => handleValidation('password')}
      error={validation.password}
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
        onPress={handleLogin}
        disabled={Object.values(validation).some(v => v === false)}
      >
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
