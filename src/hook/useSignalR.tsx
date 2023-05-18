import { useEffect } from 'react'
import {
  HubConnection,
  HubConnectionBuilder
} from '@aspnet/signalr'
import {AppState } from '../types'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../reducers/helplistReducer';
import { actions as actionsQueue } from '../reducers/queueReducer';

export const makeHubConnection = (accessToken: string, signalRUrl: string): HubConnection => {
  return new HubConnectionBuilder()
    .withUrl(signalRUrl, {
      accessTokenFactory: () => accessToken,
      logMessageContent: true
    })
    .configureLogging({
      log: function (logLevel, message) {
        // console.log('SIGNALR: ' + new Date().toISOString() + ': ' + message)
      }
    })
    .build()
}

export const useSignalR = (course?: string) => {
  const state = useSelector((state: AppState) => state.helplist)
  const { isLoadedSignalR } = useSelector((state: AppState) => state.queue)
  const dispatch = useDispatch()

  const hub_endpoint = "https://chanv2.duckdns.org:7006/helplisthub"
  const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJIQUxQIiwianRpIjoiYmNjZGQxOTAtNDc1OS00Yjg4LThjNmYtZDBiYjBiMjQxMzRkIiwiaWF0IjoiMDUvMTEvMjAyMyAxMDozNDo0MiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiZDFjZmI5MDgtZDIwYS00MzRjLTkyNDYtZmQ1MGMzNjUxZWQ1IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6ImNvb2wgQWRtaW4iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJhZG1pbkB1aWEubm8iLCJleHAiOjE2ODM4MDMwODIsImlzcyI6IkhBTFAiLCJhdWQiOiJIQUxQIn0.Y7L7lXBovKf00sb4z1e-dRHFUGJFjeslHo2rOgiOgBc"

  const connection = makeHubConnection(accessToken, hub_endpoint)

  useEffect(() => {
    if (!state.isConnected || course) {
      connection.start()
        .then(() => {
            connection.invoke("AddToGroup", course);
        })
        .catch((error) => {
          console.error("SignalR error")
        })
        

      dispatch(actions.setIsConnected(true))
    }
  }, [course])

  const stateConnection = () => {
    if(!isLoadedSignalR){
    connection.start()
    
    dispatch(actionsQueue.setIsStatedSignalR(true))
    }
  }

  connection.onclose(() => {
    console.log("SIGNALR CONNECTION CLOSED");
    state.isConnected = false;
  })

  return {
    connection,
    stateConnection
  }

}
  