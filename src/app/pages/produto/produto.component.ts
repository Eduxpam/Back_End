import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProdutoService } from 'src/app/service/produto.service';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { ProdutoUpdateComponent } from './update/update.component';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {

  panelOpenState = false;
  loading = false;
  database = [];
  defaultClass = 'btn btn-outline-info page-link';
  activeClass = 'btn btn-outline-info page-link active';
  loadingData = true;
  tipoFiltro = '0';
  valorFiltro = '';
  chkAtivos = true;
  chkInativos = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private produtoService: ProdutoService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    if (this.authService.user == null) {
      this.router.navigate(['/login']);
    } else {
      this.getAll(-1);
    }
  }


  getAll(tipoBusca?: number) {
    if (tipoBusca == -1 ) {
      this.valorFiltro = '';
    } else if (this.tipoFiltro == '0') {
      if (this.valorFiltro.trim().length < 3 && this.valorFiltro.trim().length > 0) {
        return;
      }
    } else if (this.tipoFiltro == '1') {
      if (this.valorFiltro.trim() == '') {
        this.getAll(-1);
        return;
      }
    }

    this.loadingData = true;
    this.database = [];
    const filtro = {
      tipo: (tipoBusca == -1) ? '2' : this.tipoFiltro,
      valor: this.valorFiltro,
      ativo: (this.chkAtivos && this.chkInativos) ? 'T' : (this.chkAtivos) ? 'S' : 'N'
    };
    this.produtoService.getAll(filtro).subscribe( (res: any) => {
      console.log(res);
      if (res['status'] == 200) {
        this.database = res['data'];
      }
      this.loadingData = false;
    }, err => { this.showDialog('Falha na comunicação'); this.loadingData = false; });
  }

  limpaFiltro() {
    if (this.tipoFiltro == '') {
      this.getAll(-1);
    }
    this.valorFiltro = '';
  }

  create(data: any) {
    this.loading = true;
    this.produtoService.create(data).subscribe( (res: any) => {
      this.loading = false;
      this.showDialog(res['message']);
      this.getAll(-1);
    }, err => { this.showDialog('Falha na comunicação'); });
  }

  update(item: any) {
    const dialogRef = this.dialog.open(ProdutoUpdateComponent, {
      width: '500px',
      data: item
    });

    dialogRef.afterClosed().subscribe( (result: any) => {
      if ( result == 'c') {
      } else if ( result == 'e') {
        this.produtoService.excluir(item['codigo']).subscribe( (res: any) => {
          this.showDialog(res['message']);
          this.getAll(-1);
        },
        erro => {
          this.showDialog('Não foi possível realizar a exclusão!');
        });
      } else {
        this.produtoService.update(result).subscribe( (res: any) => {
          if (res['status'] == 200) {
            this.showDialog(res['message']);
            this.getAll(-1);
          }
        }, err => { this.showDialog('Falha na comunicação'); });
      }
    });
  }

  showDialog(text: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {message: text}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }

  showForm() {
    this.panelOpenState = !this.panelOpenState;
  }

}
