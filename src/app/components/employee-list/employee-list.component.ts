import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { DeleteConfirmDialogComponent } from '../delete-confirm-dialog/delete-confirm-dialog.component';
import { DepartmentFilterPipe } from '../../pipes/department-filter.pipe';
import { HighlightSalaryDirective } from '../../directives/highlight-salary.directive';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatTooltipModule,
    FormsModule,
    RouterLink,
    DepartmentFilterPipe,
    HighlightSalaryDirective
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Employee>([]);
  displayedColumns: string[] = ['id', 'name', 'role', 'department', 'salary', 'actions'];

  departments: string[] = ['All', 'IT', 'HR', 'Marketing', 'Finance', 'Operations'];
  selectedDepartment: string = 'All';
  searchQuery: string = '';

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(data => {
      this.dataSource.data = data;
      this.applyFilters();
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilters(): void {
    // Custom filter logic
    this.dataSource.filterPredicate = (data: Employee, filter: string) => {
      const searchTerms = JSON.parse(filter);
      const matchesSearch = data.name.toLowerCase().includes(searchTerms.query) ||
        data.role.toLowerCase().includes(searchTerms.query);
      const matchesDept = searchTerms.dept === 'All' || data.department === searchTerms.dept;
      return matchesSearch && matchesDept;
    };

    const filterValue = {
      query: this.searchQuery.trim().toLowerCase(),
      dept: this.selectedDepartment
    };

    this.dataSource.filter = JSON.stringify(filterValue);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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

  exportToCSV(): void {
    const data = this.dataSource.filteredData;
    const csvContent = "data:text/csv;charset=utf-8,"
      + ["ID,Name,Email,Role,Department,Salary"]
        .concat(data.map(e => `${e.id},${e.name},${e.email},${e.role},${e.department},${e.salary}`))
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `workforce_export_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
