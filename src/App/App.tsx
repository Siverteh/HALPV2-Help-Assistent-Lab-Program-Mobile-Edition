import React from 'react';
import type {PropsWithChildren} from 'react';
import "../features/Helplist"
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';


import Helplist from '../features/Helplist';
import {Light_Styles, Dark_Styles, Misc_Style} from '../styles/styles';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): JSX.Element {

  return (
    <View style={Light_Styles.lm_background}>
      <ScrollView>
      <Helplist></Helplist>
      </ScrollView>
    </View>
  );
}

export default App;
