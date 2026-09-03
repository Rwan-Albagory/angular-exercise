import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  standalone: true,
  selector: 'app-signup-form',
  templateUrl: './signup-form.html',
})
export class SignupForm {

  user = {
    name: '',
    email: '',
    password: '',
    age: null as number | null
  };
  //Ai part =======================================
  get canSignUp(): boolean{
    return (
      this.user.email.includes('@')||
      this.user.password.length >= 6
    );
  }
}
