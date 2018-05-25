import {AsyncStorage} from 'react-native'
import { Notifications, Permissions } from 'expo'

const FLASHCARDS_NOTIFICATIONS = 'flashcards:notifications'

export function clearNotifications() {
    return AsyncStorage.removeItem(FLASHCARDS_NOTIFICATIONS)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}



function createNotification() {
    return {
        title: 'Don\'t forget to study!',
        body: "Make sure you revise today.",
        ios: {
            sound: true,
        }
    }
}

export function setLocalNotification() {
    AsyncStorage.getItem(FLASHCARDS_NOTIFICATIONS)
      .then(JSON.parse)
      .then((data) => {
        if (data === null) {
          Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({ status }) => {
              if (status === 'granted') {
                Notifications.cancelAllScheduledNotificationsAsync()
  
                let tomorrow = new Date()
                tomorrow.setDate(tomorrow.getDate() + 1)
                tomorrow.setHours(20)
                tomorrow.setMinutes(0)
  
                Notifications.scheduleLocalNotificationAsync(
                  createNotification(),
                  {
                    time: tomorrow,
                    repeat: 'day',
                  }
                )
  
                AsyncStorage.setItem(FLASHCARDS_NOTIFICATIONS, JSON.stringify(true))
              }
            })
        }
      })
  }