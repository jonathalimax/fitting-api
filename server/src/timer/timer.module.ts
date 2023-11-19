import { Module } from '@nestjs/common'
import { TimerService } from './timer.service'
import { TimerController } from './timer.controller'
import { SchedulerService } from 'src/scheduler/scheduler.service'

@Module({
  controllers: [TimerController],
  providers: [TimerService, SchedulerService],
})
export class TimerModule {}
