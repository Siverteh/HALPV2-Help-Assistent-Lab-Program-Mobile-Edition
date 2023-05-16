import { useContext, useState } from 'react'
import { View, ScrollView, Text } from 'react-native'
import { ActivityIndicator, List } from "react-native-paper";
import { CustomAccordion, Header } from "../Components/CustomComponents"
import React from 'react'
import { ThemeContext } from '../Components/ThemeContext'
import { TicketWithId } from '../types/ticket';

type Props = {
    title: string,
    loading: boolean
    onUpdate: (data: TicketWithId) => void
    data: Array<TicketWithId>
    children?: JSX.Element
}


const ListComponent = ({
  title,
  onUpdate,
  data,
  loading,
  children
}: Props) => {
  const { background, text, listItem_dark, listItem_light, icon: {active} } = useContext(ThemeContext)

  const [checked, setChecked] = useState(new Map());
  const [expanded, setExpanded] = useState(new Map())

  const handleCheck = (id: string) => {
    const currentChecked = checked.get(id) || false
    setChecked(new Map(checked.set(id, !currentChecked)))

    const updatedItem = data.find(item => item.Id === id);

    if (updatedItem) {

      onUpdate(updatedItem)
    }

  }

  const handleExpand = (id: string) => {
    const currentExpanded = expanded.get(id) || false;
    setExpanded(new Map(expanded.set(id, !currentExpanded)));
  }

  return (
    <View style={{ backgroundColor: background, height: '100%', }}>
     <View style={{height: "-10%"}} />
      <Header title={title} />
      <View style={{marginTop: "-50%"}} />
      {children}
      <View style={{marginTop: "40%"}} />
      <ScrollView style={{ flex: 1 }}>
        {loading ? (
          <ActivityIndicator size="large" color={active} />
        ): (
        <>
        {data && data.length > 0 ? (
          <List.Section>
            {data.map((item, index) => (
              <CustomAccordion
                key={item.Id}
                title={item.Nickname}
                room={item.Room}
                style={index % 2 === 0 ? listItem_light : listItem_dark}
                titleStyle={{
                  color: text,
                  paddingVertical: 2,
                  fontSize: 20,
                  paddingHorizontal: 15,
                }}
                expanded={expanded.get(item.Id) || false}
                onPress={() => handleExpand(item.Id)}
                description={item.Description}
                onCheck={() => handleCheck(item.Id)}
                checked={checked.get(item.Id) || false}
                textStyle={{ color: text, paddingHorizontal: 15,
                }} />
            ))}
          </List.Section>
        ) : (
          <Text style={{ textAlign: 'center', color: text, fontSize: 20 }} >List is empty</Text>
        )}
        </>
        )}
      </ScrollView>
    </View>
  );
};

export default ListComponent;
