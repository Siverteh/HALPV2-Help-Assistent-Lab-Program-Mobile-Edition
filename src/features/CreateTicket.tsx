import { Ticket } from "../types/ticket";
import { TextInput, Button, Text } from "react-native-paper";
import { useState } from "react";
import isEmpty from "lodash/isEmpty";
import v from "lodash/values";
import every from "lodash/every";
import Styles from "../styles/styles";
import * as React from "react";
import { Dimensions, Image, View } from "react-native";


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


  return (
    <View style={[Styles.lm_background, { flex: 1, alignItems: "center" }]}>
      <Image source={require("./HALP.png")} style={Styles.logo} />
      <Text style={[Styles.lm_text, { fontSize: 24, paddingBottom: 0, marginBottom: "7%"}]}>NEW TICKET</Text>
      <TextInput style={{ ...Styles.lm_text, ...Styles.lm_boxes, width: "85%", margin: "2%" }}
                 label="Name"
                 value={value?.name}
      />
      <TextInput style={{ ...Styles.lm_text, ...Styles.lm_boxes, width: "85%", margin: "2%" }}
                 label="Room"
                 value={value?.room}
      />
      <TextInput style={{ ...Styles.lm_text, ...Styles.lm_boxes, width: "85%", height: screenHeight * 0.2, margin: "2%", textAlignVertical: "top" }}
                 label="Description"
                 value={value?.description}
                 multiline={true}
      />
      <Button style={{ ...Styles.lm_button, width: 230, height: 50, margin: 10 }} labelStyle={Styles.lm_textButton}>
        CREATE TICKET
      </Button>
    </View>

  );

};


export default createTicket;
