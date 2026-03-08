# Employee Management App

A modern Angular application for managing employee data with a premium UI using Angular Material.

## Features

- **Services & Routing**: centralized `EmployeeService` with `HttpClient` and `BehaviorSubject`. Dynamic routing with `AuthGuard`.
- **Pipes & Directives**:
  - `DepartmentFilterPipe`: Filter employees by department.
  - `HighlightSalaryDirective`: Automatically highlight high-earners (> 80,000 INR).
  - Built-in Currency and Date pipes.
- **Reactive Forms**: Robust validation for employee creation/editing, including email regex and range checks.
- **Material UI**: Implementation of `MatTable`, `MatDialog`, `MatCard`, `MatToolbar`, and more.
- **HTTP Interceptor**: Logging for all API requests.

## Architecture

```mermaid
graph TD
    App[App Component] --> Navbar[Navbar Component]
    App --> Router[Angular Router]
    Router --> Home[Home Component]
    Router --> List[Employee List Component]
    Router --> Detail[Employee Detail Component]
    List --> Service[Employee Service]
    Detail --> Service
    Service --> JSON[(employees.json)]
    List --> Pipe[Department Filter Pipe]
    List --> Directive[Highlight Salary Directive]
    List --> Dialog[Delete Confirm Dialog]
```

## Setup Instructions

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Locally**:
   ```bash
   npm run start
   ```
   The app will be available at `http://localhost:4200`.

3. **Build**:
   ```bash
   npm run build
   ```
