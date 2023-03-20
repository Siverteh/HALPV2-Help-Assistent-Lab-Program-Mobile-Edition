import { Ticket } from "../types/ticket";
import { Button, Typography, Box, TextInput, Selector } from "@react-native-material/core";
import { useState } from "react";
import isEmpty from "lodash/isEmpty";
import v from "lodash/values";
import every from "lodash/every";
import { StyleSheet } from "react-native";


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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0EEF7',
  },
  rectangle: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 32,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  topContent: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  bottomContent: {
    alignSelf: 'stretch',
    justifyContent: 'space-between',
  },
  hiText: {
    fontSize: 24,
    color: '#000000',
  },
  statusText: {
    fontSize: 20,
    color: '#000000',
  },
  queueNumber: {
    fontSize: 48,
    color: '#000000',
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    width: '100%',
    marginBottom: 8,
  },
  buttonEdit: {
    backgroundColor: '#94CCFF',
  },
  buttonCancel: {
    backgroundColor: '#94CCFF',
  },
  buttonText: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
  },
});

export default TicketComponent;
