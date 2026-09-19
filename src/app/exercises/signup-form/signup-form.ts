import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlockSpecialChars } from '../../directives/block-special-chars';
import { RouterLink } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule, BlockSpecialChars, RouterLink],
  standalone: true,
  selector: 'app-signup-form',
  templateUrl: './signup-form.html',
})
export class SignupForm {

  signupForm = new FormGroup({

    fullName: new FormControl('',[
      Validators.required,
    ]),

    email: new FormControl('',[

      Validators.required,
      Validators.email
    ]),

    password: new FormControl('',[
      Validators.required,
      Validators.minLength(6)
    ]),

    confirmPassword: new FormControl('',[
      Validators.required
    ])

  });

  submit(): void{
    if(this.signupForm.valid){
      console.log(this.signupForm.value);
    }
  }
}
