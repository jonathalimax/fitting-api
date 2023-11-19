import { Injectable, Logger } from '@nestjs/common'
import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase'
import { CollectionReference } from 'firebase-admin/firestore'
import { CreateTimerDto } from './dto/create-timer.dto'
import { UpdateTimerDto } from './dto/update-timer.dto'
import { TimerState } from './model/timer-state'
import { Timer } from './entity/timer.entity'
import { SchedulerService } from 'src/scheduler/scheduler.service'
import { SchedulerJob } from 'src/scheduler/model/scheduler-job'

@Injectable()
export class TimerService {
  constructor(
    @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
    private readonly schedulerService: SchedulerService,
  ) {}

  private getTimersCollection(): CollectionReference {
    return this.firebase.firestore.collection('timers')
  }

  async create(createTimerDto: CreateTimerDto) {
    const { triggerSeconds, deviceToken } = createTimerDto
    const currentDate = new Date()
    const triggerDate = new Date(currentDate.getTime() + triggerSeconds * 1000)

    const response = await this.getTimersCollection().add({
      triggerDate,
      deviceToken,
      state: TimerState.SCHEDULED,
    })

    Logger.log(`TimerService :: enabling rest job`)
    await this.schedulerService.updateJob(SchedulerJob.REST_ENDED, true)

    return response
  }

  async getRunningTimers() {
    let timers: Timer[] = []
    const timersRef = this.firebase.firestore.collection('timers')
    const snapshot = await timersRef
      .where('state', '==', TimerState.SCHEDULED)
      .get()

    snapshot.forEach((doc) => {
      const data = doc.data() as Timer
      if (data) timers.push({ id: doc.id, ...data })
    })

    return timers
  }

  async batchUpdate(timers: Timer[]) {
    const batch = this.firebase.firestore.batch()

    timers.forEach((update) => {
      const docRef = this.getTimersCollection().doc(update.id)

      batch.update(docRef, {
        triggerDate: update.triggerDate,
        deviceToken: update.deviceToken,
        state: update.state,
      })
    })

    try {
      await batch.commit()
      Logger.log('Timers updated through batch update')
    } catch (error) {
      Logger.error('Error updating documents in batch:', error)
      throw error
    }
  }
}
