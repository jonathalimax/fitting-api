import { Module } from '@nestjs/common'
import { FirebaseModule } from 'nestjs-firebase'
import * as path from 'path'

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
})
export class FirebaseAppModule {}
