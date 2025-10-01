import { Component, OnInit, OnDestroy, ViewChild, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { ConsultoresService } from '../../services/consultores.service';
import { Consultor } from '../../models/consultor';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-consultores-lista',
  standalone: true,
  imports: [
    CommonModule,
    // Material
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  templateUrl: './consultores-lista.component.html',
  styleUrls: ['./consultores-lista.component.scss'],
})
export class ConsultoresListaComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<Consultor>([]);
  displayedColumns: string[] = ['nome', 'email', 'telefone'];
  isAdmin = false;

  private subscription!: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private consultoresService: ConsultoresService,
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.temPerfil('admin');
    if (this.isAdmin) {
      this.displayedColumns = [...this.displayedColumns, 'acoes'];
    }
    this.loadConsultores();

    // Filtro em múltiplas colunas
    this.dataSource.filterPredicate = (data, filter) => {
      const f = filter.trim().toLowerCase();
      return (
        (data.nome || '').toLowerCase().includes(f) ||
        (data.email || '').toLowerCase().includes(f) ||
        (data.telefone || '').toLowerCase().includes(f)
      );
    };
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  loadConsultores() {
    this.subscription = this.consultoresService.listar().subscribe((data) => {
      this.dataSource.data = data || [];
      // Conecta paginator/sort quando os ViewChilds já existem
      if (this.paginator) this.dataSource.paginator = this.paginator;
      if (this.sort) this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value || '';
    this.dataSource.filter = value.trim().toLowerCase();
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  clearFilter() {
    this.dataSource.filter = '';
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  editar(id: number) {
    this.router.navigate(['/consultores/editar', id]);
  }

  confirmarExclusao(c: Consultor) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: '360px',
      data: {
        titulo: 'Excluir consultor',
        mensagem: `Tem certeza que deseja excluir "${c.nome}"?`,
        confirmarTexto: 'Excluir',
        cancelarTexto: 'Cancelar',
      },
    });

    ref.afterClosed().subscribe((ok) => {
      if (ok) {
        this.excluir(c.id);
      }
    });
  }

  excluir(id: number) {
    this.consultoresService.excluir(id).subscribe({
      next: () => this.snack.open('Consultor excluído.', 'Fechar', { duration: 2500 }),
      error: () => this.snack.open('Erro ao excluir.', 'Fechar', { duration: 3000 }),
    });
  }

  adicionar() {
    this.router.navigate(['/consultores/novo']);
  }
}

/** Dialog de confirmação (standalone) */
@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <h2 mat-dialog-title>{{ data.titulo }}</h2>
    <div mat-dialog-content>
      <p>{{ data.mensagem }}</p>
    </div>
    <div mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>{{ data.cancelarTexto || 'Cancelar' }}</button>
      <button mat-flat-button color="warn" [mat-dialog-close]="true">
        <mat-icon>delete</mat-icon>
        {{ data.confirmarTexto || 'Confirmar' }}
      </button>
    </div>
  `,
})
export class ConfirmDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { titulo: string; mensagem: string; confirmarTexto?: string; cancelarTexto?: string },
    public ref: MatDialogRef<ConfirmDialogComponent>
  ) {}
}
