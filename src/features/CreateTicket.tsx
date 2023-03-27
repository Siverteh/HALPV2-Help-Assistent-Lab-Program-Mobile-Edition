import { Ticket } from "../types/ticket";
import { TextInput, Button, Text } from "react-native-paper";
import { useState } from "react";
import isEmpty from "lodash/isEmpty";
import v from "lodash/values";
import every from "lodash/every";
import Styles from "../styles/styles";
import * as React from "react";
import { Dimensions, Image, useColorScheme, View } from "react-native";


const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

type Props = {
  rooms: Array<string> // can also be a hook
  ticket?: Ticket
  onSubmit: (ticket: Ticket) => {}
}


const createTicket = ({
                        onSubmit,
                        ticket,
                        rooms
                      }: Props) => {

  const [value, setValue] = React.useState<Ticket | null>(ticket ?? null);

  const isValidValue = value && v(value).every(isEmpty);
  //const isDarkMode = useColorScheme() === "dark";
  const isDarkMode = false;
  const stylePrefix = isDarkMode ? "dm" : "lm";


  return (
    <View style={[Styles[`${stylePrefix}_background`], { flex: 1, alignItems: "center" }]}>
      <Image source={require("./HALP.png")} style={Styles.logo} />
      <Text style={[Styles[`${stylePrefix}_text`], { fontSize: 24, paddingBottom: 0, marginBottom: "7%" }]}>NEW
        TICKET</Text>
      <TextInput
        style={{ ...Styles[`${stylePrefix}_text`], ...Styles[`${stylePrefix}_boxes`], width: "85%", margin: "2%" }}
        mode={"outlined"}
        label="Name"
        outlineColor={"transparent"}
        activeOutlineColor={"grey"}
        value={value?.name}
      />
      <TextInput
        style={{ ...Styles[`${stylePrefix}_text`], ...Styles[`${stylePrefix}_boxes`], width: "85%", margin: "2%" }}
        mode={"outlined"}
        label="Room"
        outlineColor={"transparent"}
        activeOutlineColor={"grey"}
        value={value?.room}
      />
      <TextInput style={{
        ...Styles[`${stylePrefix}_text`], ...Styles[`${stylePrefix}_boxes`],
        width: "85%",
        margin: "2%"
      }}
                 mode={"outlined"}
                 label={"Description"}
                 outlineColor={"transparent"}
                 activeOutlineColor={"grey"}
                 value={value?.description}
                 multiline={true}
      />
      <Button style={{ ...Styles[`${stylePrefix}_button`], width: 230, height: 50, margin: "2%" }}
              labelStyle={Styles[`${stylePrefix}_textButton`]}>
        CREATE TICKET
      </Button>
    </View>

  );

};


export default createTicket;
