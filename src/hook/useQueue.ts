import { useEffect } from 'react'
import {AppState } from '../types'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../reducers/queueReducer';
import { asyncStorageHook } from './asyncStorageHook';
import { isEmpty } from 'lodash';


export const useQueue = (navigation: any) => {
    const {getItem} = asyncStorageHook()
    const  state = useSelector((state: AppState) => state.queue)
    const dispatch = useDispatch()

      useEffect(() => {
        const fetchData = async () => {
          const ticketId = await getItem("@Ticket")
          
          if(!isEmpty(ticketId) && !state.isLoadedQueue) {
            fetch(`https://chanv2.duckdns.org:7006/api/Ticket?id=${ticketId}`, {
                headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json",
                  "Cache-Control": "no-cache"
                }
          })
          .then((res) => res.json())
          .then(data => {
            if (data.status !== 404) {
              dispatch(actions.setTicket(data))
              dispatch(actions.setIsLoadedQueue(true))
              navigation.navigate("Queue", data )
              
            }
          })
          }
        }
        fetchData()
      }, [])


}
  