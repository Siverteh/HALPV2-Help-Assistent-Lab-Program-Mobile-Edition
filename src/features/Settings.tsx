import Styles from "../styles/styles";
import { Button } from "react-native-paper";
import { Box } from "@react-native-material/core";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import * as React from 'react';



const Settings = () => (
  <Box style={Styles.lm_background}>
    <Button style={{ ...Styles.lm_button, width: 230, height: 50,  }} labelStyle={Styles.lm_textButton}>PROFILE</Button>
    <Button style={{ ...Styles.lm_button, width: 230, height: 50,  }} labelStyle={Styles.lm_textButton}>CHANGE PASSWORD</Button>
    <Button style={{ ...Styles.lm_button, width: 230, height: 50,  }} labelStyle={Styles.lm_textButton}>EXTERNAL SERVICES</Button>
    <Button style={{ ...Styles.lm_button, width: 230, height: 50,  }} labelStyle={Styles.lm_textButton}>DELETE PERSONAL DATA</Button>
  </Box>
);
const TimeEdit = () => (
  <View/>
);
const Roles = () => (
  <View/>
);

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
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          1: Settings,
          2: TimeEdit,
          3: Roles,
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
        style={{...Styles.lm_boxes,}}
      />
    );
  }
}


/*const Settings = () => {
  return (
    <>
    <Box style={Styles.lm_background}>
      <Button style={{ ...Styles.lm_button, width: 230, height: 50,  }} labelStyle={Styles.lm_textButton}>PROFILE</Button>
      <Button style={{ ...Styles.lm_button, width: 230, height: 50,  }} labelStyle={Styles.lm_textButton}>CHANGE PASSWORD</Button>
      <Button style={{ ...Styles.lm_button, width: 230, height: 50,  }} labelStyle={Styles.lm_textButton}>EXTERNAL SERVICES</Button>
      <Button style={{ ...Styles.lm_button, width: 230, height: 50,  }} labelStyle={Styles.lm_textButton}>DELETE PERSONAL DATA</Button>
    </Box>
    </>
  );
};

*/
//export default Settings;

