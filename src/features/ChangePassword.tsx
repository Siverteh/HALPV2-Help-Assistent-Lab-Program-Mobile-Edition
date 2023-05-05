import React, { useState, useContext } from 'react';
import {
  Image,
  Text,
  View,
  Alert,
} from 'react-native';

import axios from 'axios';
import { useSelector } from "react-redux"

import { Button, TextInput } from 'react-native-paper';

import Styles from '../styles/styles';

import { StackScreenProps } from '@react-navigation/stack';
import { ThemeContext } from '../Components/GlobalHook';
import { AppState, RootStackParamList } from '../types';


function ChangePassword({ navigation }: StackScreenProps<RootStackParamList, 'ChangePassword'>): JSX.Element {

  const { user: { email }} = useSelector((state: AppState) => state.user)

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntryRepeat, setSecureTextEntryRepeat] = useState(true);
  const [secureTextEntryCurrent, setSecureTextEntryCurrent] = useState(true);
  const { background, text, boxes, buttons, outline  } = useContext(ThemeContext)

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');

  const handleChangePassword = async () => {
    if (!email || !currentPassword || !newPassword || !repeatNewPassword) {
      Alert.alert('Error', 'All boxes need to be filled.');
      return;
    }

    if (newPassword !== repeatNewPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasLowerCase = /[a-z]/.test(newPassword);
    const hasNumber = /\d/.test(newPassword);
    const hasSymbol = /\W|_/.test(newPassword);

    if (
      newPassword.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSymbol
    ) {
      try {
        const response = await axios.put('http://chanv2.duckdns.org:5084/api/user/changePassword', {
          email: email,
          oldPassword: currentPassword,
          newPassword: newPassword,
        });

        if (response.status === 204) {
          Alert.alert('Success', 'Password changed successfully!');
          navigation.goBack();
        }
        else if (response.status === 401) {
          Alert.alert('Error', 'Incorrect current password!');
        }
        else {
          Alert.alert('Error', 'An error occurred while changing the password.');
        }
      } catch (error: any) 
      {
        Alert.alert('Error', 'Incorrect current password!');
      }
    } else {
      let errMsg = 'Password must:';
      if (newPassword.length < minLength) {
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

  Alert.alert('Error', errMsg)
}

};

return (
  <View style={{ backgroundColor: background, alignItems: 'center', width: '100%', height: '100%' }}>
    <Image
      style={Styles.logo}
      source={require('.././img/halpy3.png')}
    />
    <Text style={[{ color: text, fontSize: 30, paddingBottom: 0, marginBottom: "7%" }]}>
      Change Password
    </Text>
    <TextInput
      style={[Styles.boxStyle, { color: text, backgroundColor: boxes, width: "85%", margin: "2%" }]}
      label="Current Password"
      mode="outlined"
      textColor={text}
          outlineColor={outline.activeOutlineColor}
          activeOutlineColor={outline.outlineColor}
          theme={{
            colors: {
              background: background,
              onSurfaceVariant: outline.outlineColor
            }
          }}
      secureTextEntry={secureTextEntryCurrent}
      value={currentPassword}
      onChangeText={text => setCurrentPassword(text)}
      right={
        <TextInput.Icon
          icon="eye"
          onPress={() => {
            setSecureTextEntryCurrent(!secureTextEntryCurrent);
            return false;
          }}
        />
      }
    />
    <TextInput
      style={[Styles.boxStyle, { color: text, backgroundColor: boxes, width: "85%", margin: "2%" }]}
      label="New Password"
      mode="outlined"
      textColor={text}
          outlineColor={outline.activeOutlineColor}
          activeOutlineColor={outline.outlineColor}
          theme={{
            colors: {
              background: background,
              onSurfaceVariant: outline.outlineColor
            }
          }}
      secureTextEntry={secureTextEntry}
      value={newPassword}
      onChangeText={text => setNewPassword(text)}
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
      style={[Styles.boxStyle, { color: text, backgroundColor: boxes, width: '85%' }]}
      textColor={text}
          outlineColor={outline.activeOutlineColor}
          activeOutlineColor={outline.outlineColor}
          theme={{
            colors: {
              background: background,
              onSurfaceVariant: outline.outlineColor
            }
          }}
      label="Repeat New Password"
      mode="outlined"
      secureTextEntry={secureTextEntryRepeat}
      value={repeatNewPassword}
      onChangeText={text => setRepeatNewPassword(text)}
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
    <Text style={[{ color: text, width: '85%', textAlign: 'center' }]}>
      Type in your current password and preferred new password, then press change to update your password.
    </Text>
    <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 20, width: '100%', alignItems: 'center' }}>
      <Button
        style={[Styles.buttonStyle, { backgroundColor: buttons.backgroundColor, height: '20%', width: '40%' }]}
        mode="contained"
        labelStyle={{ color: text }} // This line changes the text color to black
        onPress={handleChangePassword}
      >
        CHANGE
      </Button>
    </View>
  </View>
);
}
export default ChangePassword;