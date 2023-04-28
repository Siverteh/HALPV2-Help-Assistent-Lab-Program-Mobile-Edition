import { useState, useEffect } from 'react'
import React from 'react';
import ListComponent, { Course } from './List'
import { useSelector } from 'react-redux';
import { AppState } from '../types';


const Archive = () => {

  const [tiggerFetch, setTiggerFetch] = useState<boolean>(false)
  const { user: { token }} = useSelector((state: AppState) => state.user)
  const course = ''

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
        .catch((error) => console.log(error))
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
      .then(() => setTiggerFetch(true))
      .catch((error) => console.error(error))
  };
  
  return (
    <ListComponent
      title='Archive'
      urlLive={`https://chanv2.duckdns.org:7006/api/SSE/Archive?course=${course}`}
      onUpdate={updateCourse}
      data={data}
    />
  );
};

export default Archive;
