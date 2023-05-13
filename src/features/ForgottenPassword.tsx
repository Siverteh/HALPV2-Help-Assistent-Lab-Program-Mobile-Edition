import React, { useContext } from 'react';
import {
  Text,
  View,
} from 'react-native';

import { Button, TextInput } from 'react-native-paper';

import Styles from '../styles/styles';

import { StackScreenProps } from '@react-navigation/stack';
import { ThemeContext } from '../Components/ThemeContext';
import { RootStackParamList } from '../types';
import { Header } from '../Components/CustomComponents';


function ForgottenPassword({ navigation }: StackScreenProps<RootStackParamList, 'ForgottenPassword'>): JSX.Element {
  const { background, text, boxes, buttons, outline, iconColor  } = useContext(ThemeContext)


    const handleSendResetLink = () => {
    // Add logic to send reset link
    };

  return (
    <View style={[{backgroundColor: background, alignItems: 'center', width: '100%', height: '100%' }]}>
      <Header title='Forgotten Password'/>
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