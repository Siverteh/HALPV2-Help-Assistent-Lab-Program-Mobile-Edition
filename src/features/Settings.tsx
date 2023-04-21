import Styles from "../styles/styles";
import { Button, Text, Modal, Portal, TextInput, List, Checkbox } from "react-native-paper";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Dimensions, FlatList, TouchableOpacity, useColorScheme, View} from 'react-native';
import * as React from 'react';
import DropDown from "react-native-paper-dropdown";
import { useState } from "react";
import { SearchBar } from 'react-native-elements';
import { isNull } from "lodash";


interface UserProps {
  isAdmin: any;
  courses: string;
  id: string;
  nickname: string;
}

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
const Text_Input_CB = ({isDarkMode}: {isDarkMode: boolean}, lable:string, defaultValue:string = '', password:boolean = false, onChangeText:(text: string) => void) => {
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
              secureTextEntry={password}
              onChangeText={onChangeText}>
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


const Settings = React.memo(() => {

  const isDarkMode = true;

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
});

const TimeEdit = React.memo(({isDarkMode}: {isDarkMode: boolean}) => {
  const [timeeditData, setTimeeditData] = useState<Array<{id: string, courseLink: string }>>([]);
  const screenHeight = Dimensions.get("window").height;
  const [isAddModalVisible, setIsAddModalVisible] = React.useState(false);
  const openAddModal = () => setIsAddModalVisible(true);
  const closeAddModal = () => setIsAddModalVisible(false);
  const containerStyle = [isDarkMode ? Styles.dm_background : Styles.lm_background, {height: screenHeight*0.45, width: "70%", borderRadius: 20}];
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
    <View style={[isDarkMode ? 
      {backgroundColor: index % 2 == 0 ? '#0070C0' : '#004082'}:
      {backgroundColor: index % 2 == 0 ? '#FFFFFF' : '#94CCFF'},
      {padding: 10}]}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text
        style={[isDarkMode ? 
          {color: index % 2 == 0 ? '#FFFFFF' : '#E0E0E0'}:
          {color: index % 2 == 0 ? '#686464' : '#201C24'},
          {width:'80%'}]}>
            {item.courseLink}
        </Text>
        <TouchableOpacity 
          onPress={() => deleteItem(index)}
          style={[isDarkMode ? 
            {backgroundColor: index % 2 == 0 ? '#004082' : '#0070C0' }:
            {backgroundColor: index % 2 == 0 ? '#94CCFF' : '#FFFFFF'},
            , {padding: 10}]}>
          <Text style={[isDarkMode ? 
          {color: index % 2 == 0 ? '#E0E0E0' : '#FFFFFF'}:
          {color: index % 2 == 0 ? '#201C24' : '#686464'}
          ]}>
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );


  return (
    <View style={[isDarkMode ? Styles.dm_background: Styles.lm_background, {justifyContent: 'center', alignItems: 'center', height: screenHeight*0.70 }]}>
      <FlatList 
        data={timeeditData}
        renderItem={renderItem}
        style={{width: '100%'}}
        keyExtractor={item => item.id}
      />
      {Button_({isDarkMode}, "ADD NEW", openAddModal, '10%')}
      <View style={{height:'5%'}}/>

      
      <Portal>
        <Modal visible={isAddModalVisible} onDismiss={closeAddModal} contentContainerStyle={[containerStyle, {alignSelf: 'center', alignItems: 'center', opacity: 0.8, marginTop:'-35%', height: screenHeight*0.30}]}>
          {Text_Input_CB({isDarkMode}, "TimeEdit Link", newLink, false, setNewLink)}
          {Button_({isDarkMode}, "Add", handleAddNewLink, '25%')
          }
        </Modal>
      </Portal>
    </View>
  );
});


const Roles = React.memo(({isDarkMode}: {isDarkMode: boolean}) => {
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

  const handleCheckboxChange = (itemId: string, selectedCourse: string) => {
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
          isDarkMode
            ? { backgroundColor: index % 2 == 0 ? "#0070C0" : "#004082" }
            : { backgroundColor: index % 2 == 0 ? "#FFFFFF" : "#94CCFF" },
          { padding: 10 },
        ]}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={[
              isDarkMode
                ? { color: index % 2 == 0 ? "#FFFFFF" : "#E0E0E0" }
                : { color: index % 2 == 0 ? "#686464" : "#201C24" },
              { width: "80%", fontSize: 22 },
            ]}
          >
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
    <View style={[isDarkMode ? Styles.dm_background: Styles.lm_background, {justifyContent: 'center', alignItems: 'center', height: screenHeight*0.70 }]}>
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
          theme={{colors: { background: isDarkMode ? "#0070C0" : "#94CCFF", text: isDarkMode ? 'white' : 'black', outline: 'transparent', onPrimary: 'red'}}}
          dropDownItemStyle={{backgroundColor: isDarkMode ? "#0070C0" : "#94CCFF"}}
          dropDownItemTextStyle={{color: isDarkMode ? 'white' : 'black'}}
          dropDownStyle={{backgroundColor: 'transparent'}}
          dropDownItemSelectedStyle={{backgroundColor: isDarkMode ? "#004082" : "#FFFFFF"}}
          dropDownItemSelectedTextStyle={{color: isDarkMode ? 'white' : 'black'}}          
        />
      </View>
      <View style={{ height: "5%", width: "93%", marginTop: "10%" }}>
      <SearchBar
        placeholder="Search..."
        onChangeText={handleChange}
        value={searchText}
        containerStyle={{ 
          backgroundColor: "transparent", 
          borderTopWidth: 0,
          borderBottomWidth: 0, }}
        inputContainerStyle={{
          backgroundColor: isDarkMode ? "#0070C0" : "#94CCFF",
          width: '101%'
        }}
        inputStyle={{
          color: isDarkMode ? "white" : "#000000",
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

  const renderScene = ({ route }: { route: { key: string } }) => {
    switch (route.key) {
      case '1':
        return <Settings/>;
      case '2':
        return <TimeEdit isDarkMode={isDarkMode} />;
      case '3':
        return <Roles isDarkMode={isDarkMode} />;
      default:
        return null;
    }
  };
  return (
    <>
      <Text style={[isDarkMode ? 
        {...Styles.dm_text, ...Styles.dm_background}: 
        {...Styles.lm_text, ...Styles.lm_background}, 
        {fontSize: 24, textAlign: 'center', paddingTop: 80}]}
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
