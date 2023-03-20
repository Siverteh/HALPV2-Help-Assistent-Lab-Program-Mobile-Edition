/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

//import CheckBox from '@react-native-community/checkbox';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { Button, TextInput, Checkbox } from 'react-native-paper';
import { fontFamily, style } from '@mui/system';

function Password() {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  return (
    <TextInput style={styles.TextInput}
      label="Password"
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
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.View}>
      <TextInput style={styles.TextInput}
        label="Email Address"
        mode="outlined"
      />
      <Password></Password>
      <Checkbox
      status={'checked'}
      />
      <Text>Remember me</Text>
      <Button style={styles.Button}
        mode="contained" 
        onPress={() => console.log('Pressed')}>
        LOG IN
      </Button>
      <Text>Forgot your password?</Text>
      <Text>Register as a new user</Text>
      <Text>Use another service to log in</Text>
      <Button style={styles.Button}
        mode="contained" 
        onPress={() => console.log('Pressed')}>
        DISCORD
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  View: {
    marginTop: 32,
    paddingHorizontal: 24,
    width: 336
    },
  TextInput: {
    marginTop: 32,
    paddingHorizontal: 24,
    width: 336
  },
  Button: {
    marginTop: 32,
    paddingHorizontal: 24,
    width: 336
    },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});


export default App;
