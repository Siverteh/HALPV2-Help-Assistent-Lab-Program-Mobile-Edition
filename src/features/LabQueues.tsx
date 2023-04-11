import React from 'react';
import { Image, View, TouchableOpacity, useColorScheme } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { Dimensions } from 'react-native';
import Styles from '../styles/styles';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const LabQueues = () => {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    const backgroundStyle = isDarkMode ? Styles.dm_background : Styles.lm_background;
    const textStyle = isDarkMode ? Styles.dm_text : Styles.lm_text;
    const boxesStyle = isDarkMode ? Styles.dm_boxes : Styles.lm_boxes;
  
    return (
      <View style={[backgroundStyle, { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 0, paddingBottom: 100 }]}>
        <Image source={require('.././img/halpy3.png')} style={Styles.logo} />
        <View style={{ justifyContent: 'space-between', alignItems: 'center', ...boxesStyle, width: '90%', height: screenHeight * 0.75, maxWidth: screenWidth * 0.9, maxHeight: screenHeight * 0.75, marginTop: -25, borderRadius: 20}}>
          <Text style={[textStyle, { fontSize: 24, paddingTop: '10%'}]}>Lab Queues</Text>
        </View>
      </View>
    );
  };
  

export default LabQueues;
