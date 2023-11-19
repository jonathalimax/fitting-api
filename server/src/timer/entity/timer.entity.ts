import { Timestamp } from 'firebase-admin/firestore'
import { TimerState } from '../model/timer-state'

export interface Timer {
  id: string
  triggerDate: Timestamp
  deviceToken: string
  state: TimerState
}
