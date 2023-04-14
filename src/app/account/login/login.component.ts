import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  
  public loginForm!: FormGroup;
  public returnUrl!: string;

  constructor(private accountService: AuthService, private router: Router, private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    //this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/dashbord';
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.email),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmitLogin() {
    this.accountService.login(this.loginForm.value.email, this.loginForm.value.password).then((user) => {
      console.log('user is connected', user);
      this.router.navigate(['dashboard'])
    }).catch(console.error);

  }

}
