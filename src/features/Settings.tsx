import Styles from "../styles/styles";
import { Button, Text, Modal, Portal, TextInput, List } from "react-native-paper";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Dimensions, FlatList, TouchableOpacity, useColorScheme, View } from 'react-native';
import * as React from 'react';
import { useContext, useState } from "react";
import { RootStackParamList } from "../types";
import { StackScreenProps } from "@react-navigation/stack";
import { DarkModeContext, themeHook } from '../Components/GlobalHook';
import { theme } from "../styles/theme";




const Text_Input = (lable: string, defaultValue: string = '', password: boolean = false) => {
  const { background, text, buttons, boxes, outline } = useContext(DarkModeContext)

  return (
    <>
      <View style={{ height: '7%' }}></View>
      <TextInput
        style={{ width: "80%" }}
        textColor={text}
        activeOutlineColor={outline.activeOutlineColor}
        outlineColor={outline.outlineColor}
        theme={{
          colors: {
            background: background,
            onSurfaceVariant: outline.outlineColor
          }
        }}
        label={lable}
        mode="outlined"
        defaultValue={defaultValue}
        secureTextEntry={password}>
      </TextInput>
    </>
  )
}
const Text_Input_CB = (lable: string, defaultValue: string = '', password: boolean = false, onChangeText: (text: string) => void) => {
  const { background, text, outline } = useContext(DarkModeContext)

  return (
    <>
      <View style={{ height: '7%' }}></View>
      <TextInput
        style={{ width: "80%" }}
        textColor={text}
        activeOutlineColor={outline.activeOutlineColor}
        outlineColor={outline.outlineColor}
        theme={{
          colors: {
            background: background,
            onSurfaceVariant: outline.outlineColor
          }
        }}
        label={lable}
        mode="outlined"
        defaultValue={defaultValue}
        secureTextEntry={password}
        onChangeText={onChangeText}>
      </TextInput>
    </>
  )
}


const Button_ = ( Value: string, onPress: any, Height: string = '8%') => {
  const { buttons, outline } = useContext(DarkModeContext)

  return (
    <>
      <View style={{ height: "5%" }}></View>
      <Button style={[Styles.buttonStyle, {backgroundColor: buttons.backgroundColor, height: Height, width: "60%" }]}
        mode="contained"
        textColor={outline.outlineColor}
        contentStyle={{ flexDirection: 'row-reverse', height: "100%", width: "100%" }}
        onPress={onPress}>
        {Value}
      </Button>
    </>
  )
}

const Settings = ({navigation}: any ) => {
  const { background} = useContext(DarkModeContext);
  const { onChangeTheme} = themeHook();

  const [isProfileModalVisible, setIsProfileModalVisible] = React.useState(false);
  const openProfileModal = () => setIsProfileModalVisible(true);
  const closeProfileModal = () => setIsProfileModalVisible(false);

  const [isPasswordModalVisible, setIsPasswordModalVisible] = React.useState(false);
  const openPasswordModal = () => navigation.navigate('ChangePassword');
  const closePasswordModal = () => setIsPasswordModalVisible(false);

  const [isExserviceModalVisible, setIsExserviceModalVisible] = React.useState(false);
  const openExserviceModal = () => setIsExserviceModalVisible(true);
  const closeExserviceModal = () => setIsExserviceModalVisible(false);

  const [isDeleteModalVisible, setIsDeleteModalVisible] = React.useState(false);
  const openDeleteModal = () => setIsDeleteModalVisible(true);
  const closeDeleteModal = () => setIsDeleteModalVisible(false);



  const screenHeight = Dimensions.get("window").height;
  const containerStyle = {backgroundColor: background, height: screenHeight * 0.45, width: "70%", borderRadius: 20 };



  return (

    <View style={[{backgroundColor: background, justifyContent: 'center', alignItems: 'center', height: screenHeight * 0.70 }]}>
      {Button_( "PROFILE", openProfileModal)}
      {Button_( "PASSWORD", openPasswordModal)}
      {Button_("EXTERNAL-SERVICE", openExserviceModal)}
      {Button_("DELETE ACCOUNT", openDeleteModal)}
      {Button_("Toogle mode", onChangeTheme )}

      <Portal>
        <Modal visible={isProfileModalVisible} onDismiss={closeProfileModal} contentContainerStyle={[containerStyle, { alignSelf: 'center', alignItems: 'center', opacity: 0.8, marginTop: '-35%' }]}>
          {Text_Input("Name", "Doe")}
          {Text_Input("Discord", "Doe#1234")}
          {Text_Input("Email", "Doe@uia.no")}
          {Button_("SAVE", closeProfileModal, '15%')}
        </Modal>
        <Modal visible={isPasswordModalVisible} onDismiss={closePasswordModal} contentContainerStyle={[containerStyle, { alignSelf: 'center', alignItems: 'center', opacity: 0.8, marginTop: '-35%' }]} >
          {Text_Input("Old Password", '', true)}
          {Text_Input("New Password", '', true)}
          {Text_Input("Confirm Password", '', true)}
          {Button_("SAVE", closePasswordModal, '15%')}
        </Modal>
        <Modal visible={isExserviceModalVisible} onDismiss={closeExserviceModal} contentContainerStyle={[containerStyle, { alignSelf: 'center', alignItems: 'center', opacity: 0.8, height: screenHeight * 0.20 }]} >
          {Button_("CONECT DISCORD", closeExserviceModal, '30%')}
        </Modal>
        <Modal visible={isDeleteModalVisible} onDismiss={closeDeleteModal} contentContainerStyle={[containerStyle, { alignSelf: 'center', alignItems: 'center', opacity: 0.8, height: screenHeight * 0.20 }]} >
          {Button_("DELETE ACCOUNT", closeDeleteModal, '30%')}
        </Modal>
      </Portal>
    </View>
  );
};

