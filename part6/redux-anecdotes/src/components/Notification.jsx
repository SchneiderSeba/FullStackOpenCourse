import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { addNotification } from '../reducers/notificationReducer.js'

export const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch(addNotification(''))
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [notification, dispatch])

  if (!notification) {
    return null
  }
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}