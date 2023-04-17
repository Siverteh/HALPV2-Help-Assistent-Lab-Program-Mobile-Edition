import { Ticket } from "../types/ticket";
import { TextInput, Button, Text, List } from "react-native-paper";
import { useState } from "react";
import isEmpty from "lodash/isEmpty";
import v from "lodash/values";
import every from "lodash/every";
import Styles from "../styles/styles";
import * as React from "react";
import { Dimensions, Image, useColorScheme, View } from "react-native";
import CustomDropDown from "../Components/CustomComponents";
import DropDown from "react-native-paper-dropdown";


const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

type Props = {
  ticket?: Ticket
  onSubmit: (ticket: Ticket) => void
}


const Ticket = ({ onSubmit, ticket }: Props) => {
    const [value, setValue] = React.useState<Ticket>({ description: "", name: "", room: "", ...ticket });

    const isValidValue = value && v(value).every(isEmpty);
    const isDarkMode = false;
    const stylePrefix = isDarkMode ? "dm" : "lm";

    const [showDropDown, setShowDropDown] = useState(false);
    const [showMultiSelectDropDown, setShowMultiSelectDropDown] = useState(false);
    const [roomList, setRoomList] = useState([]);

    const fetchRooms = async () => {
      await fetch("https://chanv2.duckdns.org:7006/api/Rooms")
        .then(response => response.json())
        .then(rooms => {
          setRoomList(rooms);
          console.log(rooms);
        })
        .catch(error => {
          console.error(error);
        });
    };

    React.useEffect(() => {
      fetchRooms();
    }, []);

    const dropdownItems = roomList.map((room) => {
      return { value: room, label: room };
    });

    const handleCreateTicket = async () => {
      console.log(JSON.stringify(value));
      try {
        const response = await fetch("https://chanv2.duckdns.org:7006/api/Ticket", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Cache-Control": "no-cache"
          },
          body: JSON.stringify(value)
        });
        if (response.ok) {
          setValue({ description: "", name: "", room: "" });
          if (response.headers.get("Content-Length") !== "0") {
            const responseData = await response.json();
            onSubmit(responseData || { name: "", description: "", room: "" });
          }
        } else {
          console.error(`Error: ${response.status} - ${response.statusText}`);
        }
      } catch (error) {
        console.error(error);
      }
    };


    return (
      <View style={[Styles[`${stylePrefix}_background`], { flex: 1, alignItems: "center" }]}>
        <Image source={require(".././img/halpy3.png")} style={Styles.logo} />
        <Text style={[Styles[`${stylePrefix}_text`], { fontSize: 24, paddingBottom: 0, marginBottom: "7%" }]}>
          NEW TICKET
        </Text>
        <TextInput
          style={{ ...Styles[`${stylePrefix}_text`], ...Styles[`${stylePrefix}_boxes`], width: "85%", margin: "2%" }}
          mode={"outlined"}
          label="Name"
          outlineColor={"transparent"}
          activeOutlineColor={"grey"}
          value={value.name}
          onChangeText={(text) => setValue((prevValue) => ({ ...prevValue, name: text }))}
        />
        <View
          style={{
            width: "85%"
          }}
        >
          <DropDown
            label={"Room"}
            mode={"outlined"}
            visible={showDropDown}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
            value={value.room}
            setValue={(selectedRoom) => setValue((prevValue) => ({ ...prevValue, room: selectedRoom }))}
            list={dropdownItems}
            activeColor={"grey"}
            dropDownContainerHeight={300}
            theme={{colors: { background: isDarkMode ? "#0070C0" : "#FFFFFF", text: isDarkMode ? 'white' : 'black', outline: 'transparent', onPrimary: 'red'}}}
            dropDownItemStyle={{backgroundColor: isDarkMode ? "#0070C0" : "#94CCFF"}}
            dropDownItemTextStyle={{color: isDarkMode ? 'white' : 'black'}}
            dropDownStyle={{backgroundColor: 'transparent'}}
            dropDownItemSelectedStyle={{backgroundColor: isDarkMode ? "#0070C0" : "#94CCFF"}}
            dropDownItemSelectedTextStyle={{color: isDarkMode ? 'white' : 'black'}}
          />

        </View>
        <TextInput
          style={{ ...Styles[`${stylePrefix}_text`], ...Styles[`${stylePrefix}_boxes`], width: "85%", margin: "2%" }}
          mode={"outlined"}
          label={"Description"}
          outlineColor={"transparent"}
          activeOutlineColor={"grey"}
          value={value.description}
          multiline={true}
          onChangeText={(text) => setValue((prevValue) => ({ ...prevValue, description: text }))}
        />

        <Button
          style={{ ...Styles[`${stylePrefix}_button`], width: 230, height: 50, margin: "2%" }}
          labelStyle={Styles[`${stylePrefix}_textButton`]}
          onPress={handleCreateTicket}
        >
          CREATE TICKET
        </Button>
      </View>
    );
  }
;

export default Ticket;
