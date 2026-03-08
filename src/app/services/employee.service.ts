import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    private apiUrl = 'assets/data/employees.json';
    private employeesSubject = new BehaviorSubject<Employee[]>([]);
    employees$ = this.employeesSubject.asObservable();

    constructor(private http: HttpClient) {
        this.loadInitialData();
    }

    private loadInitialData(): void {
        this.http.get<Employee[]>(this.apiUrl).subscribe(data => {
            this.employeesSubject.next(data);
        });
    }

    getEmployees(): Observable<Employee[]> {
        return this.employees$;
    }

    getEmployeeById(id: number): Observable<Employee | undefined> {
        return this.employees$.pipe(
            map(employees => employees.find(e => e.id === id))
        );
    }

    addEmployee(employee: Employee): void {
        const currentEmployees = this.employeesSubject.value;
        const nextId = currentEmployees.length > 0
            ? Math.max(...currentEmployees.map(e => e.id)) + 1
            : 1;
        const newEmployee = { ...employee, id: nextId };
        this.employeesSubject.next([...currentEmployees, newEmployee]);
    }

    updateEmployee(updatedEmployee: Employee): void {
        const currentEmployees = this.employeesSubject.value;
        const updatedEmployees = currentEmployees.map(e =>
            e.id === updatedEmployee.id ? { ...updatedEmployee } : e
        );
        this.employeesSubject.next(updatedEmployees);
    }

    deleteEmployee(id: number): void {
        const currentEmployees = this.employeesSubject.value;
        const updatedEmployees = currentEmployees.filter(e => e.id !== id);
        this.employeesSubject.next(updatedEmployees);
    }
}
