import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';

    if (isAuthenticated) {
        return true;
    } else {
        // Redirect to login with the return URL
        router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
};
