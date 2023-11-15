import { Injectable } from '@nestjs/common'
import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase'
import { CollectionReference } from 'firebase-admin/firestore'
import { CreateTimerDto } from './dto/create-timer.dto'
import { UpdateTimerDto } from './dto/update-timer.dto'
import { TimerState } from './model/timer-state'

@Injectable()
export class TimerService {
  constructor(
    @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
  ) {}

  getTimersCollection(): CollectionReference {
    return this.firebase.firestore.collection('users')
  }

  async create(createTimerDto: CreateTimerDto) {
    const { triggerSeconds } = createTimerDto
    const currentDate = new Date()
    const triggerDate = new Date(currentDate.getTime() + triggerSeconds * 1000)

    return this.getTimersCollection().add({
      triggerDate,
      state: TimerState.Scheduled
    })
  }

  async update(id: string, updateTimerDto: UpdateTimerDto) {
    const { triggerSeconds } = updateTimerDto
    const currentDate = new Date()
    const triggerDate = new Date(currentDate.getTime() + triggerSeconds * 1000)

    return this.getTimersCollection().doc(id).update({
      triggerDate,
      state: TimerState.Scheduled
    })
  }
}
