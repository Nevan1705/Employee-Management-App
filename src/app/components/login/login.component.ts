import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  template: `
    <div class="login-page">
      <div class="animated-bg"></div>
      <mat-card class="login-card glass-card">
        <mat-card-header>
          <mat-card-title>Enterprise Login</mat-card-title>
          <mat-card-subtitle>Access your workspace</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="loginForm" (ngSubmit)="onLogin()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email Address</mat-label>
              <input matInput formControlName="email" placeholder="admin@lnt.com">
              <mat-icon matPrefix>email</mat-icon>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Password</mat-label>
              <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="password">
              <mat-icon matPrefix>lock</mat-icon>
              <button mat-icon-button matSuffix (click)="hidePassword = !hidePassword" type="button">
                <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
            </mat-form-field>

            <button mat-raised-button color="primary" class="full-width login-btn" [disabled]="loginForm.invalid">
              Sign In
            </button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .login-page {
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      overflow: hidden;
    }
    .animated-bg {
      position: absolute;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle at 50% 50%, #6366f1 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, #06b6d4 0%, transparent 40%);
      animation: rotate 20s linear infinite;
      z-index: -1;
      opacity: 0.4;
    }
    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .login-card {
      width: 100%;
      max-width: 400px;
      padding: 20px;
    }
    .login-btn {
      height: 50px;
      margin-top: 20px;
      font-size: 1.1rem;
      border-radius: 8px;
    }
    mat-card-title {
      font-size: 1.8rem;
      margin-bottom: 8px;
      font-weight: 700;
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['admin@lnt.com', [Validators.required, Validators.email]],
      password: ['password123', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin(): void {
    const { email, password } = this.loginForm.value;
    const correctEmail = 'admin@lnt.com';
    const correctPassword = 'password123';

    if (this.loginForm.valid) {
      if (email === correctEmail && password === correctPassword) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        this.snackBar.open('Login Successful!', 'Close', { duration: 3000 });
        this.router.navigate(['/dashboard']);
      } else {
        this.snackBar.open('Invalid Credentials! Please use correct email and password.', 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    }
  }
}
