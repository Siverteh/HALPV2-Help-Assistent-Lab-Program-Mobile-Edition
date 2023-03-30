import Styles from "../styles/styles";
import { Button, Text, Modal, Portal, TextInput } from "react-native-paper";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Dimensions, useColorScheme, View} from 'react-native';
import * as React from 'react';

const Text_Input = ({isDarkMode}: {isDarkMode: boolean}, lable:string, defaultValue:string = '', password:boolean = false) => {
  return(
    <>
      <View style={{height:'7%'}}></View>
      <TextInput 
      style={{width: "80%"}}
              textColor={isDarkMode ? '#FFFFFF' : '#201C24'}
              activeOutlineColor = {isDarkMode ? '#FFFFFF' : '#201C24'}
              outlineColor = {isDarkMode ? '#0070C0' : '#201C24'}
              theme={{ colors: { background: isDarkMode ? '#0070C0' : '#FFFFFF',
              onSurfaceVariant: isDarkMode ? '#FFFFFF' : '#201C24' } }}
              label={lable}
              mode="outlined"
              defaultValue={defaultValue}
              secureTextEntry={password}>
    </TextInput>
  </>
  )
}


const Button_ = ({isDarkMode}: {isDarkMode: boolean}, Value:string, onPress:any, Height:string = '8%') => {
  return(
    <>
      <View style={{height:"5%"}}></View>
      <Button style={[isDarkMode ? Styles.dm_button : Styles.lm_button, {height: Height, width:"60%"}]}
          mode="contained"
          textColor={isDarkMode ? "#FFFFFF" : "#201C24"}
          contentStyle={{flexDirection: 'row-reverse', height: "100%", width: "100%"}}
          onPress={onPress}>
          {Value}
      </Button>
    </>
  )
}


const Settings = ({isDarkMode}: {isDarkMode: boolean}) => {
  const [isProfileModalVisible, setIsProfileModalVisible] = React.useState(false);
  const openProfileModal = () => setIsProfileModalVisible(true);
  const closeProfileModal = () => setIsProfileModalVisible(false);

  const [isPasswordModalVisible, setIsPasswordModalVisible] = React.useState(false);
  const openPasswordModal = () => setIsPasswordModalVisible(true);
  const closePasswordModal = () => setIsPasswordModalVisible(false);

  const [isExserviceModalVisible, setIsExserviceModalVisible] = React.useState(false);
  const openExserviceModal = () => setIsExserviceModalVisible(true);
  const closeExserviceModal = () => setIsExserviceModalVisible(false);

  const [isDeleteModalVisible, setIsDeleteModalVisible] = React.useState(false);
  const openDeleteModal = () => setIsDeleteModalVisible(true);
  const closeDeleteModal = () => setIsDeleteModalVisible(false);

  const screenHeight = Dimensions.get("window").height;
  const containerStyle = [isDarkMode ? Styles.dm_background : Styles.lm_background, {height: screenHeight*0.45, width: "70%", borderRadius: 20}];
  

  return (
    <View style={[isDarkMode ? Styles.dm_background: Styles.lm_background, {justifyContent: 'center', alignItems: 'center', height: screenHeight*0.70 }]}>
      {Button_({isDarkMode}, "PROFILE", openProfileModal)}
      {Button_({isDarkMode}, "PASSWORD", openPasswordModal)}
      {Button_({isDarkMode}, "EXTERNAL-SERVICE", openExserviceModal)}
      {Button_({isDarkMode}, "DELETE ACCOUNT", openDeleteModal)}

      <Portal>
        <Modal visible={isProfileModalVisible} onDismiss={closeProfileModal} contentContainerStyle={[containerStyle, {alignSelf: 'center', alignItems: 'center', opacity: 0.8}]}>
          {Text_Input({isDarkMode}, "Name", "Doe")}
          {Text_Input({isDarkMode}, "Discord", "Doe#1234")}
          {Text_Input({isDarkMode}, "Email", "Doe@uia.no")}
          {Button_({isDarkMode}, "SAVE", closeProfileModal, '15%')}
        </Modal>
        <Modal visible={isPasswordModalVisible} onDismiss={closePasswordModal} contentContainerStyle={[containerStyle, {alignSelf: 'center', alignItems: 'center', opacity: 0.8}]} >
          {Text_Input({isDarkMode}, "Old Password", '', true)}
          {Text_Input({isDarkMode}, "New Password", '', true)}
          {Text_Input({isDarkMode}, "Confirm Password", '', true)}
          {Button_({isDarkMode}, "SAVE", closePasswordModal, '15%')}
        </Modal>
        <Modal visible={isExserviceModalVisible} onDismiss={closeExserviceModal} contentContainerStyle={[containerStyle, {alignSelf: 'center', alignItems: 'center', opacity: 0.8, height: screenHeight*0.20}]} >
          {Button_({isDarkMode}, "CONECT DISCORD", closeExserviceModal, '30%')}
        </Modal>
        <Modal visible={isDeleteModalVisible} onDismiss={closeDeleteModal} contentContainerStyle={[containerStyle, {alignSelf: 'center', alignItems: 'center', opacity: 0.8, height: screenHeight*0.20}]} >
          {Button_({isDarkMode}, "DELETE ACCOUNT", closeDeleteModal, '30%')}
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
