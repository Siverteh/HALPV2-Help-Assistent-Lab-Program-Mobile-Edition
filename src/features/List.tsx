import { useContext, useEffect, useState } from 'react'
import { View, Image, ScrollView, Text } from 'react-native'
import { List } from "react-native-paper";
import Styles from "../styles/styles";
import { Header, CustomAccordion } from "../Components/CustomComponents"
import React from 'react'
import { Dimensions } from 'react-native'
import { ThemeContext } from '../Components/GlobalHook'
import RNEventSource from "react-native-event-source"

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
    url: string
    urlLive: string
    onUpdate: (data: Course) => Promise<void>
}


const ListComponent = ({
    url,
    urlLive,
    onUpdate
}: Props) => {
  const windowHeight = Dimensions.get('window').height;
  const { background, text, listItem_dark, listItem_light  } = useContext(ThemeContext)

  const [checked, setChecked] = useState(new Map());
  const [expanded, setExpanded] = useState(new Map());
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Array<Course>>([])

  const es = new RNEventSource(urlLive);

  const test = es.addEventListener("message", (event) => {
    const jsonobject: any = event.data;
    console.log(jsonobject)
    if (jsonobject) {
    // setData(jsonobject)
    }
  })
 
  console.log(test.listener)

  const handleCheck = (id: string) => {
    const currentChecked = checked.get(id) || false
    setChecked(new Map(checked.set(id, !currentChecked)))

    const updatedItem = data.find(item => item.Id === id);

    if (updatedItem) {
    
        setData((prev) => {
            const filteredData = prev.filter(item => item.Id !== id);
            return filteredData
        })

        onUpdate(updatedItem)
    }

  }

  const handleExpand = (id: string) => {
    const currentExpanded = expanded.get(id) || false;
    setExpanded(new Map(expanded.set(id, !currentExpanded)));
  }

  const getCourse = () => {
    setLoading(true)

    fetch(url)
        .then(async (response) => {
            const data: Array<CourseRes> = await response.json()
            const newDataMapper = data.map((d) => {
                return {
                Id: d.id,
                Nickname: d.nickname,
                Description: d.description,
                Room: d.room
            }})
            setData(newDataMapper)
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false))
  }

//   useEffect(() => {
//     const interval = setInterval(() => {
//     //   getCourse();
//     }, 5000);
//     return () => {
//       clearInterval(interval);
//     };
//   }, []);

  console.log('init: ', data)

  return (
    <View style={{backgroundColor: background,  height: windowHeight }}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}></View>
      <Image style={[Styles.logo]} source={require('.././img/halpy3.png')} />
      <Header titleStyle= {[Styles.Header, {color: text} ]}  title='Helplist' />
      <ScrollView style={{ flex: 1 }}>
        {data && data.length > 0 ? (
          <List.Section>
            {data.map((item, index) => {
                console.log('item: ', item)
                return (
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
            )
}
            )}
          </List.Section>
        ) : (
          <Text style={{ textAlign: 'center' }} >No requests yet</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default ListComponent;
