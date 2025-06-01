import './Notification.css'

export const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }
  return (
    <div className={type} data-testid="error-div">
      {message}
    </div>
  )
}
