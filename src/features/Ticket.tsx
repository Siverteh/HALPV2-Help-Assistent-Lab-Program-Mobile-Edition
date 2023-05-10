import { Ticket as TicketProp } from "../types/ticket";
import { TextInput, Button, Text, List } from "react-native-paper";
import { useContext, useState } from "react";
import isEmpty from "lodash/isEmpty";
import v from "lodash/values";
import Styles from "../styles/styles";
import * as React from "react";
import {
  Image,
  View
} from "react-native";
import { ThemeContext } from "../Components/GlobalHook";
import DropDownPicker from "react-native-dropdown-picker";
import { sleep } from "react-hook-form/dist/utils/sleep";

type Props = {
  ticket?: TicketProp
  onSubmit: (ticket: TicketProp) => void
}


const Ticket = ({ onSubmit, ticket }: Props) => {
    const { background, text, boxes, outline } = useContext(ThemeContext);
    const [open, setOpen] = useState(false);


    const [value, setValue] = React.useState<Omit<TicketProp, "room">>({ description: "", name: "", ...ticket });
    const [validation, setValidation] = React.useState({ description: false, name: false, room: false });
    const [room, setRoom] = useState(null);

    const [roomList, setRoomList] = useState(["GRM F 202"]);

    const fetchRooms = async () => {
      await fetch("https://chanv2.duckdns.org:7006/api/Rooms")
        .then(response => response.json())
        .then(rooms => {
          //setRoomList(rooms);
          console.log(rooms);
        })
        .catch(error => {
          console.error(error);
        });
    };

    React.useEffect(() => {
      setValidation({ description: false, name: false, room: false });
    }, []);


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
          setValue({ description: "", name: "" });
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
      setValue({ description: "", name: "" });
      setRoom(null);
    };


    return (
      <View style={{ backgroundColor: background, flex: 1, alignItems: "center" }}>
        <Image source={require(".././img/halpy3.png")} style={Styles.logo} />
        <Text style={{ color: text, fontSize: 24, paddingBottom: 0, marginBottom: "7%" }}>
          {ticket ? "EDIT TICKET" : "NEW TICKET"}
        </Text>
        <TextInput
          style={[{ backgroundColor: boxes, width: "85%", margin: "3%", zIndex: 1 }]}
          textColor={text}
          theme={{
            colors: { background: background, onSurfaceVariant: outline.outlineColor }
          }}
          mode={"outlined"}
          label="Name"
          outlineColor={outline.outlineColor}
          activeOutlineColor={outline.outlineColor}
          value={value.name}
          onChangeText={handleChange("name")}
          onBlur={() => handleBlur("name", value?.name)}
          error={validation?.name}
        />
        <View
          style={{
            zIndex: 2,
            width: "85%"
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
          style={[{ backgroundColor: boxes, width: "85%", margin: "2%" }]}
          textColor={text}
          theme={{
            colors: { background: background, onSurfaceVariant: outline.outlineColor }
          }}
          mode={"outlined"}
          label="Description"
          outlineColor={outline.outlineColor}
          activeOutlineColor={outline.outlineColor}
          value={value.description}
          onChangeText={handleChange("description")}
          onBlur={() => handleBlur("description", value?.description)}
          error={validation?.description}
        />

        <Button
          style={[Styles.buttonStyle, { backgroundColor: boxes, width: 230, height: 50, margin: "2%" }]}
          labelStyle={[Styles.textStyle, { color: text }]}
          onPress={handleCreateTicket}
        >
          {ticket ? "SAVE TICKET" : "CREATE TICKET"}
        </Button>
      </View>
    );
  }
;

export default Ticket;
