import { useState, useEffect } from 'react'
import React from 'react';
import ListComponent, { Course } from './List'
import { StackScreenProps } from '@react-navigation/stack'
import { AppState, RootStackParamList } from '../types'
import RNEventSource from "react-native-event-source"
import { useSelector } from 'react-redux';

const Helplist = ({ route }:  StackScreenProps<RootStackParamList, 'HelpListScreen'>) => {

  const [tiggerFetch, setTiggerFetch] = useState<boolean>(false)
  const { course } = route.params
  const [data, setData] = useState<Array<Course>>([])
  const { user: { token }} = useSelector((state: AppState) => state.user)

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
            console.log('data: ', data)
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
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([updatedData])
      })
      .then(() => setTiggerFetch(true))
      .catch((error) => console.error(error))
  };
  return (
    <ListComponent
      title='Helplist'
      urlLive={`https://chanv2.duckdns.org:7006/api/SSE/Helplist?course=${course}`}
      onUpdate={updateCourse}
      data={data}
    />
  );
};

export default Helplist;
