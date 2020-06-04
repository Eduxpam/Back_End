import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class ProdutoFormComponent {


  @Output() formEvent = new EventEmitter();

  form: FormGroup;
  msgcod = '';

  constructor(
    private formBuilder: FormBuilder,
  ) {

    this.form = this.formBuilder.group({
      codigo: ['', Validators.required],
      descri: ['', Validators.required],
      quant: ['', Validators.required],
      preco: ['', Validators.required],
      ativo: ['S', Validators.required],
    });
  }

  onSubmit() {
    this.formEvent.emit(this.form.value);
  }

  validaCod() {
    return true;
  }

  reset() {
    this.form.reset();
    this.form.controls['ativo'].setValue('S');
  }

  ffocus() {
    console.log('focus');
  }

}
