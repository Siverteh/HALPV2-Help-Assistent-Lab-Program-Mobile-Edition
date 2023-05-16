import { useEffect } from 'react'
import {AppState } from '../types'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../reducers/archiveReducer';


export const useArchive = (course: string) => {
  const { isLoaded } = useSelector((state: AppState) => state.archive)
  const { user: { token }} = useSelector((state: AppState) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isLoaded[course]) {
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
             dispatch(actions.setArchive({courseKey: course, tickets: newDataMapper}))
        })
        .finally(() => dispatch(actions.setIsLoaded({key: course, isLoaded: true})))
        .catch((error) => {
          console.error("Failed to get archive list", error)
        })
      }
  }, [course])

}
  