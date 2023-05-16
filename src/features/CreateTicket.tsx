import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { Ticket as TicketProp, TicketExpanded as TicketExpandedProp } from "../types/ticket";
import Ticket from "./Ticket";
import { asyncStorageHook } from "../hook/asyncStorageHook";
import { useEffect } from "react";
import { isEmpty } from "lodash";
import { useQueue } from "../hook/useQueue";

const CreateTicket = ({ navigation }: StackScreenProps<RootStackParamList, "CreateScreen">) => {
  const {setItem} = asyncStorageHook()

  useQueue(navigation)

  const handleSubmit = async (ticket: TicketProp) => {
    fetch("https://chanv2.duckdns.org:7006/api/Ticket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Cache-Control": "no-cache"
      },
      body: JSON.stringify(ticket)
    })
      .then((res) => res.json())
      .then((ticketExpanded: TicketExpandedProp) => {
        setItem('@Ticket', String(ticketExpanded.id))
        navigation.navigate("Queue", ticketExpanded );
      })

      .catch((error) => {
        console.error("Failed to create ticket: ", error);
      });
  };

  return (
    <Ticket
      onSubmit={handleSubmit}
    />
  );
};

export default CreateTicket;
