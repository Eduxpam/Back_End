import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_API } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(data) {
    return this.http.post(`${URL_API}/produto/busca/`, data);
  }

  create(data) {
    return this.http.post(`${URL_API}/produto/`, data);
  }

  update(data) {
    return this.http.put(`${URL_API}/produto/`, data);
  }

  excluir(codigo: any) {
    return this.http.get(`${URL_API}/produto/${codigo}`);
  }


}
