
import { useContext, useEffect, useState } from 'react';
import { View, Image, ScrollView, Text } from 'react-native';
import { List } from "react-native-paper";
import Styles from "../styles/styles";
import { Header, CustomAccordion } from "../Components/CustomComponents"
import React from 'react';
import { Dimensions } from 'react-native';
import { DarkModeContext } from '../Components/GlobalHook';

type Course = {
  id: string;
  nickname: string;
  description: string;
  isChecked: boolean;
  room: string;
}



// Helplist
const Helplist = () => {
  const windowHeight = Dimensions.get('window').height;

  const [checked, setChecked] = useState(new Map());
  const [expanded, setExpanded] = useState(new Map());
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Course[]>([]);
  const { background, text, listItem_dark, listItem_light  } = useContext(DarkModeContext)


  const handleCheck = async (id: string) => {
    const currentChecked = checked.get(id) || false;
    setChecked(new Map(checked.set(id, !currentChecked)));
  
    const updatedData = data.map(item => {
      if (item.id === id) {
        return {
          ...item,
          isChecked: !currentChecked
        };
      }
      return item;
    });
  
    setData(updatedData);
    const updatedItem = updatedData.find(item => item.id === id);
  
    if (updatedItem) {
      const filteredData = updatedData.filter(item => item.id !== id);
      setData(filteredData);
      await updateCourse(updatedItem);
    }
  };

  const handleExpand = (id: string) => {
    const currentExpanded = expanded.get(id) || false;
    setExpanded(new Map(expanded.set(id, !currentExpanded)));
  };

  const getCourse = async () => {
    try {
      const response = await fetch('https://chanv2.duckdns.org:7006/api/Helplist?course=ikt201-g');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
     getCourse();
    const interval = setInterval(() => {
      getCourse();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const updateCourse = async (updatedData: Course) => {
    try {
      var link = "https://chanv2.duckdns.org:7006/api/Helplist?id=" + updatedData.id
      const response = await fetch(link, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([updatedData])
      });
      const json = await response.text().then(data => {
        getCourse();
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <View style={{backgroundColor: background,  height: windowHeight }}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}></View>
      <Image style={[Styles.logo]} source={require('.././img/halpy3.png')} />
      <Header titleStyle= {[Styles.Header, {color: text} ]}  title='Helplist' />
      <ScrollView style={{ flex: 1 }}>
        {data && data.length > 0 ? (
          <List.Section>
            {data.map((item, index) => (
              <CustomAccordion
                key={item.id}
                title={item.nickname}
                room={item.room}
                style={index % 2 === 0 ? listItem_light : listItem_dark }
                titleStyle= {{
                  color: text, 
                  paddingHorizontal: 16,
                  paddingVertical: 2,
                  fontSize: 14,
                  }}
                expanded={expanded.get(item.id) || false}
                onPress={() => handleExpand(item.id)}
                description={item.description}
                onCheck={() => handleCheck(item.id)}
                checked={checked.get(item.id) || false}
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

export default Helplist;