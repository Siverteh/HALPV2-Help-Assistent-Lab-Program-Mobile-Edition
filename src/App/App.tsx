/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import "../features/HelplistLM"
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Helplist from '../features/HelplistLM';
import Styles from '../styles/styles';

type SectionProps = PropsWithChildren<{
  title: string;
}>;


function App(): JSX.Element {

  return (
    <View style={Styles.lm_background}>
      <ScrollView>
      <Helplist></Helplist>
      </ScrollView>
 
    </View>
 
      
  );
}

export default App;
