import { useState, useEffect, useContext } from 'react'
import React from 'react';
import ListComponent, { Course } from './List'
import { useSelector } from 'react-redux';
import { AppState, RootStackParamList } from '../types';
import { IconButton } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
import { ThemeContext } from '../Components/GlobalHook';


const Archive = ({ route, navigation }:  StackScreenProps<RootStackParamList, 'ArchiveScreen'>) => {

  const { user: { token }} = useSelector((state: AppState) => state.user)
  const { course } = route.params
  const { text } = useContext(ThemeContext)
  const [data, setData] = useState<Array<Course>>([])

  useEffect(() => {
    fetch(`https://chanv2.duckdns.org:7006/api/Archive?course=${course}`, {
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
  })


  const updateCourse = async (updatedData: Course) => {

      const link = "https://chanv2.duckdns.org:7006/api/Archive?id=" + updatedData.Id
      
      fetch(link, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify([updatedData])
      })
      .catch((error) => console.error(error))
  };

  const handleNavigate = () => {
    navigation.navigate('HelpListScreen', { course })
  }
  
  return (
    <ListComponent
      title={`ARCHIVE ${course}`}
      urlLive={`https://chanv2.duckdns.org:7006/api/SSE/Archive?course=${course}`}
      onUpdate={updateCourse}
      data={data}
    >
      <IconButton
        icon="arrow-left"
        iconColor={text}
        onPress={handleNavigate}     
      />
    </ListComponent>
  );
};

export default Archive;
