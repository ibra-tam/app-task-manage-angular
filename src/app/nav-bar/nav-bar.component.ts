import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy{
  
  currentUserSubscription! : Subscription;
  currentUser!:User;

  constructor(private auth_: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.currentUserSubscription = this.auth_.currentUser$.subscribe({
      next: (user) => {
        this.currentUser = user as User;
      }
    });
  }

  logout(): void {
    this.auth_.logout().then(() => {
      this.router.navigateByUrl('/account/login');
    }).catch(console.error);
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }
}
