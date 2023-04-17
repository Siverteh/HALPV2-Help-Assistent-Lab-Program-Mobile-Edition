import React from 'react';
import {
  Image,
  Text,
  View,
} from 'react-native';

import { Button, TextInput } from 'react-native-paper';

import Styles from '../styles/styles';

import { StackNavigationProp } from '@react-navigation/stack';

type ForgottenPasswordScreenNavigationProp = StackNavigationProp<any, 'ForgottenPassword'>;

interface ForgottenPasswordProps {
  navigation: ForgottenPasswordScreenNavigationProp;
}

function ForgottenPassword({ navigation }: ForgottenPasswordProps): JSX.Element {
  const isDarkMode = false;
  const stylePrefix = isDarkMode ? 'dm' : 'lm';
  const textColor = isDarkMode ? '#ffffff' : '#000000';

  const handleSendResetLink = () => {
    // Add logic to send reset link
  };

  return (
    <View style={[Styles[`${stylePrefix}_background`], { alignItems: 'center', width: '100%', height: '100%' }]}>
      <Image
        style={Styles.logo}
        source={require('.././img/halpy3.png')}
      />
      <Text style={[Styles[`${stylePrefix}_text`], Styles.Header, { fontSize: 30 }]}>
        Forgotten Password
      </Text>
      <TextInput
        style={{ ...Styles[`${stylePrefix}_text`], ...Styles[`${stylePrefix}_boxes`], width: '85%' }}
        label="Email Address"
        mode="outlined"
        keyboardType="email-address"
        theme={{ colors: { text: textColor, primary: textColor } }}
      />
      <Text style={[Styles[`${stylePrefix}_text`], { width: '85%', textAlign: 'center' }]}>
        Type in your email address to receive a link where you can create a new password.
      </Text>
      <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 20, width: '100%', alignItems: 'center' }}>
        <Button
          style={[Styles[`${stylePrefix}_button`], { height: '15%', width: '40%' }]}
          mode="contained"
          labelStyle={{ color: textColor }}
          onPress={handleSendResetLink}
        >
          SEND
        </Button>
      </View>
    </View>
  );
}

export default ForgottenPassword;