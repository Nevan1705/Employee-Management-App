import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    private mockEmployees: Employee[] = [
        { id: 1, name: 'Aarav Sharma', role: 'Developer', department: 'IT', salary: 75000 },
        { id: 2, name: 'Diya Patel', role: 'Manager', department: 'HR', salary: 85000 },
        { id: 3, name: 'Vihaan Singh', role: 'Designer', department: 'Marketing', salary: 70000 },
        { id: 4, name: 'Ananya Gupta', role: 'Developer', department: 'IT', salary: 78000 },
        { id: 5, name: 'Rohan Kumar', role: 'Analyst', department: 'Finance', salary: 72000 }
    ];

    private employeesSubject = new BehaviorSubject<Employee[]>(this.mockEmployees);
    employees$ = this.employeesSubject.asObservable();

    constructor() { }

    getEmployees(): Observable<Employee[]> {
        return this.employees$;
    }

    getEmployeeById(id: number): Observable<Employee | undefined> {
        const employee = this.mockEmployees.find(e => e.id === id);
        return of(employee);
    }

    addEmployee(employee: Employee): void {
        employee.id = this.mockEmployees.length > 0 ? Math.max(...this.mockEmployees.map(e => e.id)) + 1 : 1;
        this.mockEmployees.push(employee);
        this.employeesSubject.next([...this.mockEmployees]);
    }

    updateEmployee(updatedEmployee: Employee): void {
        const index = this.mockEmployees.findIndex(e => e.id === updatedEmployee.id);
        if (index !== -1) {
            this.mockEmployees[index] = updatedEmployee;
            this.employeesSubject.next([...this.mockEmployees]);
        }
    }

    deleteEmployee(id: number): void {
        this.mockEmployees = this.mockEmployees.filter(e => e.id !== id);
        this.employeesSubject.next([...this.mockEmployees]);
    }
}
