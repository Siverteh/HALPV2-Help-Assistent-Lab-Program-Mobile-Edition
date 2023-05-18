import Styles from "../styles/styles";
import { Button, Text, Modal, Portal, TextInput, Checkbox } from "react-native-paper";
import { TabView, TabBar } from 'react-native-tab-view';
import { FlatList, ScrollView, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import * as React from 'react';
import DropDown from "react-native-paper-dropdown";
import { useContext, useState } from "react";
import { SearchBar } from 'react-native-elements';
import {useSelector} from 'react-redux';


interface UserProps {
  isAdmin: any;
  role: string;
  courses: string;
  id: string;
  nickname: string;
}
import { AppState, RootStackParamList } from "../types";
import { StackScreenProps } from "@react-navigation/stack";
import { ThemeContext } from '../Components/ThemeContext';
import { useDispatch } from "react-redux";
import { actions } from "../reducers/userReducer";
import { Header } from "../Components/CustomComponents";
import { themeHook } from '../hook/themeHook'
import { asyncStorageHook } from "../hook/asyncStorageHook";
import { isValidEmail } from "../utils";

const Text_Input_CB = (lable: string, defaultValue: string = '', password: boolean = false, onChangeText: (text: string) => void) => {
  const { background, text, outline, boxes } = useContext(ThemeContext)

  return (
    <>
      <TextInput
        style={[Styles.textInput, {backgroundColor: boxes,  color: text }]}
        textColor={text}
        outlineColor={outline.activeOutlineColor}
          activeOutlineColor={outline.outlineColor}
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


const Button_ = ( Value: string, onPress: () => void, width: string = '50%') => {
  const { buttons, outline } = useContext(ThemeContext)

  return (
    <>
      <Button
        style={[Styles.buttonStyle, {backgroundColor: buttons.backgroundColor, margin: '2%', width: width, height: 48 }]}
        mode="contained"
        textColor={outline.outlineColor}
        onPress={onPress}>
        {Value}
      </Button>
    </>
  )
}

const Settings = ({navigation}: any ) => {
  const { background, text} = useContext(ThemeContext);
  const { onChangeTheme} = themeHook();
  const { user: {email, nickname, discordTag, id, token }} = useSelector((state: AppState) => state.user)
  const dispatch = useDispatch()

  const [isProfileModalVisible, setIsProfileModalVisible] = React.useState(false);
  const openProfileModal = () => setIsProfileModalVisible(true);
  const closeProfileModal = () => setIsProfileModalVisible(false);
  const [name, setName] = useState(nickname);
  const [newEmail, setNewEmail] = useState<string>(email ?? '');
  const [discord, setDiscord] = useState(discordTag);
  const [error, setError] = useState('');

  // const [isExserviceModalVisible, setIsExserviceModalVisible] = React.useState(false);
  // const openExserviceModal = () => setIsExserviceModalVisible(true);
  // const closeExserviceModal = () => setIsExserviceModalVisible(false);

  const [isDeleteModalVisible, setIsDeleteModalVisible] = React.useState(false);
  const openDeleteModal = () => setIsDeleteModalVisible(true);
  const closeDeleteModal = () => setIsDeleteModalVisible(false);
  const { setItem } = asyncStorageHook()
  const { height } = useWindowDimensions();

  const containerStyle = {backgroundColor: background, height: height * 0.45, width: "70%", borderRadius: 20 };

  const handleLogout = () => {
    setItem('@remember_me_login', 'false')
    setItem('@user_email', '')
    setItem('@user_token', '')
    setItem('@Ticket', '')
    dispatch(actions.setUser({
      id: undefined,
      nickname: undefined,
      discordTag: undefined,
      role: undefined,
      email: undefined,
      token: undefined,
      isLoggedIn: false
  }))
  }
  const handleChangeProfile = () => {

    if (!isValidEmail(newEmail)) {
      setError("Invalid Email");
      return;
    }
    setError("");
    const data = {
      id: id,
      nickname: name,
      email: newEmail,
      discordTag: discord
    };

    fetch('https://chanv2.duckdns.org:7006/api/User', {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          dispatch(actions.setUser({ id: id, nickname: name, discordTag: discord, email: newEmail, token: token, isLoggedIn: true }))
          closeProfileModal();
        }
      })
      .catch((error) => {
        console.error("Failed to update user: ", error);
      });
  }

  const closeProfileModalError = () => {
    setError('');
    setNewEmail(email ?? '');
    setDiscord(discordTag ?? '');
    setName(nickname ?? '');
    closeProfileModal();
  }

  const handleDeleteAccount = () => {
    const data =  {
                    userID: id,
                  };
    fetch('https://chanv2.duckdns.org:7006/api/User', {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          handleLogout();
        }
      })
      .catch((error) => {
        console.error("Failed to delete user: ", error);
      });
  }

  return (
    <ScrollView>
    <View style={[{backgroundColor: background, alignItems: 'center', height: height * 0.70 }]}>
      <View style={[{ margin: "2%"}]}/>
      {Button_( "EDIT PROFILE", openProfileModal)}
      {Button_( "CHANGE PASSWORD", ()=>navigation.navigate('ChangePassword'))}
      {/*Button_("EXTERNAL-SERVICE", openExserviceModal)*/}
      {Button_("DELETE ACCOUNT", openDeleteModal)}
      {Button_("CHANGE THEME", () => onChangeTheme() )}
      {Button_("PRIVACY POLICY", () => navigation.navigate('PrivacyPolicy', { previousScreen: 'SettingScreen' }))}
      {Button_("LOG OUT", handleLogout)}

      <Portal>
        <Modal visible={isProfileModalVisible} onDismiss={closeProfileModalError} contentContainerStyle={[containerStyle, { alignSelf: 'center', alignItems: 'center', opacity: 0.8 }]}>
          {Text_Input_CB( "Name", name, false, setName)}
          {Text_Input_CB("Discord", discord, false, setDiscord)}
          {Text_Input_CB("Email", newEmail, false, setNewEmail)}
          <Text style={{ color: background == '#E0EEF7' ? 'red' : '#f18ba5', fontSize: 20 }}>{error}</Text>
          {Button_("SAVE", handleChangeProfile)}
        </Modal>
        {/* <Modal visible={isExserviceModalVisible} onDismiss={closeExserviceModal} contentContainerStyle={[containerStyle, { alignSelf: 'center', alignItems: 'center', opacity: 0.8, height: screenHeight * 0.20 }]} >
          {Button_("CONECT DISCORD", closeExserviceModal, '30%')}
        </Modal> */}
        <Modal visible={isDeleteModalVisible} onDismiss={closeDeleteModal} contentContainerStyle={[containerStyle, { alignSelf: 'center', alignItems: 'center', opacity: 0.8, height: height * 0.20 }]} >
          <Text style={{ color: text, fontSize: 20, justifyContent: 'center', width: '75%' }}>Are you sure you want to delete your account?</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}} >
            {Button_("YES", handleDeleteAccount, '30%')}
            <View style={{width: '5%'}}/>
            {Button_("NO", closeDeleteModal, '30%')}
          </View>
        </Modal>
      </Portal>
    </View>
    </ScrollView>
  );
};

