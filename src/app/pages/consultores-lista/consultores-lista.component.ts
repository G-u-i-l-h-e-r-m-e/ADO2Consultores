import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultoresService } from '../../services/consultores.service';
import { Consultor } from '../../models/consultor';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-consultores-lista',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consultores-lista.component.html'
})
export class ConsultoresListaComponent implements OnInit, OnDestroy {
  consultores: Consultor[] = [];
  isAdmin = false;
  private subscription!: Subscription;

  constructor(
    private consultoresService: ConsultoresService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.temPerfil('admin');
    this.loadConsultores();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadConsultores() {
    // Subscribe ao observable para receber atualizações automáticas
    this.subscription = this.consultoresService.listar().subscribe(data => {
      this.consultores = data;
    });
  }

  editar(id: number) {
    this.router.navigate(['/consultores/editar', id]);
  }

  excluir(id: number) {
    if (confirm('Deseja realmente excluir este consultor?')) {
      this.consultoresService.excluir(id).subscribe();
      // Não precisa recarregar, o BehaviorSubject já atualiza automaticamente
    }
  }

  adicionar() {
    this.router.navigate(['/consultores/novo']);
  }
}