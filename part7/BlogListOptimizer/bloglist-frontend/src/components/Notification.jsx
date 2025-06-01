import './Notification.css'
import { useSelector } from 'react-redux'

export const Notification = () => {
  const { message, type } = useSelector((state) => state.notification)
  if (!message || type === undefined) {
    return null
  }
  return (
    <div className={type} data-testid="error-div">
      {message}
    </div>
  )
}
