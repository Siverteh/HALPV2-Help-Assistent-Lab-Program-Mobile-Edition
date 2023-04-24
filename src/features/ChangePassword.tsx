import React, { useState, useContext } from 'react';
import {
  Image,
  Text,
  View,
  Alert,
} from 'react-native';

// Add the following import
import axios from 'axios';
import { useSelector } from "react-redux"

import { Button, TextInput } from 'react-native-paper';

import Styles from '../styles/styles';

import { StackNavigationProp } from '@react-navigation/stack';
import { ThemeContext } from '../Components/GlobalHook';
import { AppState } from '../types';

type ChangePasswordScreenNavigationProp = StackNavigationProp<any, 'ChangePassword'>;

interface ChangePasswordProps {
  navigation: ChangePasswordScreenNavigationProp;
}

function ChangePassword({ navigation }: ChangePasswordProps): JSX.Element {

  const { user: { role, isLoggedIn, email }} = useSelector((state: AppState) => state.user)

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntryRepeat, setSecureTextEntryRepeat] = useState(true);
  const { background, text, boxes, buttons  } = useContext(ThemeContext)

  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');

  const handleChangePassword = async () => {
    if (!email || !newPassword || !repeatNewPassword) {
      Alert.alert('Error', 'All boxes needs to be filled.');
      return;
    }

    // Check if the passwords match  
    if (newPassword !== repeatNewPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    // Password requirements
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
    )  
    {
      try {
        const response = await axios.put('http://chanv2.duckdns.org:5084/api/user/changePassword', {
          email: email,
          password: newPassword,
        });

        if (response.status === 200) {
          Alert.alert('Success', 'Password changed successfully!');
          navigation.goBack(); // Navigate back to the previous screen
        } else {
          Alert.alert('Error', 'An error occurred while changing the password.');
        }
      } catch (error: any) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("Response data:", error.response.data);
          console.log("Response status:", error.response.status);
          console.log("Response headers:", error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log("Request data:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error message:", error.message);
        }
        console.log("Error config:", error.config);
        Alert.alert('Error', 'An error occurred while changing the password.');
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
    <View style={{backgroundColor: background, alignItems: 'center', width: '100%', height: '100%' }}>
      <Image
        style={Styles.logo}
        source={require('.././img/halpy3.png')}
      />
      <Text style={[{color: text,  fontSize: 30, paddingBottom: 0, marginBottom: "7%" }]}>
        Change Password
      </Text>
      <TextInput
        style={[Styles.boxStyle, {color: text, backgroundColor: boxes, width: "85%", margin: "2%" }]}
        label="New Password"
        mode="outlined"
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
        style={[Styles.boxStyle, {color: text, backgroundColor: boxes, width: '85%'} ]}
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
      <Text style={[{color: text, width: '85%', textAlign: 'center' }]}>
        Type in your preferred new password and press change to change your password.
      </Text>
      <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 20, width: '100%', alignItems: 'center' }}>
        <Button
          style={[Styles.buttonStyle, {backgroundColor: buttons.backgroundColor, height: '20%', width: '40%' }]}
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