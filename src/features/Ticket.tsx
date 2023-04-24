import { Ticket as TicketProp} from "../types/ticket";
import { TextInput, Button, Text } from "react-native-paper";
import { useState, useContext } from "react";
import Styles from "../styles/styles";
import * as React from "react";
import { Dimensions, Image, TextInputBase, useColorScheme, View } from "react-native";
import DropDown from "react-native-paper-dropdown";
import { ThemeContext } from '../Components/GlobalHook';

type Props = {
  ticket?: TicketProp
  onSubmit: (ticket: TicketProp) => Promise<void>
}


const Ticket = ({ onSubmit, ticket }: Props) => {
    const { background, text, buttons, boxes, text2, outline } = useContext(ThemeContext)
    const [value, setValue] = React.useState<TicketProp>({ description: "", name: "", room: "", ...ticket });

    const [showDropDown, setShowDropDown] = useState(false);
    const [roomList, setRoomList] = useState([]);

    const fetchRooms = async () => {
      await fetch("https://chanv2.duckdns.org:7006/api/Rooms")
        .then(response => response.json())
        .then(rooms => {
          setRoomList(rooms);
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
      onSubmit(value)
      setValue({ description: "", name: "", room: "" });
      
    };


    return (
      <View style={[{backgroundColor: background, flex: 1, alignItems: "center" }]}>
        <Image source={require(".././img/halpy3.png")} style={Styles.logo} />
        <Text style={[{color: 'white',  fontSize: 24, paddingBottom: 0, marginBottom: "7%" }]}>
          {ticket ? 'EDIT TICKET':  'NEW TICKET'}
        </Text>
        <TextInput
          style={[Styles.boxStyle, {backgroundColor: boxes,  color: text, width: "85%", margin: "2%" }]}
          mode={"outlined"}
          label="Name"
          outlineColor={outline.outlineColor}
          textColor={text}
          activeOutlineColor={outline.activeOutlineColor}
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
            theme={{
              colors: { background: boxes, outline: 'transparent', primary: 'red', onSurface: text, onSurfaceVariant: text,
            }}}
            dropDownItemStyle={{backgroundColor: boxes}}
            dropDownItemTextStyle={{color: text}}
            dropDownStyle={{backgroundColor: 'transparent'}}
            dropDownItemSelectedStyle={{backgroundColor: background}}
            dropDownItemSelectedTextStyle={{color: text}}
          />

        </View>
        <TextInput
          style={[Styles.boxStyle, {backgroundColor: boxes, color: text, width: "85%", margin: "2%" }]}
          mode={"outlined"}
          label={"Description"}
          placeholderTextColor={text2}
          textColor={text}
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
