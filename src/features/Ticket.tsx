import { Ticket as TicketProp } from "../types/ticket";
import { TextInput, Button, Text } from "react-native-paper";
import { useState, useContext } from "react";
import Styles from "../styles/styles";
import * as React from "react";
import { View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { ThemeContext } from "../Components/ThemeContext";
import { useSelector } from "react-redux";
import { AppState } from "../types";
import { Header } from "../Components/CustomComponents";
import { isEmpty } from "lodash";

type Props = {
  ticket?: TicketProp
  onSubmit: (ticket: TicketProp) => Promise<void>
}


const Ticket = ({ onSubmit, ticket }: Props) => {
    const [validation, setValidation] = useState(false);
    const { user: { nickname, isLoggedIn } } = useSelector((state: AppState) => state.user);
    const { background, text, boxes, outline } = useContext(ThemeContext);

    const [value, setValue] = React.useState<Omit<TicketProp, "room">>({
      description: ticket ? ticket.description : "",
      nickname: ticket ? ticket.nickname : "",
      ...ticket
    });
    const [room, setRoom] = useState(ticket ? ticket.room : null);
    const [open, setOpen] = useState(false);

    const [roomList, setRoomList] = useState<string[]>([])

    React.useEffect(()=> {
      setValue((prevValue) => ({ ...prevValue, name: nickname ?? "" }))
    }, [nickname])

    React.useEffect(() => {
      if (isLoggedIn && !ticket) {
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
          console.error("Failed to get rooms: ", error);
        });
    };

    React.useEffect(() => {
      fetchRooms();
    }, []);

    const dropdownItems = roomList.map((room) => {
      return { value: room, label: room };
    });


    const handleRoomChange = (room: string | null) => {
      setRoom(room);
      setValidation(false);
    };

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

      try {
        const response = await fetch("https://chanv2.duckdns.org:7006/api/Ticket", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Cache-Control": "no-cache"
          },
          body: JSON.stringify(ticketData)
        });
        if (response.ok) {
          if (isLoggedIn) {
            setValue({ description: "", nickname: nickname ?? "" });
            setRoom(null);
            setValidation(false);
          } else {
            setValue({ description: "", nickname: "" });
            setRoom(null);
            setValidation(false);
          }

          if (response.headers.get("Content-Length") !== "0") {
            const responseData = await response.json();
            await onSubmit(responseData || { nickname: "", description: "" });
          }
        } else {
          console.error(`Error: ${response.status} - ${response.statusText}`);
        }
      } catch (error) {
        console.error(error);
      }
    };


    return (
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
            setValue={setRoom}
            items={dropdownItems}
            open={open}
            setOpen={setOpen}
            modalAnimationType={"slide"}
            style={{
              backgroundColor: boxes,
              borderColor: outline.outlineColor,
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
              borderColor: outline.outlineColor
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
          mode={"outlined"}
          value={value.description}
          onChangeText={handleChange("description")}
          textAlignVertical="center"
        />
        {validation && (

          <Text style={{ color: background == "#E0EEF7" ? "red" : "#f18ba5", fontSize: 20 }}>You need to fill all
            fields!</Text>

        )
        }

        <Button
          style={[Styles.buttonStyle, { backgroundColor: boxes, margin: "2%", height: 48 }]}
          labelStyle={[{ color: text }]}
          onPress={handleCreateTicket}
        >
          {ticket ? "SAVE TICKET" : "CREATE TICKET"}
        </Button>
      </View>
    );
  }
;

export default Ticket;
