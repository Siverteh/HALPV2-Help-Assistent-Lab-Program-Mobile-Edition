import Styles from "../styles/styles";
import { Button, Text } from "react-native-paper";
import { Box } from "@react-native-material/core";
import { TabView, SceneMap, TabBar, NavigationState, Route, SceneRendererProps, TabBarIndicatorProps, TabBarItemProps } from 'react-native-tab-view';
import { View, StyleSheet, Dimensions, StatusBar, PressableAndroidRippleConfig, StyleProp, TextStyle, ViewStyle } from 'react-native';
import * as React from 'react';
import { Scene, Event } from "react-native-tab-view/lib/typescript/src/types";



const Settings = () => (
  <>
    <Box style={{ ...Styles.lm_background, justifyContent: 'center', alignItems: 'center', height: "100%" }}>
      <Button style={{ ...Styles.lm_button, width: 230, height: 50,  }} labelStyle={Styles.lm_textButton}>PROFILE</Button>
      <Button style={{ ...Styles.lm_button, width: 230, height: 50,  }} labelStyle={Styles.lm_textButton}>CHANGE PASSWORD</Button>
      <Button style={{ ...Styles.lm_button, width: 230, height: 50,  }} labelStyle={Styles.lm_textButton}>EXTERNAL SERVICES</Button>
      <Button style={{ ...Styles.lm_button, width: 230, height: 50,  }} labelStyle={Styles.lm_textButton}>DELETE PERSONAL DATA</Button>
    </Box>
  </>
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
