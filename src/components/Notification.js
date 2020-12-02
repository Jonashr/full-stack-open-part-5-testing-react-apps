import React from 'react'

const Notification = ({ notification }) => {

  if(notification.message === null) {
    return null
  }

  const notificationStyling = {
    color: notification.type === 'error' ? 'red' : 'green',
    fontStyle: 'italic',
    fontSize: 25,
    borderStyle: 'solid',
    borderRadius: 5
  }

  return(
    <div style={notificationStyling}>
      {notification.message}
    </div>
  )
}

export default Notification