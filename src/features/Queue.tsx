import React, { useContext } from 'react';
import { Image, View, TouchableOpacity, useColorScheme } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { Dimensions } from 'react-native';
import Styles from '../styles/styles';
import { DarkModeContext } from '../Components/GlobalHook';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Queue = ({ route, navigation }: any) => {
  const isDarkMode = useColorScheme() === 'dark';
  const { background, text, buttons, boxes  } = useContext(DarkModeContext)

  const ticket = route.params;

  const handleEdit = () => {
    navigation.navigate('Edit', ticket)
  };

  const handleCancel = () => {
    navigation.navigate('CreateScreen')
  };

  return (
    <View style={{backgroundColor: background, flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 0, paddingBottom: 100 }}>
      <Image source={require('.././img/halpy3.png')} style={Styles.logo} />
      <View style={[Styles.boxStyle,{ justifyContent: 'space-between', alignItems: 'center', backgroundColor: boxes.backgroundColor , width: '90%', height: screenHeight * 0.75, maxWidth: screenWidth * 0.9, maxHeight: screenHeight * 0.75, marginTop: -25, borderRadius: 20}]}>
        <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }}>
          <Text style={[{color: text, fontSize: 24 }]}>Hi Charlie</Text>
          <Text style={[{color: text, fontSize: 20 }]}>You are number</Text>
          <Text style={[{color: text, fontSize: 120 }]}>1</Text>
          <Text style={[{color: text, fontSize: 20 }]}>in the queue</Text>
        </View>
        <View style={{ alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center' }}>
          <Button 
            onPress={handleEdit} 
            textColor={text}
            style={[Styles.buttonStyle,{ backgroundColor: buttons.queueButton ,height: "18%", width:"45%"}]}
            contentStyle={{flexDirection: 'row-reverse', height: "100%", width: "100%"}}>
            EDIT TICKET          
            </Button>
            <View style={{height:20}}></View>
            <Button 
            onPress={handleCancel} 
            textColor={isDarkMode ? "#FFFFFF" : "#201C24"}
            style={[Styles.boxStyle, {backgroundColor: boxes.backgroundColor, height: "18%", width:"45%"}]}
            contentStyle={{flexDirection: 'row-reverse', height: "100%", width: "100%"}}>
            CANCEL          
            </Button>
        </View>
      </View>
    </View>
  );
};

export default Queue;
