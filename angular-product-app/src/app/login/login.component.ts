import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private logger: NGXLogger) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    const { email, password } = this.loginForm.value;
    if (email === 'user@demo.com' && password === '123456') {
      localStorage.setItem('user', 'logged_in');
      this.logger.debug('Login successful');
      this.router.navigate(['/product-list']);
    } else {
      this.logger.error('Invalid credentials');
    }
  }
}
