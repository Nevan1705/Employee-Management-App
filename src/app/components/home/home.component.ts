import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatButtonModule, RouterLink],
    template: `
    <div class="home-container">
      <mat-card class="welcome-card">
        <mat-card-header>
          <mat-card-title>Welcome to Employee Management</mat-card-title>
          <mat-card-subtitle>Efficiently manage your workforce</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p>This application allows you to track employee details, departments, and salaries with ease.</p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary" routerLink="/employees">View Employee List</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
    styles: [`
    .home-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 80vh;
      padding: 20px;
    }
    .welcome-card {
      max-width: 500px;
      text-align: center;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }
    mat-card-actions {
      justify-content: center;
      margin-top: 20px;
    }
  `]
})
export class HomeComponent { }
