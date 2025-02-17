import { useNotiContext } from "./NotificationContex"

const Notification = () => {

  const { notification, dispatch } = useNotiContext()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  } 

  return (

    notification && (
      <div style={style}>
        {notification}
      </div>
    )
  )
}

export default Notification
