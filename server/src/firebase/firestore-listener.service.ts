import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase'
import { Injectable } from '@nestjs/common'

@Injectable()
export class FirestoreListenerService {
  constructor(
    @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
  ) {}

  startFirestoreListener() {
    const firestore = this.firebase.firestore
    const timersCollection = firestore.collection('timers')

    timersCollection.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          console.log('Document added:', change.doc.data())
          // Handle document creation
        } else if (change.type === 'modified') {
          console.log('Document modified:', change.doc.data())
          // Handle document modification
        } else if (change.type === 'removed') {
          console.log('Document removed:', change.doc.data())
          // Handle document deletion
        }
      })
    })
  }
}
