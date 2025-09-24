import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarios: Usuario[] = [
    { email: 'admin@empresa.com', senha: 'admin123', perfil: 'admin' },
    { email: 'user@empresa.com', senha: 'user123', perfil: 'user' }
  ];

  private usuarioLogadoSubject = new BehaviorSubject<Usuario | null>(null);
  usuarioLogado$: Observable<Usuario | null> = this.usuarioLogadoSubject.asObservable();

  login(email: string, senha: string): Observable<boolean> {
    const user = this.usuarios.find(u => u.email === email && u.senha === senha);
    if (user) {
      this.usuarioLogadoSubject.next(user);
      return of(true);
    }
    return of(false);
  }

  logout() {
    this.usuarioLogadoSubject.next(null);
  }

  getUsuario(): Usuario | null {
    return this.usuarioLogadoSubject.value;
  }

  isLoggedIn(): boolean {
    return this.usuarioLogadoSubject.value !== null;
  }

  temPerfil(perfil: 'admin' | 'user'): boolean {
    const user = this.usuarioLogadoSubject.value;
    if (!user) return false;
    if (perfil === 'user') return true; // user pode ver
    return user.perfil === perfil;
  }
}
