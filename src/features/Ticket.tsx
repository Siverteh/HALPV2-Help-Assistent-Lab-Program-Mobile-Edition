import { Ticket } from "../types/ticket";
import { Button, Typography, Box, TextInput, Selector } from "@react-native-material/core";
import { useState } from "react";
import isEmpty from "lodash/isEmpty";
import v from "lodash/values";
import every from "lodash/every";
import Styles from "../styles/styles";


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

  const [value, setValue] = useState<Ticket | null>(ticket ?? null);

  const handleChange = (name: string) => (event: any) => {
    setValue(prev => {
      return { ...prev, [name]: event.target.value } as any;
    });
  };

  const isValidValue = value && v(value).every(isEmpty);

  return (
    <Box>
      <TextInput
        label="Name"
        onChange={handleChange("name")}
        value={value?.name}
      />

      <TextInput
        label="Description"
        onChange={handleChange("description")}
        value={value?.description}
      />


      <Button
        variant="contained"
        disabled={!isValidValue}
        onPress={() => onSubmit(value!)}
        title="Save">
      </Button>

    </Box>
  );

};



export default TicketComponent;
