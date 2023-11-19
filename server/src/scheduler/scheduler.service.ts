import { Injectable, Logger } from '@nestjs/common'
import { CloudSchedulerClient } from '@google-cloud/scheduler'
import { google } from '@google-cloud/scheduler/build/protos/protos'
import { SchedulerCron } from './model/scheduler-cron'

type IJob = google.cloud.scheduler.v1.IJob

@Injectable()
export class SchedulerService {
  private readonly schedulerClient: CloudSchedulerClient

  constructor() {
    this.schedulerClient = new CloudSchedulerClient()
  }

  async updateJob(name: string, enabled: boolean) {
    let job = await this.getJob(name)

    if (enabled && job.state == google.cloud.scheduler.v1.Job.State.ENABLED) {
      return
    }

    job.schedule = enabled
      ? SchedulerCron.EVERY_MINUTE
      : SchedulerCron.FIRST_DAY_YEAR

    await this.schedulerClient.updateJob({ job })

    Logger.log(
      `The job ${job.name} is now ${enabled ? 'enabled' : 'disabled'}!`,
    )
  }

  private async getJob(name: string): Promise<IJob> {
    let jobName = this.schedulerClient.jobPath(
      'fitting-2a76c', //process.env.GOOGLE_PROJECT_ID, // TODO: Use env instead
      'southamerica-east1',
      name,
    )

    const [job] = await this.schedulerClient.getJob({ name: jobName })
    return job
  }
}
