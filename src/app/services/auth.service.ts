import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { Subject } from 'rxjs';
import { DataStorageService } from './data-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  token!: string;
  constructor(private router: Router) {}

  signupUser(email: string, password: string) {
    createUserWithEmailAndPassword(getAuth(), email, password)
      .then((userCredential) => {
        userCredential.user
          .getIdToken()
          .then((token: string) => (this.token = token));
        this.router.navigate(['/recipes']);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  signinUser(email: string, password: string) {
    signInWithEmailAndPassword(getAuth(), email, password)
      .then((userCredential) => {
        userCredential.user
          .getIdToken()
          .then((token: string) => (this.token = token));
        this.router.navigate(['/recipes']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  }

  signoutUser() {
    signOut(getAuth())
      .then(() => {
        this.token = null;
        console.log('User has been successfully logged out.');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getToken() {
    getAuth()
      .currentUser.getIdToken()
      .then((token: string) => (this.token = token));
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }
}
