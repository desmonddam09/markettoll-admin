import React, { useEffect } from 'react'
import NotificationList from '../components/Notifications/NotificationList'

const Notifications = () => {
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0,0);
      document.title = "Market-Toll - Push Notifications";
    };
    scrollToTop()
  }, []);

  return (
    <div>
      <NotificationList/>
    </div>
  )
}

export default Notifications
