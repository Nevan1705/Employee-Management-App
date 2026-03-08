import { HttpInterceptorFn } from '@angular/common/http';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
    console.log('Request URL: ' + req.url);
    return next(req);
};
