import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase'
import { Injectable, Logger } from '@nestjs/common'
import { SchedulerService } from 'src/scheduler/scheduler.service'
import { SchedulerJob } from 'src/scheduler/model/scheduler-job'

@Injectable()
export class FirestoreListenerService {
  constructor(
    @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
    private readonly schedulerService: SchedulerService,
  ) {}

  startFirestoreListener() {
    const firestore = this.firebase.firestore
    const timersCollection = firestore.collection('timers')

    timersCollection.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        // if (change.type === 'added') {
        //   this.schedulerService.updateJob(SchedulerJob.REST_ENDED, true)
        //   Logger.log(
        //     `A timer object was added & the scheduler would start running. Object ${JSON.stringify(
        //       change.doc,
        //     )}`,
        //   )
        // }
      })
    })
  }
}
