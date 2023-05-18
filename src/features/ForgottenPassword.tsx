import React, { useContext } from 'react';
import {
  Text,
  View
} from 'react-native';

import { Button, TextInput, IconButton } from 'react-native-paper';

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

    const handleNavigate = () => {
      navigation.navigate('LoginScreen')
    }

    return (
      <View style={[{ backgroundColor: background, height: '100%'}]}> 
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start'}}>
            <IconButton
              icon="arrow-left"
              iconColor={text}
              onPress={handleNavigate}
            />
          </View>
        <Header title='Forgotten Password'/>
        <View style={[{alignItems: 'center'}]}>
        <TextInput
          style={[Styles.textInput, { color: text, backgroundColor: boxes }]}
          label="Email Address"
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
        <Text style={[{color: text, width: '85%', textAlign: 'center', marginBottom: 20 }]}>
          Type in your email address to receive a link where you can create a new password.
        </Text>
        <View style={{ marginBottom: 20, width: '100%', alignItems: 'center'}}>
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
      </View>
    );
}

export default ForgottenPassword;