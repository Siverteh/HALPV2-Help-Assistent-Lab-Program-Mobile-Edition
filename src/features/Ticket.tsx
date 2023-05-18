import { Ticket as TicketProp } from "../types/ticket";
import { TextInput, Button, Text } from "react-native-paper";
import { useState, useContext } from "react";
import Styles from "../styles/styles";
import * as React from "react";
import { ScrollView, View, useWindowDimensions } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { ThemeContext } from "../Components/ThemeContext";
import { useSelector } from "react-redux";
import { AppState } from "../types";
import { Header } from "../Components/CustomComponents";
import { isEmpty } from "lodash";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

type Props = {
  ticket?: TicketProp
  onSubmit: (ticket: TicketProp) => Promise<void>
}


const Ticket = ({ onSubmit, ticket }: Props) => {
  const [validation, setValidation] = useState(false);
  const { user: { nickname, isLoggedIn } } = useSelector((state: AppState) => state.user);
  const { background, text, buttons, boxes, outline } = useContext(ThemeContext);
  const { height } = useWindowDimensions();
  const tabBarHeight = useBottomTabBarHeight();
  const viewHeight = height - tabBarHeight;


  const [value, setValue] = React.useState<Omit<TicketProp, "room">>({
    description: ticket ? ticket.description : "",
    nickname: ticket ? ticket.nickname : "",
    ...ticket
  });
  const [room, setRoom] = useState(ticket ? ticket.room : null);
  const [open, setOpen] = useState(false);

  const [roomList, setRoomList] = useState<string[]>([]);

  React.useEffect(() => {
    if (!ticket){
      setValue((prevValue) => ({ ...prevValue, nickname: nickname ?? "" }));
    }
  }, [nickname]);

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


  const handleChange = (nickname: string) => (text: string) => {
    setValue((prevValue) => ({ ...prevValue, [nickname]: text }));
    setValidation(false);
  };

  const handleCreateTicket = async () => {
    if (isEmpty(value.description) || isEmpty(value.nickname) || isEmpty(room)) {
      setValidation(true);
      return;
    }

    // Add the selected room to the ticket data
    const ticketData = { ...value, room };


    if (isLoggedIn) {
      setValue({ description: "", nickname: nickname ?? "" });
      setRoom(null);
      setValidation(false);
    } else {
      setValue({ description: "", nickname: "" });
      setRoom(null);
      setValidation(false);
    }
    
    await onSubmit(ticketData);
  };


  return (
    <ScrollView>
    <View style={{
        backgroundColor: background,
        height: viewHeight,
        justifyContent: "center"
      }}>
    <View style={[{ backgroundColor: background, flex: 1, alignItems: "center" }]}>
      <Header title={ticket ? "EDIT TICKET" : "NEW TICKET"} />

      {!isLoggedIn &&
        <TextInput
          style={[Styles.textInput, { backgroundColor: boxes, color: text }]}
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
          onChangeText={handleChange("nickname")}
        />
      }
      <View
        style={{
          zIndex: 2,
          width: "85%",
          marginTop: "1.5%"
        }}>
        <DropDownPicker
          closeAfterSelecting={true}
          listMode="SCROLLVIEW"
          placeholder={"Room"}
          value={room}
          onPress={()=>fetchRooms()}
          setValue={setRoom}
          items={dropdownItems}
          open={open}
          setOpen={setOpen}
          modalAnimationType={"slide"}
          style={{
            backgroundColor: boxes,
            borderColor: outline.activeOutlineColor,
            borderRadius: 4
          }}
          textStyle={{
            color: text
          }}
          scrollViewProps={{
            nestedScrollEnabled: true
          }}
          dropDownContainerStyle={{
            position: "relative",
            top: 0,
            backgroundColor: boxes,
            borderColor: outline.activeOutlineColor
          }}

        />

      </View>
      <TextInput
        style={[Styles.textInput, { backgroundColor: boxes, color: text, minHeight: 48 }]}
        textColor={text}
        outlineColor={outline.activeOutlineColor}
        activeOutlineColor={outline.outlineColor}
        theme={{
          colors: {
            background: background,
            onSurfaceVariant: outline.outlineColor
          }
        }}
        label="Description"
        multiline={true}
        maxLength={500}
        mode={"outlined"}
        value={value.description}
        onChangeText={handleChange("description")}
        textAlignVertical="center"
      />
      {validation && (

        <Text style={{ color: background == "#E0EEF7" ? "red" : "#f18ba5", fontSize: 20 }}>You need to fill all
          fields!</Text>
      )}
      <Button
        style={[Styles.buttonStyle, { backgroundColor: buttons.backgroundColor, margin: "2%", height: 48 }]}
        labelStyle={[{ color: text }]}
        onPress={handleCreateTicket}
      >
        {ticket ? "SAVE TICKET" : "CREATE TICKET"}
      </Button>
    </View>
    </View>
    </ScrollView>
  );
};

export default Ticket;
