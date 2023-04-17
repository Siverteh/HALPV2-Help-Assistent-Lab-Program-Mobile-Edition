import { Ticket } from "../types/ticket";
import { TextInput, Button, Text } from "react-native-paper";
import { useState, useContext } from "react";
import isEmpty from "lodash/isEmpty";
import v from "lodash/values";
import Styles from "../styles/styles";
import * as React from "react";
import { Dimensions, Image, useColorScheme, View } from "react-native";
import { DarkModeContext } from "../Components/GlobalHook";





const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

type Props = {
  room: Array<string> // can also be a hook
  ticket?: Ticket
  onSubmit: (ticket: Ticket) => {}
}

const createTicket = ({ onSubmit, ticket, room }: Props) => {
  const [value, setValue] = React.useState<Ticket>({ description: "", name: "", room: "", ...ticket });

  const isValidValue = value && v(value).every(isEmpty);


  const handleCreateTicket = async () => {
    console.log(JSON.stringify(value));
    try {
      const response = await fetch("http://chanv2.duckdns.org:5084/api/Ticket", {
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

  const { background, text, buttons  } = useContext(DarkModeContext)
  return (
    
    <View style={{backgroundColor: background, flex: 1, alignItems: "center"}}>
      <Image source={require(".././img/halpy3.png")} style={Styles.logo} />
      <Text style={{color: text, fontSize: 24, paddingBottom: 0, marginBottom: "7%" }}>
        NEW TICKET
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
      <TextInput
        style={[Styles.boxStyle, {color: text, width: "85%", margin: "2%" }]}
        mode={"outlined"}
        label="Room"
        outlineColor={"transparent"}
        activeOutlineColor={"grey"}
        value={value.room}
        onChangeText={(text) => setValue((prevValue) => ({ ...prevValue, room: text }))}
      />
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
        mode="contained"
        labelStyle={Styles.buttonStyle}
        onPress={handleCreateTicket}
      >
        CREATE TICKET
      </Button>
    </View>
  );
};

export default createTicket;
