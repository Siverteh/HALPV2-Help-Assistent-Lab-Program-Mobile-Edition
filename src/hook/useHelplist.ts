import { useEffect } from 'react'
import {AppState } from '../types'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../reducers/helplistReducer';


export const useHelplist = (course: string) => {
  const { isLoadedCourse } = useSelector((state: AppState) => state.helplist)
  const { user: { token }} = useSelector((state: AppState) => state.user)
  const dispatch = useDispatch()

  const dataMapper = (data: any) => data.map((d: any) => {
    return {
      Id: d.id,
      Nickname: d.nickname,
      Description: d.description,
      Room: d.room
    }
  })
  
  useEffect(() => {
    if (!isLoadedCourse[course]) {
        fetch(
          `https://chanv2.duckdns.org:7006/api/Helplist?course=${course}`,
          {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          })
            .then(response => response.json())
            .then((data) => {
                dispatch(actions.setHelplist({key: course, tickets: dataMapper(data)}))
            })
            .finally(() => dispatch(actions.setIsLoaded({key: course, isLoaded: true})))
            .catch((error) => {
              console.error("Failed to get help list", error)
            })
            .finally(() => dispatch(actions.setIsLoaded({key: course, isLoaded: true})))
            .catch((error) => {
              console.error("Failed to get helplist", error)
            })
      }
  }, [course])


}
  