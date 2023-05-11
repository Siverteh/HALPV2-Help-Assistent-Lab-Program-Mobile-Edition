import { Ticket as TicketProp} from "../types/ticket";
import { TextInput, Button, Text } from "react-native-paper";
import { useState, useContext } from "react";
import Styles from "../styles/styles";
import * as React from "react";
import { View } from "react-native";
import DropDown from "react-native-paper-dropdown";
import DropDownPicker from "react-native-dropdown-picker";
import { ThemeContext } from '../Components/ThemeContext';
import { useSelector } from "react-redux";
import { AppState } from "../types";
import { Header } from "../Components/CustomComponents"
import { isEmpty } from "lodash";

type Props = {
  ticket?: TicketProp
  onSubmit: (ticket: TicketProp) => Promise<void>
}


const Ticket = ({ onSubmit, ticket }: Props) => {
    const { background, text, buttons, boxes, text2, outline } = useContext(ThemeContext)
   

    const [value, setValue] = React.useState<Omit<TicketProp, "room">>({ description: "", nickname: "", ...ticket });
    const [validation, setValidation] = React.useState({ description: false, name: false, room: false });
    const [room, setRoom] = useState(null);
    const [open, setOpen] = useState(false);

    const [roomList, setRoomList] = useState(["GRM F 202"]);

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

    const handleBlur = (name: string, text: string) => {
      if (isEmpty(text)) {
        setValidation((prevState) => {
          return { ...prevState, [name]: true } as any;
        });
      }
    };

    const handleRoomChange = (room: React.SetStateAction<null>) => {
      setRoom(room);
      if (room) {
        setValidation((prevState) => {
          return { ...prevState, room: false } as any;
        });
      } else {
        setValidation((prevState) => {
          return { ...prevState, room: true } as any;
        });
      }
    };
    const handleDropdownClose = () => {
      if (room == null) {
        setValidation((prevState) => {
          return { ...prevState, room: false } as any;
        });
      } else {
        setValidation((prevState) => {
          return { ...prevState, room: true } as any;
        });
      }
    };

    const handleDropdownOpen = async () => {
      setValidation((prevState) => {
        return { ...prevState, room: false } as any;
      });
    };

    const handleChange = (name: string) => (text: string) => {
      setValue((prevValue) => ({ ...prevValue, [name]: text }));
      if (!isEmpty(text)) {
        setValidation(prevState => {
          return { ...prevState, [name]: false };
        });
      }

    };

    const handleCreateTicket = async () => {
      if (validation.name || validation.description || validation.room) {
        return;
      }

      // Add the selected room to the ticket data
      const ticketData = { ...value, room };

      console.log(JSON.stringify(ticketData));
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
          setValue({ description: "", nickname: "" });
          if (response.headers.get("Content-Length") !== "0") {
            const responseData = await response.json();
            onSubmit(responseData || { name: "", description: "" });
          }
        } else {
          console.error(`Error: ${response.status} - ${response.statusText}`);
        }
      } catch (error) {
        console.error(error);
      }
      setValue({ description: "", nickname: "" });
      setRoom(null);
    };

    
    return (
      <View style={[{backgroundColor: background, flex: 1, alignItems: "center" }]}>
        <Header title={ticket ? 'EDIT TICKET':  'NEW TICKET'}/>

        <TextInput
          style={[Styles.textInput, {backgroundColor: boxes,  color: text }]}
          textColor={text}
          theme={{
            colors: {
              background: background,
              onSurfaceVariant: outline.outlineColor
            }
          }}
          label="Name"
          mode={"outlined"}        
          outlineColor={outline.outlineColor}
          activeOutlineColor={outline.outlineColor}
          value={value.nickname}
          onChangeText={handleChange("name")}
          onBlur={() => handleBlur("name", value?.nickname)}
          error={validation?.name}
        />
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
            setValue={handleRoomChange}
            items={dropdownItems}
            open={open}
            setOpen={setOpen}
            modalAnimationType={"slide"}
            style={{
              backgroundColor: boxes,
              borderColor: validation.room ? "red" : outline.outlineColor,
              borderRadius: 4
            }}
            textStyle={{
              color: validation.room ? "red" : text
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
            onChangeSearchText={() => setRoom}
            onPress={handleDropdownOpen}
            onClose={handleDropdownClose}
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
        style={[Styles.buttonStyle,{ backgroundColor: boxes, margin: "2%" }]}
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