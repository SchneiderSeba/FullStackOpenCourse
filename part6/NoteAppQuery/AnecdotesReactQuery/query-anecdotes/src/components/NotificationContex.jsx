/* eslint-disable react/prop-types */
import { useReducer, createContext, useContext } from "react"

const notificationReducer = (state, action) => {
    switch (action.type) {
      case 'CREATE_NOTIFICATION':
        return action.notification
      case 'VOTE_NOTIFICATION':
        return action.notification
      case 'CLEAR_NOTIFICATION':
        return ''
      default:
        return state
    }
  }

const NotiContext = createContext()

export const NotiContextProvider = (props) => {
  const [ notification, notificationDispatch ] = useReducer(notificationReducer, '')

return (
        <NotiContext.Provider value={{ notification, notificationDispatch }}>
            {props.children}
        </NotiContext.Provider>
    )
}

export const useNotiContext = () => {
  return useContext(NotiContext)
}

export default NotiContext