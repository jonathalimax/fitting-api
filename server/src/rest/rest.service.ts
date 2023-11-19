import { Injectable, Logger } from '@nestjs/common'
import { SchedulerJob } from 'src/scheduler/model/scheduler-job'
import { SchedulerService } from 'src/scheduler/scheduler.service'
import { TimerState } from 'src/timer/model/timer-state'
import { TimerService } from 'src/timer/timer.service'

@Injectable()
export class RestService {
  constructor(
    private readonly timerService: TimerService,
    private readonly schedulerService: SchedulerService,
  ) {}

  async finish() {
    const currentDate = new Date()
    const timers = await this.timerService.getRunningTimers()

    if (timers.length == 0) {
      Logger.log(
        "There is no timers to finish! Stopping the 'rest-ended' schedule job",
      )
      this.schedulerService.updateJob(SchedulerJob.REST_ENDED, false)
      return
    }

    const readyTimers = timers.filter((timer) => {
      const currentUtcDate = new Date(currentDate.toISOString())
      const triggerUtcDate = new Date(timer.triggerDate.toDate().toISOString())
      return currentUtcDate >= triggerUtcDate
    })

    readyTimers.forEach((timer) => {
      // TODO: Send real push notification to deviceTokens
      console.log('Sending push notification to deviceToken', timer.deviceToken)
      timer.state = TimerState.TRIGGERED
    })

    await this.timerService.batchUpdate(readyTimers)

    if (timers.length == readyTimers.length) { // TODO: Check if this logic it's 100% ok
      await this.schedulerService.updateJob(SchedulerJob.REST_ENDED, false)
    }
  }
}
