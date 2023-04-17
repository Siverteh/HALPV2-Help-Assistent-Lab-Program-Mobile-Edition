import { Ticket as TicketProp} from "../types/ticket";
import { TextInput, Button, Text, List } from "react-native-paper";
import { useState, useContext } from "react";
import isEmpty from "lodash/isEmpty";
import v from "lodash/values";
import Styles from "../styles/styles";
import * as React from "react";
import { Dimensions, Image, useColorScheme, View } from "react-native";
import CustomDropDown from "../Components/CustomComponents";
import DropDown from "react-native-paper-dropdown";
import { DarkModeContext } from '../Components/GlobalHook';



const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

type Props = {
  ticket?: TicketProp
  onSubmit: (ticket: TicketProp) => void
}


const Ticket = ({ onSubmit, ticket }: Props) => {
    const { background, text, buttons, boxes, text2 } = useContext(DarkModeContext)
    const [value, setValue] = React.useState<TicketProp>({ description: "", name: "", room: "", ...ticket });

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
      onSubmit({ name: "", description: "", room: "" }) //bare for test
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
      <View style={[{backgroundColor: background, flex: 1, alignItems: "center" }]}>
        <Image source={require(".././img/halpy3.png")} style={Styles.logo} />
        <Text style={[{color: text,  fontSize: 24, paddingBottom: 0, marginBottom: "7%" }]}>
          {ticket ? 'EDIT TICKET':  'NEW TICKET'}
        </Text>
        <TextInput
          style={[Styles.boxStyle, {color: text, width: "85%", margin: "2%" }]}
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
            setValue={(selectedRoom: any) => setValue((prevValue) => ({ ...prevValue, room: selectedRoom }))}
            list={dropdownItems}
            activeColor={"grey"}
            dropDownContainerHeight={300}
            theme={{colors: { background: text, text: text, outline: 'transparent', onPrimary: 'red'}}}
            dropDownItemStyle={{backgroundColor: buttons.backgroundColor}}
            dropDownItemTextStyle={{color: text}}
            dropDownStyle={{backgroundColor: 'transparent'}}
            dropDownItemSelectedStyle={{backgroundColor: buttons.backgroundColor}}
            dropDownItemSelectedTextStyle={{color: text}}
          />

        </View>
        <TextInput
          style={[Styles.boxStyle, {color: text, width: "85%", margin: "2%" }]}
          mode={"outlined"}
          label={"Description"}
          outlineColor={"transparent"}
          activeOutlineColor={"grey"}
          value={value.description}
          multiline={true}
          onChangeText={(text) => setValue((prevValue) => ({ ...prevValue, description: text }))}
        />

        <Button
        style={[Styles.buttonStyle,{backgroundColor: buttons.backgroundColor, width: 230, height: 50, margin: "2%" }]}
        labelStyle={[Styles.buttonStyle, {color: text}]}
          onPress={handleCreateTicket}
        >
         {ticket ? 'SAVE TICKET':  'CREATE TICKET'}
        </Button>
      </View>
    );
  }
;

export default Ticket;