const TimeEdit = React.memo(( ) => {
  const { background, text, boxes, listItem_dark, listItem_light } = useContext(ThemeContext);
  const [timeeditData, setTimeeditData] = useState<Array<{ id: string, courseLink: string }>>([]);
  const { user: { token }} = useSelector((state: AppState) => state.user)
  const {height} = useWindowDimensions();
  const [isAddModalVisible, setIsAddModalVisible] = React.useState(false);
  const openAddModal = () => setIsAddModalVisible(true);
  const closeAddModal = () => setIsAddModalVisible(false);
  const containerStyle = {
    backgroundColor: background,
    height: height * 0.45,
    width: "70%",
    borderRadius: 20
  };
  const [newLink, setNewLink] = useState('');
  const [error, setError] = useState('');

  const fetchData = () => {
    fetch('https://chanv2.duckdns.org:7006/api/Timeedit', {headers: {Authorization: `Bearer ${token}`}})
      .then(response => response.json())
      .then(data => {
        setTimeeditData(data);
      })
      .catch(error => {
        console.error("Failed to get timeedit links: ", error);
      });
  };



  //Fetch data when the page is entered
  React.useEffect(() => {
    fetchData(); // call fetchData() initially when the component is mounted
  }, []);


  const handleAddNewLink = () => {
    if (!newLink.endsWith('html')) {
      setError('Invalid link, get a valid link from timeedit');
      return;
    }
    setError('');
    fetch(`https://chanv2.duckdns.org:7006/api/Timeedit?link=${newLink}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
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
        console.error("Failed to post timeedit link: ", error);
      });
  }

  const deleteItem = (index: number) => {
    const item = timeeditData[index];
    const newData = [...timeeditData];
    newData.splice(index, 1);
    setTimeeditData(newData);
    fetch(`https://chanv2.duckdns.org:7006/api/Timeedit?id=${item.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.text())
      .then(data => {
        console.log('Item deleted successfully', data);
      })
      .catch(error => {
        console.error("Error deleting item ", error)
      });
  };


  const renderItem = ({ item, index }: { item: { id: string, courseLink: string }, index: number }) => (

    <View style={[{backgroundColor: index % 2 == 0 ? listItem_light.backgroundColor : listItem_dark.backgroundColor, padding: 10}]}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text
        style={{color: text, width:'80%'}}>
            {item.courseLink}
        </Text>
        <TouchableOpacity
          onPress={() => deleteItem(index)}
          style={[{backgroundColor: index % 2 == 0 ? boxes : background, padding: 10}]}>
          <Text style={{color: text}}>
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handelCloseAddModal = () => {
    setError('');
    closeAddModal();
  }

  return (
    <View style={[{backgroundColor: background ,justifyContent: 'center', alignItems: 'center' }]}>
      <FlatList
        data={timeeditData}
        renderItem={renderItem}
        style={{ width: '100%' }}
        keyExtractor={item => item.id}
      />
      {Button_("ADD NEW", openAddModal)}
      <View style={{ height: 60 }} />


      <Portal>
        <Modal visible={isAddModalVisible} onDismiss={handelCloseAddModal} contentContainerStyle={[containerStyle, { alignSelf: 'center', alignItems: 'center', opacity: 0.8, marginTop: '-35%', height: height * 0.30 }]}>
          {Text_Input_CB( "TimeEdit Link", newLink, false, setNewLink)}
          <Text style={{ color: background == '#E0EEF7' ? 'red' : '#f18ba5', fontSize: 14, padding: 0 }}>{error}</Text>
          {Button_("Add", handleAddNewLink)
          }
        </Modal>
      </Portal>
    </View>
  );
});


const Roles = () => {
  const { background, text, buttons, listItem_dark,listItem_light, boxes } = useContext(ThemeContext);
  const { user: { token }} = useSelector((state: AppState) => state.user) 
  const [showDropDown, setShowDropDown] = useState(false);
  const [courseList, setCourseList] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState<string | null>("admin");
  const [userData, setUserData] = useState<Array<UserProps>>([]);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [searchText, setSearchText] = useState("");


  const fetchCourse = async () => {
    try {
      const response = await fetch("https://chanv2.duckdns.org:7006/api/Courses/all", {headers: {Authorization: `Bearer ${token}`}});
      const rooms = await response.json();
      setCourseList(rooms);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://chanv2.duckdns.org:7006/api/User/all", {headers: {Authorization: `Bearer ${token}`}});
      const users = await response.json();
      setUserData(users);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchUsers();
    fetchCourse();
    console.log("fetching data");
  }, [showDropDown, searchText, ]);

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
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          fetchUsers();
          setCheckedItems((prevState) => ({
            ...prevState,
            [itemId]: !prevState[itemId],
          }));
        }
      })
      .catch((error) => {
        console.error("Failed to update roles: ", error);
      });
  };

  const renderItem = ({ item, index }: { item: UserProps; index: number }) => {
    const isAdmin = item.isAdmin;
    if (isAdmin){
      item.role = 'Admin'
    } else if (item.courses.length > 0){
      item.role = 'Student Assistant'
    } else {
        item.role = 'User'
    }

  const isChecked =
    (selectedCourse && item.courses.includes(selectedCourse)) || isAdmin;

    return (
      <View
        style={[{backgroundColor: index % 2 == 0 ? listItem_light.backgroundColor : listItem_dark.backgroundColor, padding: 10}]}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{width: '80%'}}>
            <Text style={[{color:text, width: "80%", fontSize: 22 }]}>
              {item.nickname}
            </Text>
            <Text style={[{color:text, width: "80%", fontSize: 12 }]}>
              {userData[index].role}
            </Text>
          </View>
          <Checkbox
            status={isChecked ? "checked" : "unchecked"}
            onPress={() => handleCheckboxChange(item.id, selectedCourse)}
            color={text}
            uncheckedColor={text}
          />
        </View>
      </View>
    );
  };

  const filteredData = userData.filter((item) =>
    item.nickname.toLowerCase().includes(searchText.toLowerCase())
  );
  
  return(
    <>
    <View style={{ justifyContent : "center", marginLeft: '2%', width: '93%' }}>
        <DropDown
          label={"Search by Course + Admin"}
          mode={"outlined"}
          visible={showDropDown}
          showDropDown={() => setShowDropDown(true)}
          onDismiss={() => setShowDropDown(false)}
          value={selectedCourse}
          setValue={setSelectedCourse}
          list={dropdownItems}
          dropDownContainerMaxHeight={300}
          theme={{colors: {onSurface:text, background:boxes, outline: 'transparent', onSurfaceVariant:text}}}
          dropDownItemStyle={{backgroundColor: boxes}}
          dropDownItemTextStyle={{color: text}}
          dropDownStyle={{backgroundColor: 'transparent'}}
          dropDownItemSelectedStyle={{backgroundColor: background}}
          dropDownItemSelectedTextStyle={{color: text}}  
          inputProps={{
            style: {
              ...Styles.textInput,
              width: '100%'
            }}
          }       
        />
         </View>
      <SearchBar
        placeholder="Search"
        onChangeText={setSearchText}
        value={searchText}
        placeholderTextColor={text}
        containerStyle={{
          backgroundColor: "transparent",
          borderTopWidth: 0,
          borderBottomWidth: 0, }}
        inputContainerStyle={{
          backgroundColor: boxes,
          margin: 5
        }}
        inputStyle={{
          color: text,
          fontSize: 18,
        }}
      />
      <FlatList 
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </>
  );
};
const renderTabBar = (props: any) => {
  const { background, text} = useContext(ThemeContext);

  return (
    <TabBar
      {...props}
      indicatorStyle={[{backgroundColor: text}]}
      style={[{backgroundColor: background }]}
      labelStyle={[{color: text, fontSize: 18 }]}
      pressColor={{backgroundColor: background}}
    />
  );
};

export default function Tabs({navigation}: StackScreenProps<RootStackParamList, 'SettingScreen'>) {
  const { background } = useContext(ThemeContext);
  const { user: { role }} = useSelector((state: AppState) => state.user)

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
  if(role === 'Admin')
  {
    return (
      <View style={[{backgroundColor: background, height: '100%' }]}>
        <Header title= {routes[index].title}/>

          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar={renderTabBar}
            />
      </View>
    );
  } else {
    return (
      <View style={[{backgroundColor: background, height: '100%' }]}>
        <Header title= {routes[0].title}/>
        <View style={{height: '5%', width: '100%', backgroundColor: background}}/>
        <Settings navigation={navigation} />
      </View>
    );    
  }
}
