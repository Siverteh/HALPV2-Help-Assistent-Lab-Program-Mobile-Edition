import { useState } from 'react'
import React from 'react';
import ListComponent, { Course } from './List';


const Helplist = () => {

  const [tiggerFetch, setTiggerFetch] = useState<boolean>(false)

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
      url='https://chanv2.duckdns.org:7006/api/Helplist?course=ikt205-g'
      urlLive='https://chanv2.duckdns.org:7006/api/SSE/Helplist?course=IKT205-G'
      onUpdate={updateCourse}
    />
  );
};

export default Helplist;
