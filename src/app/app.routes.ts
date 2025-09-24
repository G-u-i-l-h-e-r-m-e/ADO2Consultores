import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ConsultoresListaComponent } from './pages/consultores-lista/consultores-lista.component';
import { ConsultoresFormComponent } from './pages/consultores-form/consultores-form.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'consultores',
    component: ConsultoresListaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'consultores/novo',
    component: ConsultoresFormComponent,
    canActivate: [AuthGuard],
    data: { perfil: 'admin' }
  },
  {
    path: 'consultores/editar/:id',
    component: ConsultoresFormComponent,
    canActivate: [AuthGuard],
    data: { perfil: 'admin' }
  },
  {
    path: 'sobre',
    component: SobreComponent,
    canActivate: [AuthGuard]
  }
];