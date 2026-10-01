import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError(err => {
      console.error(
        `HTTP Error | URL: ${req.url} | Message: ${err.message}`
      );

      return throwError(() => err);
    })
  );
};