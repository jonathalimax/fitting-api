import { Module } from '@nestjs/common'
import { FirebaseModule } from 'nestjs-firebase'
import * as path from 'path'
import { FirestoreListenerService } from './firebase-listener.service'
import { SchedulerModule } from 'src/scheduler/scheduler.module'
import { SchedulerService } from 'src/scheduler/scheduler.service'

@Module({
  imports: [
    FirebaseModule.forRoot({
      googleApplicationCredential: path.join(
        process.cwd(),
        'config',
        'credentials.json',
      ),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
    }),
  ],
  providers: [FirestoreListenerService, SchedulerService],
})
export class FirebaseAppModule {}
