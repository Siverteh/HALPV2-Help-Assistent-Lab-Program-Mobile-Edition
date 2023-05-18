import React, { useState, useContext } from 'react';
import {
  Text,
  View,
  Alert,
  ScrollView,
  useWindowDimensions,
} from 'react-native';

import { useSelector } from "react-redux"

import { Button, IconButton, TextInput } from 'react-native-paper';

import Styles from '../styles/styles';

import { StackScreenProps } from '@react-navigation/stack';
import { ThemeContext } from '../Components/ThemeContext';
import { AppState, RootStackParamList } from '../types';
import { Header } from '../Components/CustomComponents';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';


function ChangePassword({ navigation }: StackScreenProps<RootStackParamList, 'ChangePassword'>): JSX.Element {

  
  const { user: { email, token }} = useSelector((state: AppState) => state.user)

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntryRepeat, setSecureTextEntryRepeat] = useState(true);
  const [secureTextEntryCurrent, setSecureTextEntryCurrent] = useState(true);
  const { background, text, boxes, buttons, outline, iconColor  } = useContext(ThemeContext)
  const { height, width } = useWindowDimensions();
  const tabBarHeight = useBottomTabBarHeight();
  const viewHeight = height - tabBarHeight;

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
        const response = fetch('https://chanv2.duckdns.org:7006/api/user/changePassword', {
          method: "PUT",
          headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}` 
          },
          body: JSON.stringify(
            {
            email: email,
            oldPassword: currentPassword,
            newPassword: newPassword,
          }
        )}).then((response) => {
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
      })
      } catch (error: any) 
      {
        Alert.alert('Error', 'Incorrect current password!');
        
        //console.log(error.response);
          console.log('Here');
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

const handleNavigate = () => {
  navigation.navigate('SettingScreen')
}

return (
  <ScrollView>
    <View style={{
        backgroundColor: background,
        height: viewHeight,
        justifyContent: "center"
      }}>
  <View style={{ backgroundColor: background, height: '100%' }}>
    <IconButton
        icon="arrow-left"
        iconColor={text}
        onPress={handleNavigate}
        style={{ height: 48, width: 48, margin: 2}}
      />
    <Header title='Change Password' />
    <View style={{ alignItems: 'center' }}>
      <TextInput
        style={[Styles.textInput, { color: text, backgroundColor: boxes }]}
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
            icon={secureTextEntryCurrent ? 'eye-off': 'eye'}
            iconColor={iconColor}
            style={{height: 48, width: 48}}
            onPress={() => {
              setSecureTextEntryCurrent(!secureTextEntryCurrent);
              return false;
            }}
          />
        }
      />
      <TextInput
        style={[Styles.textInput, { color: text, backgroundColor: boxes}]}
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
          icon={secureTextEntry ? 'eye-off': 'eye'}
          iconColor={iconColor}
          style={{height: 48, width: 48}}
            onPress={() => {
              setSecureTextEntry(!secureTextEntry);
              return false;
            }}
          />
        }
      />
      <TextInput
        style={[Styles.textInput, { color: text, backgroundColor: boxes }]}
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
          icon={secureTextEntryRepeat ? 'eye-off': 'eye'}
          iconColor={iconColor}
          style={{height: 48, width: 48}}
            onPress={() => {
              setSecureTextEntryRepeat(!secureTextEntryRepeat);
              return false;
            }}
          />
        }
      />
      <Text style={[{ color: text, width: '85%', textAlign: 'center', margin: '2%' }]}>
        Type in your current password and preferred new password, then press change to update your password.
      </Text>
        <Button
          style={[Styles.buttonStyle, { backgroundColor: buttons.backgroundColor }]}
          mode="contained"
          labelStyle={{ color: text }}
          onPress={handleChangePassword}
        >
          CHANGE
        </Button>
    </View>
  </View>
  </View></ScrollView>
);
}
export default ChangePassword;