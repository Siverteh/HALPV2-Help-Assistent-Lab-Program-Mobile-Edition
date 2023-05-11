import { useState, useEffect, useContext } from 'react'
import React from 'react';
import ListComponent, { Course } from './List'
import { StackScreenProps } from '@react-navigation/stack'
import { AppState, RootStackParamList } from '../types'
import { useSelector } from 'react-redux';
import { IconButton } from 'react-native-paper';
import { ThemeContext } from '../Components/ThemeContext';
import { View } from 'react-native'

const Helplist = ({ route, navigation }:  StackScreenProps<RootStackParamList, 'HelpListScreen'>) => {

  const { course } = route.params
  const [data, setData] = useState<Array<Course>>([])
  const { user: { token }} = useSelector((state: AppState) => state.user)
  const { text } = useContext(ThemeContext)

  // const es = new RNEventSource(`https://chanv2.duckdns.org:7006/api/SSE/Helplist?course=${course}`);

  // es.addEventListener("message", (event) => {
  //   const jsonobject: any = event.data;
  //   console.log("res: ", jsonobject)
  //   if (jsonobject) {
  //     setData(jsonobject)
  //   }
  // })

  useEffect(() => {
    fetch(`https://chanv2.duckdns.org:7006/api/Helplist?course=${course}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
  })
        .then(response => response.json())
        .then((data) => {
            const newDataMapper = data.map((d: any) => {
                return {
                Id: d.id,
                Nickname: d.nickname,
                Description: d.description,
                Room: d.room
            }})
            setData(newDataMapper)
        })
        .catch((error) => console.log('error: ', error))
        //.finally(() => setLoading(false))
  }, [course])

  const updateCourse = async (updatedData: Course) => {

      const link = "https://chanv2.duckdns.org:7006/api/Helplist?id=" + updatedData.Id
      
      fetch(link, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([updatedData])
      })
      .catch((error) => console.error(error))
  }

  const handleClick = () => {
    navigation.navigate('ArchiveScreen', { course })
  }

  const handleNavigate = () => {
    navigation.navigate('LabQueues')
  }
  return (
    <ListComponent
      title={`HELPLIST ${course}`}
      urlLive={`https://chanv2.duckdns.org:7006/api/SSE/Helplist?course=${course}`}
      onUpdate={updateCourse}
      data={data}
    >
     <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <IconButton
        icon="arrow-left"
        iconColor={text}
        onPress={handleNavigate}     
      />
      <IconButton
        icon="archive-outline"
        iconColor={text}
        onPress={handleClick}     
      />
      </View>
      </ListComponent>
  );
};

export default Helplist;
