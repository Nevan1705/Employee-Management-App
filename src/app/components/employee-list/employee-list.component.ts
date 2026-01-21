import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  displayedColumns: string[] = ['id', 'name', 'role', 'department', 'salary', 'actions'];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
    });
  }

  deleteEmployee(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id);
    }
  }
}
