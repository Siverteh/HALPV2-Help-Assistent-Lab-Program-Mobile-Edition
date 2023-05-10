import React, { useState, useContext } from 'react';
import {
  Dimensions,
  Text,
  View,
} from 'react-native';
import { Button, TextInput, Checkbox, DefaultTheme } from 'react-native-paper';
import { ThemeContext } from '../Components/GlobalHook';
import Styles from '../styles/styles';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList, Login as LoginType } from '../types';
import { useDispatch } from 'react-redux'
import { isEmpty } from 'lodash';
import { actions } from '../reducers/userReducer';
import { Logo } from '../Components/CustomComponents';
  
function Login({ navigation }: StackScreenProps<RootStackParamList, 'LoginScreen'>): JSX.Element {
  const windowHeight = Dimensions.get('window').height;
  const dispatch = useDispatch()
  const { background, text, outline, iconColor, buttons, boxes, checkUncheck  } = useContext(ThemeContext)

  const [value, setValue] = useState<LoginType>()
  const [validation, setValidation] = useState({password: false, email: false})
  const [checked, setChecked] = useState(true);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleChecked = () => setChecked(x => !x)

  const handleLogin = async () => {

    if (isEmpty(value)) {
      console.log('feiiillll')
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(value),
    };
  
    fetch('https://chanv2.duckdns.org:7006/Auth/login', requestOptions)
      .then(response => response.json())
      .then(data => {
        if(data.status != 401) {
          dispatch(actions.setUser({...data, isLoggedIn: true}))
          navigation.navigate("SettingScreen")
        }
      })
      .catch(() => {
        console.log('error')
      })
  }

  const handleForgottenPassword = () => {
    navigation.navigate("ForgottenPassword")
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

  const handleChange = (name: string) => (text: string) => {
    setValue((prev) => {return {...prev, [name]: text} as any})
    if(!isEmpty(text)) {
      setValidation(prev => {return {...prev, [name]: false}})
    }
  }


  const isEmail = (value: string) =>  (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
  const isValidPassword = (value: string) =>(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?.&]{8,}$/.test(value))

  const handleRegister = () => navigation.navigate("Register")

  return (
    <View style={
        [{backgroundColor: background, height: '100%', alignItems: 'center'}]}>
      <Logo/>
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
        label="Email Address"
        mode="outlined"
        value={value?.email ?? ''}
        onChangeText={handleChange('email')}
        onBlur={() => handleValidation('email')}
        error={validation.email}
      />
      <TextInput
      style={[Styles.textInput, {backgroundColor: boxes,  color: text }]}
      label="Password"
      mode="outlined"
      textColor={text}
      secureTextEntry={secureTextEntry}
      outlineColor={outline.activeOutlineColor}
      activeOutlineColor={outline.outlineColor}
      theme={{
        colors: {
          background: background,
          onSurfaceVariant: outline.outlineColor
        }
      }}
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
      <View style={{flexDirection: "row", justifyContent:"flex-start", width:"85%", marginTop: '2%'}}>
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
      <Button
        style={[Styles.buttonStyle,{backgroundColor: buttons.backgroundColor}]}
        mode="contained"
        textColor={text}
        contentStyle={{flexDirection: 'row-reverse', height: "100%", width: "100%"}}
        onPress={handleLogin}
        // disabled={Object.values(validation).some(v => v === false)}
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
      <Text
        style={[Styles.text_lg, {color:text, marginTop: '4%'}]}>
          USE ANOTHER SERVICE TO LOG IN
      </Text>
      <Button style={[Styles.buttonStyle, {backgroundColor: buttons.backgroundColor, margin: '2%'}]}
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

export default Login;
