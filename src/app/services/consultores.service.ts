import { Injectable } from '@angular/core';
import { Consultor } from '../models/consultor';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultoresService {
  private consultores: Consultor[] = [
    { id: 1, nome: 'João Silva', email: 'joao@exemplo.com', telefone: '123456789' },
    { id: 2, nome: 'Maria Oliveira', email: 'maria@exemplo.com', telefone: '987654321' }
  ];

  private consultoresSubject = new BehaviorSubject<Consultor[]>(this.consultores);
  public consultores$ = this.consultoresSubject.asObservable();

  listar(): Observable<Consultor[]> {
    return this.consultores$;
  }

  buscarPorId(id: number): Observable<Consultor | undefined> {
    const consultor = this.consultores.find(c => c.id === id);
    return new BehaviorSubject(consultor).asObservable();
  }

  adicionar(consultor: Consultor): Observable<void> {
    consultor.id = this.gerarId();
    this.consultores.push(consultor);
    this.consultoresSubject.next([...this.consultores]); // Força atualização
    return new BehaviorSubject(void 0).asObservable();
  }

  editar(consultor: Consultor): Observable<void> {
    const index = this.consultores.findIndex(c => c.id === consultor.id);
    if (index > -1) {
      this.consultores[index] = { ...consultor };
      this.consultoresSubject.next([...this.consultores]); // Força atualização
    }
    return new BehaviorSubject(void 0).asObservable();
  }

  excluir(id: number): Observable<void> {
    this.consultores = this.consultores.filter(c => c.id !== id);
    this.consultoresSubject.next([...this.consultores]); // Força atualização
    return new BehaviorSubject(void 0).asObservable();
  }

  private gerarId(): number {
    return this.consultores.length > 0
      ? Math.max(...this.consultores.map(c => c.id)) + 1
      : 1;
  }
}