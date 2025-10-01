import { Injectable } from '@angular/core';
import { Consultor } from '../models/consultor';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultoresService {
 private consultores: Consultor[] = [
  { id: 1, nome: 'André Santos', email: 'andre.santos@exemplo.com', telefone: '11955554444' },
  { id: 2, nome: 'Beatriz Nunes', email: 'beatriz.nunes@exemplo.com', telefone: '21944445555' },
  { id: 3, nome: 'Carlos Pereira', email: 'carlos.pereira@exemplo.com', telefone: '11987654321' },
  { id: 4, nome: 'Ana Souza', email: 'ana.souza@exemplo.com', telefone: '21912345678' },
  { id: 5, nome: 'Ricardo Lima', email: 'ricardo.lima@exemplo.com', telefone: '31987654321' },
  { id: 6, nome: 'Fernanda Costa', email: 'fernanda.costa@exemplo.com', telefone: '41912345678' },
  { id: 7, nome: 'Gabriel Almeida', email: 'gabriel.almeida@exemplo.com', telefone: '51987654321' },
  { id: 8, nome: 'Juliana Martins', email: 'juliana.martins@exemplo.com', telefone: '61912345678' },
  { id: 9, nome: 'Rodrigo Ferreira', email: 'rodrigo.ferreira@exemplo.com', telefone: '71987654321' },
  { id: 10, nome: 'Patrícia Gomes', email: 'patricia.gomes@exemplo.com', telefone: '81912345678' },
  { id: 11, nome: 'Lucas Mendes', email: 'lucas.mendes@exemplo.com', telefone: '91987654321' },
  { id: 12, nome: 'Camila Rocha', email: 'camila.rocha@exemplo.com', telefone: '11912349876' }
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