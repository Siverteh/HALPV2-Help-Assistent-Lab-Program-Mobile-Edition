import { useContext, useEffect, useState } from 'react'
import { View, ScrollView, Text } from 'react-native'
import { List } from "react-native-paper";
import { Header, CustomAccordion } from "../Components/CustomComponents"
import React from 'react'
import { ThemeContext } from '../Components/ThemeContext'

export type Course = {
    Id: string;
    Nickname: string;
    Description: string;
    Room: string;
}

type CourseRes = {
    id: string;
    nickname: string;
    description: string;
    room: string;
}

type Props = {
    title: string,
    urlLive: string
    onUpdate: (data: Course) => Promise<void>
    data: Array<Course>
    children?: JSX.Element
}


const ListComponent = ({
    title,
    onUpdate,
    data,
    children
}: Props) => {
  const { background, text, listItem_dark, listItem_light  } = useContext(ThemeContext)

  const [checked, setChecked] = useState(new Map());
  const [expanded, setExpanded] = useState(new Map())
  // const [data, setData] = useState<Array<Course>>(dataprop)

  // useEffect(() => {
  //   setData(dataprop)
  // }, [dataprop])

  const handleCheck = (id: string) => {
    const currentChecked = checked.get(id) || false
    setChecked(new Map(checked.set(id, !currentChecked)))

    const updatedItem = data.find(item => item.Id === id);

    if (updatedItem) {
    
        // setData((prev) => {
        //     const filteredData = prev.filter(item => item.Id !== id);
        //     return filteredData
        // })

        onUpdate(updatedItem)
    }

  }

  const handleExpand = (id: string) => {
    const currentExpanded = expanded.get(id) || false;
    setExpanded(new Map(expanded.set(id, !currentExpanded)));
  }

  return (
    <View style={{backgroundColor: background,  height: '100%' }}>
      {children}
      <Header title={title} />
      <ScrollView style={{ flex: 1 }}>
        {data && data.length > 0 ? (
          <List.Section>
            {data.map((item, index) =>  (
              <CustomAccordion
                key={item.Id}
                title={item.Nickname}
                room={item.Room}
                style={index % 2 === 0 ? listItem_light : listItem_dark }
                titleStyle= {{
                  color: text, 
                  paddingHorizontal: 16,
                  paddingVertical: 2,
                  fontSize: 14,
                  }}
                expanded={expanded.get(item.Id) || false}
                onPress={() => handleExpand(item.Id)}
                description={item.Description}
                onCheck={() => handleCheck(item.Id)}
                checked={checked.get(item.Id) || false}
                textStyle={{color: text}}/>
            ))}
          </List.Section>
        ) : (
          <Text style={{ textAlign: 'center' }} >No requests yet</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default ListComponent;
