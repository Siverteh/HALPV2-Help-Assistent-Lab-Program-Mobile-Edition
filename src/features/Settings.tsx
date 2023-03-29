import Styles from "../styles/styles";
import { Button, Text, Modal, Portal, TextInput } from "react-native-paper";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Dimensions, useColorScheme, View} from 'react-native';
import * as React from 'react';

const Settings = ({isDarkMode}: {isDarkMode: boolean}) => {
  const [isProfileModalVisible, setIsProfileModalVisible] = React.useState(false);

  const openProfileModal = () => setIsProfileModalVisible(true);
  const closeProfileModal = () => setIsProfileModalVisible(false);
  const screenHeight = Dimensions.get("window").height;
  const containerStyle = [isDarkMode ? Styles.dm_background : Styles.lm_background, {height: screenHeight*0.4, width: "70%", borderRadius: 20}];
  

  return (
    <View style={[isDarkMode ? Styles.dm_background: Styles.lm_background, {justifyContent: 'center', alignItems: 'center', height: screenHeight*0.70 }]}>
      <Button style={[isDarkMode ? Styles.dm_button : Styles.lm_button, {height: "8%", width:"60%"}]}
        mode="contained"
        textColor={isDarkMode ? "#FFFFFF" : "#201C24"}
        contentStyle={{flexDirection: 'row-reverse', height: "100%", width: "100%"}}
        onPress={openProfileModal}>
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

      <Portal>
        <Modal visible={isProfileModalVisible} onDismiss={closeProfileModal} contentContainerStyle={[containerStyle, {alignSelf: 'center', alignItems: 'center', opacity: 0.8}]}>
        <TextInput 
            style={{width: "80%", marginTop: "10%"}}
            textColor={isDarkMode ? '#FFFFFF' : '#201C24'}
            activeOutlineColor = {isDarkMode ? '#FFFFFF' : '#201C24'}
            outlineColor = {isDarkMode ? '#0070C0' : '#201C24'}
            theme={{ colors: { background: isDarkMode ? '#0070C0' : '#FFFFFF',
                              onSurfaceVariant: isDarkMode ? '#FFFFFF' : '#201C24' } }}
            label="Name"
            mode="outlined"
            defaultValue="John Doe">
          </TextInput>
          <TextInput 
            style={{width: "80%", marginTop: "10%"}}
            textColor={isDarkMode ? '#FFFFFF' : '#201C24'}
            activeOutlineColor = {isDarkMode ? '#FFFFFF' : '#201C24'}
            outlineColor = {isDarkMode ? '#0070C0' : '#201C24'}
            theme={{ colors: { background: isDarkMode ? '#0070C0' : '#FFFFFF',
                              onSurfaceVariant: isDarkMode ? '#FFFFFF' : '#201C24' } }}
            label="Discord"
            mode="outlined"
            defaultValue="John Doe#2345">
          </TextInput>
          <Button style={[isDarkMode ? Styles.dm_button : Styles.lm_button, {height: "15%", width:"60%", marginTop: "10%"}]}
            mode="contained"
            textColor={isDarkMode ? "#FFFFFF" : "#201C24"}
            contentStyle={{flexDirection: 'row-reverse', height: "100%", width: "100%"}}
            onPress={() => console.log("hei")}>
            SAVE
          </Button>
        </Modal>
      </Portal>
    </View>
  );
};
const TimeEdit = ({isDarkMode}: {isDarkMode: boolean}) => {
  const screenHeight = Dimensions.get("window").height;
  return(
    <View style={[isDarkMode ? Styles.dm_background: Styles.lm_background, {justifyContent: 'center', alignItems: 'center', height: screenHeight*0.70 }]}>
  
    </View>
  );
};

const Roles = ({isDarkMode}: {isDarkMode: boolean}) => {
  const screenHeight = Dimensions.get("window").height;
  return(
    <View style={[isDarkMode ? Styles.dm_background: Styles.lm_background, {justifyContent: 'center', alignItems: 'center', height: screenHeight*0.70 }]}>
  
    </View>
  );
};

const renderTabBar = (props:any) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <TabBar
      {...props}
      indicatorStyle={[isDarkMode ? {backgroundColor: 'white'} : {backgroundColor: 'black'}]}
      style={[isDarkMode ? Styles.dm_background: Styles.lm_background, {paddingTop: '11%'}]}
      labelStyle={[isDarkMode ? Styles.dm_text : Styles.lm_text, {fontSize: 18}]}
      pressColor = {isDarkMode ? '#004082' : '#E0EEF7'}
    />
  );
};

export default function Tabs() {
  const isDarkMode = useColorScheme() === 'dark';

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: '1', title: 'Settings' },
    { key: '2', title: 'TimeEdit' },
    { key: '3', title: 'Roles' },
  ]);

  const renderScene = SceneMap({
    1: () => <Settings isDarkMode={isDarkMode} />,
    2: () => <TimeEdit isDarkMode={isDarkMode} />,
    3: () => <Roles isDarkMode={isDarkMode} />,
  });
  return (
    <>
      <Text style={[isDarkMode ? 
        {...Styles.dm_text, ...Styles.dm_background}: 
        {...Styles.lm_text, ...Styles.lm_background}, 
        {fontSize: 24, textAlign: 'center', paddingTop: 80}]}>
          {routes[index].title}
      </Text>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
      />
    </>
  );
}
