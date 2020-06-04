import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styles: ['.margbot{margin-bottom: 5px;}', 'label{align-self: center;text-align:end;font-weight: bold;}']
})
export class ProdutoUpdateComponent {


  form: FormGroup;
  msgcep = '';
  msgres = 'Responsável não cadastrado!';
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ProdutoUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.formBuilder.group({
      codigo: [data['codigo'], Validators.required],
      descri: [data['descri'], Validators.required],
      quant: [data['quant'], Validators.required],
      preco: [data['preco'], Validators.required],
      ativo: [data['ativo'], Validators.required],
    });
  }

  salvar() {
    this.dialogRef.close(this.form.value);
  }

  cancelar(): void {
    this.dialogRef.close('c');
  }

  excluir() {
    this.dialogRef.close('e');
  }

  formOk() {
    if (+this.form.controls['quant'].value < 0) {
      return true;
    } else if (this.form.controls['descri'].value.length < 5) {
      return true;
    } else if (this.form.controls['codigo'].value.trim() == '') {
      return true;
    }
    return false;
  }

  validaCod() {
    return ;
  }
}
