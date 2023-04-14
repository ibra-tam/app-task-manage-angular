import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, timer } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

  public registerForm!: FormGroup;
  public returnUrl!: string 

  constructor(private accountService: AuthService, private fb: FormBuilder,
     private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    //this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/login';
    this.createRegisterForm();
  }


  createRegisterForm() {
    this.registerForm = this.fb.group({
      pseudo: [null, [Validators.required]],
      email: [null,
        [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')],
        //[this.validateEmailNotTaken()]
      ],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]

    });
  }


    onSubmit() : void{
      this.accountService.register(this.registerForm.value.email, this.registerForm.value.password).then(user => {
        if(user)
        this.router.navigateByUrl('/dashboard');
      }, (error: any) => {
        console.log(error);
      });
    }
  }

  

//   validateEmailNotTaken(): AsyncValidatorFn {
//     return control => {
//       return timer(500).pipe(
//         switchMap(() => {
//           if (!control.value) {
//             return of(null);
//           }
//           return this.accountService.checkEmailExist(control.value).pipe(
//             map(res => {
//               return res ? { emailExists: true } : null;
//             })
//           );
//         })
//       );
//     };
//   }
// }
