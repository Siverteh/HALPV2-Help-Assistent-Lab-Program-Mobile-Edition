import React, { useState, useContext } from 'react';
import {
  Image,
  Text,
  View,
} from 'react-native';

import { Button, TextInput } from 'react-native-paper';

import Styles from '../styles/styles';

import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { ThemeContext } from '../Components/GlobalHook';
import { RootStackParamList } from '../types';


function ForgottenPassword({ navigation }: StackScreenProps<RootStackParamList, 'ForgottenPassword'>): JSX.Element {
    const { background, text, buttons, boxes  } = useContext(ThemeContext)


    const handleSendResetLink = () => {
    // Add logic to send reset link
    };

  return (
    <View style={[{backgroundColor: background, alignItems: 'center', width: '100%', height: '100%' }]}>
      <Image
        style={Styles.logo}
        source={require('.././img/halpy3.png')}
      />
      <Text style={[{color: text,  fontSize: 30, paddingBottom: 0, marginBottom: "7%" }]}>
        Forgotten Password
      </Text>
      <TextInput
        style={[Styles.boxStyle, {color: text, width: "85%", margin: "2%" }]}
        label="Email Address"
        mode="outlined"
        keyboardType="email-address"
      />
      <Text style={[{color: text, width: '85%', textAlign: 'center' }]}>
        Type in your email address to receive a link where you can create a new password.
      </Text>
      <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 20, width: '100%', alignItems: 'center' }}>
        <Button
          style={[Styles.buttonStyle,{backgroundColor: buttons.backgroundColor, width: 230, height: 50, margin: "2%" }]}
          mode="contained"
          labelStyle={{ color: text }}
          onPress={handleSendResetLink}
        >
          SEND
        </Button>
      </View>
    </View>
  );
}

export default ForgottenPassword;