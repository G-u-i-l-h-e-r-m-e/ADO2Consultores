import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ConsultoresService } from '../../services/consultores.service';
import { Consultor } from '../../models/consultor';

@Component({
  selector: 'app-consultores-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './consultores-form.component.html'
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
      telefone: ['']
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
      ...this.form.value
    };

    const operacao = this.editando
      ? this.consultoresService.editar(dados)
      : this.consultoresService.adicionar(dados);

    operacao.subscribe({
      next: () => {
        this.salvando = false;
        // Pequeno delay para garantir que a lista seja atualizada
        setTimeout(() => {
          this.router.navigate(['/consultores']);
        }, 100);
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