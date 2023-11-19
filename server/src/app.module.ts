import { Module, OnApplicationBootstrap } from '@nestjs/common'
import { TimerModule } from './timer/timer.module'
import { FirebaseAppModule } from './firebase/firebase.module'
import { FirestoreListenerService } from './firebase/firebase-listener.service'
import { RestModule } from './rest/rest.module'
import { SchedulerModule } from './scheduler/scheduler.module'
import { SchedulerService } from './scheduler/scheduler.service'

@Module({
  imports: [TimerModule, FirebaseAppModule, RestModule, SchedulerModule],
  controllers: [],
  providers: [FirestoreListenerService, SchedulerService],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(
    private readonly firestoreListenerService: FirestoreListenerService,
  ) {}

  onApplicationBootstrap() {
    this.firestoreListenerService.startFirestoreListener()
  }
}
