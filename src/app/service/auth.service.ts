import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_API } from './api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = null;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }


  checkuser(data: any) {
    // return this.http.post(`${URL_API}/login/`, data);
    // return this.http.post(URL_API + '/login/', data);
    return this.http.post('http://192.168.0.21:5000/vendas/login/', data);
  }

  logout() {
    this.user = null;
    this.router.navigate(['/login']);
  }
}
