import { Module, OnApplicationBootstrap } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TimerModule } from './timer/timer.module'
import { FirebaseAppModule } from './firebase/firebase.module'
import { FirestoreListenerService } from './firebase/firestore-listener.service'

@Module({
  imports: [TimerModule, FirebaseAppModule],
  controllers: [AppController],
  providers: [AppService, FirestoreListenerService],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(
    private readonly firestoreListenerService: FirestoreListenerService,
  ) {}

  onApplicationBootstrap() {
    this.firestoreListenerService.startFirestoreListener()
  }
}
