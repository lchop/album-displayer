import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import {} from 'firebase/app';
import { BehaviorSubject, map, Observable } from 'rxjs';

export interface User {
  email: string;
} ;

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  test : User = {email: ""};
  private subject = new BehaviorSubject<User>(null);
  user$ : Observable<User> = this.subject.asObservable();
  isLogIn$: Observable<boolean>;
  isLogOut$: Observable<boolean>;

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
      this.isLogIn$ = this.user$.pipe(map(user => !!user));
      this.isLogOut$ = this.isLogIn$.pipe(map(loggedIn => !loggedIn));
  }

  // Sign in with email/password
  signIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        if (result.user?.email) {
          this.test.email = result.user.email;
          this.subject.next(this.test);
        }      
        return result;
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  signOut() {
    this.afAuth.signOut();
    this.subject.next(null);
  }
    
} 
