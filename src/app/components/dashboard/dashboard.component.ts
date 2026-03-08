import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { DeleteConfirmDialogComponent } from '../delete-confirm-dialog/delete-confirm-dialog.component';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    RouterLink
  ],
  template: `
    <div class="container dashboard-container">
      <div class="welcome-header">
        <h1>Overview</h1>
        <p>Enterprise Management System Insights</p>
      </div>
      
      <div class="bento-grid">
        <!-- Stat Card 1 -->
        <mat-card class="bento-item stat-card glass-card">
          <div class="stat-content">
            <div class="stat-icon primary-bg">
              <mat-icon>people</mat-icon>
            </div>
            <div class="stat-info">
              <h3>{{ (totalEmployees$ | async) }}</h3>
              <p>Total Employees</p>
            </div>
          </div>
        </mat-card>

        <!-- Stat Card 2 -->
        <mat-card class="bento-item stat-card glass-card">
          <div class="stat-content">
            <div class="stat-icon accent-bg">
              <mat-icon>payments</mat-icon>
            </div>
            <div class="stat-info">
              <h3>{{ (avgSalary$ | async) | currency:'INR' }}</h3>
              <p>Average Salary</p>
            </div>
          </div>
        </mat-card>

        <!-- Quick Actions -->
        <mat-card class="bento-item glass-card action-card">
          <mat-card-header>
            <mat-card-title>Quick Access</mat-card-title>
          </mat-card-header>
          <mat-card-content class="action-grid">
            <button mat-flat-button color="primary" routerLink="/employee/add">
              <mat-icon>person_add</mat-icon> Register
            </button>
            <button mat-stroked-button color="accent" routerLink="/employees">
              <mat-icon>list</mat-icon> Directory
            </button>
          </mat-card-content>
        </mat-card>

        <!-- Recent Registrations -->
        <mat-card class="bento-item full-width-card glass-card">
          <mat-card-header>
            <mat-card-title>Recent Registrations</mat-card-title>
            <span class="spacer"></span>
            <button mat-button routerLink="/employees" color="accent">View All</button>
          </mat-card-header>
          <mat-card-content>
            <div class="recent-list">
              <div *ngFor="let emp of (recentEmployees$ | async)" class="recent-row">
                <div class="emp-avatar">{{ emp.name.charAt(0) }}</div>
                <div class="emp-details">
                  <span class="emp-name">{{ emp.name }}</span>
                  <span class="emp-meta">{{ emp.role }} • {{ emp.department }}</span>
                </div>
                <div class="emp-actions">
                  <button mat-icon-button color="primary" [routerLink]="['/employee/edit', emp.id]">
                    <mat-icon>edit</mat-icon>
                  </button>
                  <button mat-icon-button color="warn" (click)="deleteEmployee(emp)">
                    <mat-icon>delete</mat-icon>
                  </button>
                </div>
              </div>
              <div *ngIf="(recentEmployees$ | async)?.length === 0" class="empty-state">
                No recent registrations found.
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container { padding-top: 20px; }
    .welcome-header { margin-bottom: 30px; }
    .welcome-header h1 {
      font-size: 2.5rem;
      margin-bottom: 0;
      background: linear-gradient(to right, #fff, var(--accent-color));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .welcome-header p { color: var(--text-secondary); font-size: 1.1rem; }
    .bento-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }
    .bento-item { padding: 20px; }
    .full-width-card { grid-column: span 3; }
    
    .stat-card .stat-content { display: flex; align-items: center; gap: 20px; }
    .stat-icon {
      width: 60px; height: 60px; border-radius: 12px;
      display: flex; justify-content: center; align-items: center;
    }
    .primary-bg { background: rgba(99, 102, 241, 0.2); color: var(--primary-color); }
    .accent-bg { background: rgba(6, 182, 212, 0.2); color: var(--accent-color); }
    .stat-info h3 { font-size: 2rem; margin: 0; }
    .stat-info p { color: var(--text-secondary); margin: 0; }

    .action-grid {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-top: 15px;
    }
    .action-grid button { height: 45px; border-radius: 8px; font-weight: 600; }

    .recent-list { margin-top: 15px; }
    .recent-row {
      display: flex;
      align-items: center;
      gap: 15px;
      padding: 12px;
      border-radius: 12px;
      transition: background 0.2s;
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    .recent-row:hover { background: rgba(255,255,255,0.03); }
    .recent-row:last-child { border-bottom: none; }
    
    .emp-avatar {
      width: 40px; height: 40px; border-radius: 10px;
      background: var(--primary-color); color: #fff;
      display: flex; justify-content: center; align-items: center;
      font-weight: 700; font-size: 1.2rem;
    }
    .emp-details { flex: 1; display: flex; flex-direction: column; }
    .emp-name { font-weight: 600; color: #fff; }
    .emp-meta { font-size: 0.8rem; color: var(--text-secondary); }
    .emp-actions { display: flex; gap: 5px; }

    .status-detail { display: flex; align-items: center; gap: 10px; color: var(--text-secondary); }
    .empty-state { text-align: center; color: var(--text-secondary); padding: 20px; }
  `]
})
export class DashboardComponent implements OnInit {
  totalEmployees$?: Observable<number>;
  avgSalary$?: Observable<number>;
  recentEmployees$?: Observable<Employee[]>;

  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.totalEmployees$ = this.employeeService.employees$.pipe(
      map(emps => emps.length)
    );

    this.avgSalary$ = this.employeeService.employees$.pipe(
      map(emps => emps.length > 0 ? emps.reduce((acc, curr) => acc + curr.salary, 0) / emps.length : 0)
    );

    this.recentEmployees$ = this.employeeService.employees$.pipe(
      map(emps => [...emps].reverse().slice(0, 4))
    );
  }

  deleteEmployee(employee: Employee): void {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '400px',
      data: { name: employee.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeService.deleteEmployee(employee.id);
      }
    });
  }
}
