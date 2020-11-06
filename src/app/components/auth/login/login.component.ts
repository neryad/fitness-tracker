import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginFrom: FormGroup;
  constructor(private authServices: AuthService) {}

  ngOnInit(): void {
    this.loginFrom = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', { validators: [Validators.required] }),
    });
  }
  onSubmit() {
    this.authServices.login({
      email: this.loginFrom.value.email,
      password: this.loginFrom.value.password,
    });
    console.log(this.loginFrom);
  }
}
