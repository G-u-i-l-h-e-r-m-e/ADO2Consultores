export interface Usuario {
  email: string;
  senha: string;
  perfil: 'admin' | 'user';
}
