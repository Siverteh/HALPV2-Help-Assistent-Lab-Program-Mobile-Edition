import Styles from "../styles/styles";
import { Button, Text } from "react-native-paper";
import { Box } from "@react-native-material/core";
import { TabView, SceneMap, TabBar, NavigationState, Route, SceneRendererProps, TabBarIndicatorProps, TabBarItemProps } from 'react-native-tab-view';
import { View, StyleSheet, Dimensions, StatusBar, PressableAndroidRippleConfig, StyleProp, TextStyle, ViewStyle, useColorScheme, TouchableOpacity } from 'react-native';
import * as React from 'react';
import { Scene, Event } from "react-native-tab-view/lib/typescript/src/types";



const Settings = (isDarkMode: Boolean) => (
    <View style={{ ...Styles.lm_background, justifyContent: 'center', alignItems: 'center', height: "100%" }}>
      <Button style={[isDarkMode ? Styles.dm_button : Styles.lm_button, {height: "8%", width:"60%"}]}
        mode="contained"
        textColor={isDarkMode ? "#FFFFFF" : "#201C24"}
        contentStyle={{flexDirection: 'row-reverse', height: "100%", width: "100%"}}
        onPress={() => console.log("hei")}>
        PROFILE
      </Button>
      <View style={{height:"5%"}}></View>
      <Button style={[isDarkMode ? Styles.dm_button : Styles.lm_button, {height: "10%", width:"60%"}]}
        mode="contained"
        textColor={isDarkMode ? "#FFFFFF" : "#201C24"}
        contentStyle={{flexDirection: 'row-reverse', height: "100%", width: "100%"}}
        onPress={() => console.log("hei")}>
        CHANGE PASSWORD
      </Button>
      <View style={{height:"5%"}}></View>
      <Button style={[isDarkMode ? Styles.dm_button : Styles.lm_button, {height: "10%", width:"60%"}]}
        mode="contained"
        textColor={isDarkMode ? "#FFFFFF" : "#201C24"}
        contentStyle={{flexDirection: 'row-reverse', height: "100%", width: "100%"}}
        onPress={() => console.log("hei")}>
        EXTERNAL SERVICES
      </Button>
      <View style={{height:"5%"}}></View>
      <Button style={[isDarkMode ? Styles.dm_button : Styles.lm_button, {height: "10%", width:"60%"}]}
        mode="contained"
        textColor={isDarkMode ? "#FFFFFF" : "#201C24"}
        contentStyle={{flexDirection: 'row-reverse', height: "100%", width: "100%"}}
        onPress={() => console.log("hei")}>
        DELETE PERSONAL DATA
      </Button>
    </View>
);
const TimeEdit = () => (
  <View/>
);
const Roles = () => (
  <View/>
);

const renderTabBar = (props:any) => {
  return (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'black' }}
      style={{...Styles.lm_background, paddingTop: 40}}
      labelStyle={{ ...Styles.lm_text }}
      pressColor='#E0EEF7'
    />
  );
};

export default class Tabs extends React.Component {

  state = {
    index: 0,
    routes: [
      { key: '1', title: 'Settings' },
      { key: '2', title: 'TimeEdit' },
      { key: '3', title: 'Roles' },
    ],
  };

  render() {
    const { index, routes } = this.state;
    return (
      <>
        <Text style={{...Styles.lm_text, ...Styles.lm_background, fontSize: 24, textAlign: 'center', paddingTop: 80}}>{routes[index].title}</Text>
        <TabView
          navigationState={this.state}
          renderScene={SceneMap({
            1: Settings,
            2: TimeEdit,
            3: Roles,
          })}
          onIndexChange={index => this.setState({ index })}
          renderTabBar={renderTabBar}
        />
      </>
    );
  }
}