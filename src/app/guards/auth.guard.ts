import { Injectable, inject } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    const perfilNecessario = route.data['perfil'] as 'admin' | 'user' | undefined;
    if (perfilNecessario && !this.authService.temPerfil(perfilNecessario)) {
      this.router.navigate(['/consultores']);
      return false;
    }

    return true;
  }
}
