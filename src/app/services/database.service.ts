import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat';

type CollentionPredicate<t> = string | AngularFirestoreCollection;

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor( private afs:AngularFirestore) { }

  col<t>(ref:CollentionPredicate<t>, queryFn?: undefined): AngularFirestoreCollection{
    return typeof ref === "string"? this.afs.collection(ref): ref;
    
  }

  add<t>(ref:CollentionPredicate<t>, data: firebase.firestore.DocumentData){
    return this.col(ref).add({
      ...data
    })
  }
}
