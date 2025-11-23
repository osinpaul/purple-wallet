import { AuthStoreService } from './../services/auth-store.service';
import { inject } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { HttpInterceptorFn } from '@angular/common/http';

export const authIterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const authStore = inject(AuthStoreService);
  const isAuthenticated = authService.isAuthenticated$.getValue();

  if (!isAuthenticated) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authStore.getValue('token')}`,
    },
  });

  return next(authReq);
};
