import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { User } from 'firebase/auth';
import { from } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private auth: Auth) {}

  login(email: string, senha: string) {
    return from(signInWithEmailAndPassword(this.auth, email, senha));
  }

  logout() {
    return from(signOut(this.auth));
  }

  get usuarioAtual(): User | null {
    return this.auth.currentUser;
  }

  isLoggedIn(): boolean {
    return this.usuarioAtual !== null;
  }
}
