import React, { useState } from 'react';
import {
  Image,
  Text,
  View,
} from 'react-native';

import { Button, TextInput } from 'react-native-paper';

import Styles from '../styles/styles';

import { StackNavigationProp } from '@react-navigation/stack';

type ChangePasswordScreenNavigationProp = StackNavigationProp<any, 'ChangePassword'>;

interface ChangePasswordProps {
  navigation: ChangePasswordScreenNavigationProp;
}

function ChangePassword({ navigation }: ChangePasswordProps): JSX.Element {
  const isDarkMode = false;
  const stylePrefix = isDarkMode ? 'dm' : 'lm';
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntryRepeat, setSecureTextEntryRepeat] = useState(true);

  const handleChangePassword = () => {
    // Add logic to change the password
  };

  return (
    <View style={[Styles[`${stylePrefix}_background`], { alignItems: 'center', width: '100%', height: '100%' }]}>
      <Image
        style={Styles.logo}
        source={require('.././img/halpy3.png')}
      />
      <Text style={[Styles[`${stylePrefix}_text`], Styles.Header, { fontSize: 30 }]}>
        Change Password
      </Text>
      <TextInput
        style={{ ...Styles[`${stylePrefix}_text`], ...Styles[`${stylePrefix}_boxes`], width: '85%' }}
        label="New Password"
        mode="outlined"
        secureTextEntry={secureTextEntry}
        right={
          <TextInput.Icon
            icon="eye"
            onPress={() => {
              setSecureTextEntry(!secureTextEntry);
              return false;
            }}
          />
        }
      />
      <View style={{ height: '2%' }}></View>
      <TextInput
        style={{ ...Styles[`${stylePrefix}_text`], ...Styles[`${stylePrefix}_boxes`], width: '85%' }}
        label="Repeat New Password"
        mode="outlined"
        secureTextEntry={secureTextEntryRepeat}
        right={
          <TextInput.Icon
            icon="eye"
            onPress={() => {
              setSecureTextEntryRepeat(!secureTextEntryRepeat);
              return false;
            }}
          />
        }
      />
      <View style={{ height: '2%' }}></View>
      <Text style={[Styles[`${stylePrefix}_text`], { width: '85%', textAlign: 'center' }]}>
        Type in your preferred new password and press change to change your password.
      </Text>
      <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 20, width: '100%', alignItems: 'center' }}>
        <Button
          style={[Styles[`${stylePrefix}_button`], { height: '20%', width: '40%' }]}
          mode="contained"
          labelStyle={{ color: '#000000' }} // This line changes the text color to black
          onPress={handleChangePassword}
        >
          CHANGE
        </Button>
      </View>
    </View>
  );
}

export default ChangePassword;