import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consultor } from '../models/consultor';

@Injectable({
  providedIn: 'root'
})
export class ConsultoresService {

  private apiUrl = 'http://localhost:3000/consultores';

  constructor(private http: HttpClient) {}

  listar(): Observable<Consultor[]> {
    return this.http.get<Consultor[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Consultor> {
    return this.http.get<Consultor>(`${this.apiUrl}/${id}`);
  }

  adicionar(consultor: Consultor): Observable<Consultor> {
    return this.http.post<Consultor>(this.apiUrl, consultor);
  }

  editar(id: number, consultor: Consultor): Observable<Consultor> {
    return this.http.put<Consultor>(`${this.apiUrl}/${id}`, consultor);
  }

  excluir(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