const TimeEdit = React.memo(( ) => {
  const { background, text, listItem_dark, listItem_light, text2 } = useContext(DarkModeContext);
  const [timeeditData, setTimeeditData] = useState<Array<{ id: string, courseLink: string }>>([]);
  const screenHeight = Dimensions.get("window").height;
  const [isAddModalVisible, setIsAddModalVisible] = React.useState(false);
  const openAddModal = () => setIsAddModalVisible(true);
  const closeAddModal = () => setIsAddModalVisible(false);
  const containerStyle = {
    backgroundColor: background,
    height: screenHeight * 0.45,
    width: "70%", 
    borderRadius: 20 
  };
  const [newLink, setNewLink] = useState('');

  const fetchData = () => {
    fetch('http://chanv2.duckdns.org:5084/api/Timeedit')
      .then(response => response.json())
      .then(data => {
        setTimeeditData(data);
        console.log('data fetched');
      })
      .catch(error => {
        console.error(error);
      });
  };



  //Fetch data when the page is entered then every minute
  React.useEffect(() => {
    fetchData(); // call fetchData() initially when the component is mounted
    const interval = setInterval(() => {
      fetchData(); // call fetchData() every 60 seconds
    }, 60000);

    return () => clearInterval(interval);
  }, []);


  const handleAddNewLink = () => {
    fetch(`http://chanv2.duckdns.org:5084/api/Timeedit?link=${newLink}`, {
      method: 'POST',
    })
      .then(response => response.json())
      .then(data => {
        // Fetch the updated data after adding a new link
        fetchData();
        // Close the modal
        closeAddModal();
        // Clear the input field
        setNewLink('');
      })
      .catch(error => {
        console.error(error.response);
        console.error(error);
      });
  }

  const deleteItem = (index: number) => {
    const item = timeeditData[index];
    const newData = [...timeeditData];
    newData.splice(index, 1);
    setTimeeditData(newData);
    fetch(`http://chanv2.duckdns.org:5084/api/Timeedit?id=${item.id}`, {
      method: 'DELETE'
    })
      .then(response => response.text())
      .then(data => {
        console.log('Item deleted successfully', data);
      })
      .catch(error => {
        console.log(item.id)
        console.error('Error deleting item', error);
      });
  };


  const renderItem = ({ item, index }: { item: { id: string, courseLink: string }, index: number }) => (

    <View style={[index % 2 == 0 ? listItem_dark : listItem_light,{padding: 10}]}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text
        style={{color: text, width:'80%'}}>
            {item.courseLink}
        </Text>
        <TouchableOpacity
          onPress={() => deleteItem(index)}
          style={[index % 2 === 0 ? listItem_light : listItem_dark, {padding: 10}]}>
          <Text style={{color: text}}>
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );


  return (
    <View style={[{backgroundColor: background ,justifyContent: 'center', alignItems: 'center', height: screenHeight*0.70 }]}>
      <FlatList
        data={timeeditData}
        renderItem={renderItem}
        style={{ width: '100%' }}
        keyExtractor={item => item.id}
      />
      {Button_("ADD NEW", openAddModal, '10%')}
      <View style={{ height: '5%' }} />


      <Portal>
        <Modal visible={isAddModalVisible} onDismiss={closeAddModal} contentContainerStyle={[containerStyle, { alignSelf: 'center', alignItems: 'center', opacity: 0.8, marginTop: '-35%', height: screenHeight * 0.30 }]}>
          {Text_Input_CB( "TimeEdit Link", newLink, false, setNewLink)}
          {Button_("Add", handleAddNewLink, '25%')
          }
        </Modal>
      </Portal>
    </View>
  );
});


const Roles = React.memo(() => {
  const { background, text, listItem_dark, listItem_light, text2 } = useContext(DarkModeContext);
  const screenHeight = Dimensions.get("window").height;
  return(
    <View style={[{backgroundColor: background, justifyContent: 'center', alignItems: 'center', height: screenHeight*0.70 }]}>
    </View>
  );
});
const renderTabBar = (props: any) => {
  const { background, text} = useContext(DarkModeContext);
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <TabBar
      {...props}
      indicatorStyle={[{backgroundColor: text}]}
      style={[{backgroundColor: background, paddingTop: '11%' }]}
      labelStyle={[{color: text, fontSize: 18 }]}
      pressColor={{backgroundColor: background}}
    />
  );
};

export default function Tabs({navigation}: StackScreenProps<RootStackParamList, 'SettingScreen'>) {
  const isDarkMode = useColorScheme() === 'dark';
  const { background, text } = useContext(DarkModeContext);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: '1', title: 'Settings' },
    { key: '2', title: 'TimeEdit' },
    { key: '3', title: 'Roles' },
  ]);
  
  const renderScene = ({ route }: { route: { key: string } }) => {
  

    switch (route.key) {
      case '1':
        return <Settings navigation={navigation} />;
      case '2':
        return <TimeEdit/>;
      case '3':
        return <Roles />;
      default:
        return null;
    }
  };
  return (
    <>
    
      <Text style={
        {color: text, backgroundColor: background, fontSize: 24, textAlign: 'center', paddingTop: 80}}
        >
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
