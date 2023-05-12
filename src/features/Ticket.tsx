import { Ticket as TicketProp} from "../types/ticket";
import { TextInput, Button, Text } from "react-native-paper";
import { useState, useContext } from "react";
import Styles from "../styles/styles";
import * as React from "react";
import { View } from "react-native";
import DropDown from "react-native-paper-dropdown";
import { ThemeContext } from '../Components/ThemeContext';
import { useSelector } from "react-redux";
import { AppState } from "../types";
import { Header } from "../Components/CustomComponents"

type Props = {
  ticket?: TicketProp
  onSubmit: (ticket: TicketProp) => Promise<void>
}


const Ticket = ({ onSubmit, ticket }: Props) => {
    const { background, text, buttons, boxes, text2, outline } = useContext(ThemeContext)
    const { user: { nickname }} = useSelector((state: AppState) => state.user)
    const [value, setValue] = React.useState<TicketProp>({ description: "", name: nickname ?? "", room: "", ...ticket });

    const [showDropDown, setShowDropDown] = useState(false);
    const [roomList, setRoomList] = useState([]);

    React.useEffect(()=> {
      setValue((prevValue) => ({ ...prevValue, name: nickname ?? "" }))
    }, [nickname])

    const fetchRooms = async () => {
      await fetch("https://chanv2.duckdns.org:7006/api/Rooms")
        .then(response => response.json())
        .then(rooms => {
          setRoomList(rooms);
        })
        .catch(error => {
          console.error("Failed to get rooms: ", error);
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
      setValue({ description: "", name: nickname ?? "", room: "" });
      
    };

    
    return (
      <View style={[{backgroundColor: background, flex: 1, alignItems: "center" }]}>
        <Header title={ticket ? 'EDIT TICKET':  'NEW TICKET'}/>

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
          label="Name"
          mode={"outlined"}
          value={value.nickname}
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
            dropDownContainerMaxHeight={300}
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
          mode={"outlined"}
          label={"Description"}
          placeholderTextColor={text2}
          value={value.description}
          multiline={true}
          onChangeText={(text) => setValue((prevValue) => ({ ...prevValue, description: text }))}
        />

        <Button
        style={[Styles.buttonStyle,{ backgroundColor: buttons.backgroundColor, margin: "2%" }]}
        labelStyle={[{color: text}]}
          onPress={handleCreateTicket}
        >
         {ticket ? 'SAVE TICKET':  'CREATE TICKET'}
        </Button>
      </View>
    );
  }
;

export default Ticket;