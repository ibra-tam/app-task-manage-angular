import { Injectable } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, of, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  baseUrl = environment.fireConfig;

  public currentUser = new BehaviorSubject<User | null>(null);

  currentUser$ = this.currentUser.asObservable();
  public currentUserOnLocalStorage!: User;

  constructor(private auth_: AngularFireAuth) { 
    this.auth_.onAuthStateChanged(user => {
      this.currentUser.next(user);
      user?.getIdToken().then(token => {
        localStorage.setItem('token', token);
    })
    }, console.error);
  }


  register(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.auth_.createUserWithEmailAndPassword(email, password).then(user => {
        resolve(user);
      }).catch(reject)
    });
  }

  login(email: string, password: string): Promise<any> {
    console.log('login here');
    return new Promise((resolve, reject) => {
      this.auth_.signInWithEmailAndPassword(email, password).then(
        user => {
          resolve(user);
         user.user?.getIdToken().then(token => {
            localStorage.setItem('token', token);
        })
      }).catch(reject);
    });
}

  logout(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.auth_.signOut().then(() => {
        this.currentUser.next(null);
        localStorage.removeItem('token');
        this
        resolve();
      }).catch(reject);
    });
  }

}
