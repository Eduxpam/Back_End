import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title = 'Login';
  loading = false;
  usuario = '';
  senha = '';
  msgerro = '';
  constructor(
    private authService: AuthService,
    private route: Router
  ) { }

  ngOnInit() {
    if (this.authService.user != null) {
      this.route.navigate(['/produto']);
    }
  }

  entrar() {
    if (this.usuario === '') {
      this.msgerro = 'Informe o usuário!';
      return;
    } else if (this.senha === '') {
      this.msgerro = 'Informe a senha!';
      return;
    }
    this.loading = !this.loading;
    this.verificaLogin();
  }

  verificaLogin() {
    const data = {
      usuario: this.usuario.toLocaleUpperCase(),
      senha: this.senha
    };
    this.authService.checkuser(data).subscribe(
      res => {
        console.log(res);
        if ( res['codigo'] != -1) {
          this.authService.user = res;
          this.loading = false;
          this.route.navigate(['/produto']);
        } else {
          this.msgerro = 'Usuário ou senha inválido!';
          this.loading = false;
        }
      },
      err => {
        this.msgerro = 'Sem comunicação com a API, se persistir o erro entre em contato com o setor responsável';
        this.loading = false;
        console.log(err);
      }
    );
  }


}
