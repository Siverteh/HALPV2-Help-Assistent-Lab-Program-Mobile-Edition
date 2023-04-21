import Styles from "../styles/styles";
import { Button, Text, Modal, Portal, TextInput, List, Checkbox } from "react-native-paper";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Dimensions, FlatList, TouchableOpacity, useColorScheme, View } from 'react-native';
import * as React from 'react';
import DropDown from "react-native-paper-dropdown";
import { useContext, useState } from "react";
import { SearchBar } from 'react-native-elements';
import { isNull } from "lodash";


interface UserProps {
  isAdmin: any;
  courses: string;
  id: string;
  nickname: string;
}
import { RootStackParamList } from "../types";
import { StackScreenProps } from "@react-navigation/stack";
import { DarkModeContext } from '../Components/GlobalHook';



const Text_Input = (lable: string, defaultValue: string = '', password: boolean = false) => {
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

  const [isProfileModalVisible, setIsProfileModalVisible] = React.useState(false);
  const openProfileModal = () => setIsProfileModalVisible(true);
  const closeProfileModal = () => setIsProfileModalVisible(false);
  const [name, setName] = useState('Here1');
  const [email, setEmail] = useState('Here2');
  const [discord, setDiscord] = useState('Here3');
  const [error, setError] = useState('');

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

  const handleChangeProfile = () => {

    //const isEmail = (email: string) =>  (/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(email))
    if (!(email.includes('@') && email.includes('.'))) {
      setError("Invalid Email");
      return;
    }
    setError("");
    const data = {
      id: '1d315a71-71e6-4977-8590-a5e939e7a4b1',
      nickname: name,
      email: email,
      discordTag: discord
    };
    console.log(data);
    fetch('http://chanv2.duckdns.org:5084/api/User', {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          closeProfileModal();
          console.log('ok');
        }
      })
      .catch((error) => {
        console.log('1');
        console.error(error);
      });
  }

  const closeProfileModalError = () => {
    setError('');
    closeProfileModal();
  }


  return (

    <View style={[{backgroundColor: background, justifyContent: 'center', alignItems: 'center', height: screenHeight * 0.70 }]}>
      {Button_( "PROFILE", openProfileModal)}
      {Button_( "PASSWORD", openPasswordModal)}
      {Button_("EXTERNAL-SERVICE", openExserviceModal)}
      {Button_("DELETE ACCOUNT", openDeleteModal)}

      <Portal>
        <Modal visible={isProfileModalVisible} onDismiss={closeProfileModalError} contentContainerStyle={[containerStyle, { alignSelf: 'center', alignItems: 'center', opacity: 0.8 }]}>
          {Text_Input_CB( "Name", 'LogedInName', false, setName)}
          {Text_Input_CB("Discord", 'LogedInDiscord', false, setDiscord)}
          <Text style={{ color: 'red',marginTop:'5%', marginBottom:'-10%' }}>{error}</Text>
          {Text_Input_CB("Email", 'LogedInEmail', false, setEmail)}
          {Button_("SAVE", handleChangeProfile, '15%')}
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
  const { background, text, listItem_dark, listItem_light, text2, boxes } = useContext(DarkModeContext);
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

    <View style={[{backgroundColor: index % 2 == 0 ? boxes.backgroundColor : background, padding: 10}]}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text
        style={{color: text, width:'80%'}}>
            {item.courseLink}
        </Text>
        <TouchableOpacity 
          onPress={() => deleteItem(index)}
          style={[{backgroundColor: index % 2 == 0 ? boxes.backgroundColor : background, padding: 10}]}>
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
  const { background, text, listItem_dark, listItem_light, text2, buttons, boxes } = useContext(DarkModeContext);
  const screenHeight = Dimensions.get("window").height;
  const [showDropDown, setShowDropDown] = useState(false);
  const [courseList, setCourseList] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState<string | null>("admin");
  const [userData, setUserData] = useState<Array<UserProps>>([]);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [searchText, setSearchText] = useState("");


  const fetchCourse = async () => {
    try {
      const response = await fetch("https://chanv2.duckdns.org:7006/api/Courses/all");
      const rooms = await response.json();
      setCourseList(rooms);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://chanv2.duckdns.org:7006/api/User/all");
      const users = await response.json();
      setUserData(users);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchUsers();
    fetchCourse();
  }, []);

  const dropdownItems = [
    { value: "admin", label: "Admin" },
    ...courseList.map((course) => ({ value: course, label: course })),
  ];

  const handleCheckboxChange = (itemId: string, selectedCourse: any) => {
    const item = userData.find((user) => user.id === itemId);
    if (!item) {
      return;
    }
    let tmp = false;
    if (selectedCourse === "admin") {
      tmp = true;
    }
    const endpoint = tmp ? "admin" : "studass";
    const url = `https://chanv2.duckdns.org:7006/api/Roles/${endpoint}`;
    const isChecked = (selectedCourse && item.courses.includes(selectedCourse)) || item.isAdmin;
    const data = {
      userID: itemId,
      course: selectedCourse,
      set: isChecked ? false : !checkedItems[itemId],
    };
  
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          console.log('ok');
          fetchUsers();
          setCheckedItems((prevState) => ({
            ...prevState,
            [itemId]: !prevState[itemId],
          }));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const renderItem = ({ item, index }: { item: UserProps; index: number }) => {
    const isAdmin = item.isAdmin;
  const isChecked =
    (selectedCourse && item.courses.includes(selectedCourse)) || isAdmin;

    return (
      <View
        style={[
          {backgroundColor: index % 2 == 0 ? boxes.backgroundColor : background, padding: 10}
        ]}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={[{color:text, width: "80%", fontSize: 22 }]}>
            {item.nickname}
          </Text>
          <Checkbox
            status={isChecked ? "checked" : "unchecked"}
            onPress={() => handleCheckboxChange(item.id, selectedCourse)}
          />
        </View>
      </View>
    );
  };

  const filteredData = userData.filter((item) =>
    item.nickname.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleChange = (text:string) => setSearchText(text)

 

  return(
    <View style={[{backgroundColor:background, justifyContent: 'center', alignItems: 'center', height: screenHeight*0.70 }]}>
      <View style={{height:'5%', width:'90%', marginTop:'10%'}}>
        <DropDown
          label={"Search by Course + Admin"}
          mode={"outlined"}
          visible={showDropDown}
          showDropDown={() => setShowDropDown(true)}
          onDismiss={() => setShowDropDown(false)}
          value={selectedCourse}
          setValue={setSelectedCourse}
          list={dropdownItems}
          dropDownContainerHeight={300}
          theme={{colors: {onSurface:text, background:buttons.backgroundColor, outline: 'transparent', onSurfaceVariant:text}}}
          dropDownItemStyle={{backgroundColor: buttons.backgroundColor}}
          dropDownItemTextStyle={{color: text}}
          dropDownStyle={{backgroundColor: 'transparent'}}
          dropDownItemSelectedStyle={{backgroundColor: background}}
          dropDownItemSelectedTextStyle={{color: text}}          
        />
      </View>
      <View style={{ height: "5%", width: "93%", marginTop: "10%" }}>
      <SearchBar
        placeholder="Search..."
        onChangeText={handleChange}
        value={searchText}
        placeholderTextColor={text}
        containerStyle={{ 
          backgroundColor: "transparent", 
          borderTopWidth: 0,
          borderBottomWidth: 0, }}
        inputContainerStyle={{
          backgroundColor: buttons.backgroundColor,
          width: '101%'
        }}
        inputStyle={{
          color: text,
          fontSize: 18,
        }}
      />
      </View>
      <View style={{height:'5%', width:'90%', marginTop:'10%'}}/>
      <FlatList 
        data={filteredData}
        renderItem={renderItem}
        style={{width: '90%'}}
        keyExtractor={item => item.id}
      />
        
      
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
