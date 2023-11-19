import { Module } from '@nestjs/common'
import { RestService } from './rest.service'
import { RestController } from './rest.controller'
import { TimerService } from 'src/timer/timer.service'
import { SchedulerService } from 'src/scheduler/scheduler.service'

@Module({
  controllers: [RestController],
  providers: [RestService, TimerService, SchedulerService],
})
export class RestModule {}
