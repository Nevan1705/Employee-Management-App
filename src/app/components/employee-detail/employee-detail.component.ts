import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    RouterLink
  ],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.css'
})
export class EmployeeDetailComponent implements OnInit {
  employeeForm: FormGroup;
  isEditMode = false;
  employeeId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      role: ['', Validators.required],
      department: ['', Validators.required],
      salary: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.employeeId = +id;
        this.loadEmployee(this.employeeId);
      }
    });
  }

  loadEmployee(id: number): void {
    this.employeeService.getEmployeeById(id).subscribe(employee => {
      if (employee) {
        this.employeeForm.patchValue(employee);
      }
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const employeeData: Employee = {
        id: this.employeeId ? this.employeeId : 0, // ID will be handled by service for new
        ...this.employeeForm.value
      };

      if (this.isEditMode) {
        this.employeeService.updateEmployee(employeeData);
      } else {
        this.employeeService.addEmployee(employeeData);
      }
      this.router.navigate(['/employees']);
    }
  }
}
