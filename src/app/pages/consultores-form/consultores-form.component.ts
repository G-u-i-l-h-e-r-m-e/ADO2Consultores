import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

/* Angular Material */
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ConsultoresService } from '../../services/consultores.service';
import { Consultor } from '../../models/consultor';

@Component({
  selector: 'app-consultores-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // Material
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './consultores-form.component.html',
  styleUrls: ['./consultores-form.component.scss'], // veja o SCSS abaixo
})
export class ConsultoresFormComponent implements OnInit {
  form!: FormGroup;
  editando = false;
  consultorId!: number;
  salvando = false;

  constructor(
    private fb: FormBuilder,
    private consultoresService: ConsultoresService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      areaEspecializacao: ['', Validators.required],
      dataCadastro: [{ value: new Date().toISOString(), disabled: true }],
    });
    

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.editando = true;
        this.consultorId = +idParam;
        this.loadConsultor(this.consultorId);
      }
    });
  }

  loadConsultor(id: number) {
    this.consultoresService.buscarPorId(id).subscribe(consultor => {
      if (consultor) {
        this.form.patchValue(consultor);
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
  
    this.salvando = true;
  
    const dados: Consultor = {
      id: this.consultorId || 0,
      ...this.form.getRawValue()
    };
  
    const operacao = this.editando
      ? this.consultoresService.editar(this.consultorId, dados)
      : this.consultoresService.adicionar(dados);
  
    operacao.subscribe({
      next: () => {
        this.salvando = false;
        this.router.navigate(['/consultores']);
      },
      error: () => {
        this.salvando = false;
      }
    });
  }
  
  cancelar() {
    this.router.navigate(['/consultores']);
  }
}
