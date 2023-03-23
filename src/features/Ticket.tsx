import { Ticket } from "../types/ticket";
import { Typography, Box, Selector } from "@react-native-material/core";
import { TextInput, Button } from "react-native-paper";
import { useState } from "react";
import isEmpty from "lodash/isEmpty";
import v from "lodash/values";
import every from "lodash/every";
import Styles from "../styles/styles";
import * as React from "react";


type Props = {
  rooms: Array<string> // can also be a hook
  ticket?: Ticket
  onSubmit: (ticket: Ticket) => {}
}

const TicketComponent = ({
                           onSubmit,
                           ticket,
                           rooms
                         }: Props) => {

  const [value, setValue] = React.useState<Ticket | null>(ticket ?? null);

  const isValidValue = value && v(value).every(isEmpty);



  return (
    <Box style={{ ...Styles.lm_background, justifyContent: "center", alignItems: "center", height: "100%" }}>

      <TextInput style={{ ...Styles.lm_text, ...Styles.lm_boxes, width: 230, height: 50, paddingTop: 0 }}
                 label="Name"
                 value={value?.name}
      />

      <TextInput style={{ ...Styles.lm_text, ...Styles.lm_boxes, width: 230, height: 50, paddingTop: 0 }}
                 label="Room"
                 value={value?.room}
      />

      <TextInput style={{ ...Styles.lm_text, ...Styles.lm_boxes, width: 230, height: 50, paddingTop: 0 }}
                 label="Description"
                 value={value?.description}
      />

      <Button style={{ ...Styles.lm_button, width: 230, height: 50 }}
              labelStyle={Styles.lm_textButton}>SAVE</Button>

    </Box>
  );

};


export default TicketComponent;
