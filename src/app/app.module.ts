// import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ProdutoComponent } from './pages/produto/produto.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';

import { NavComponent } from './components/nav/nav.component';
import { ProdutoFormComponent } from './pages/produto/form/form.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { ProdutoUpdateComponent } from './pages/produto/update/update.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { NgxMaskModule, IConfig } from 'ngx-mask';
import { CurrencyMaskInputMode,NgxCurrencyModule } from 'ngx-currency';

import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localePt);

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

export const customCurrencyMaskConfig = {
  align: 'right',
  allowNegative: true,
  allowZero: true,
  decimal: ',',
  precision: 2,
  prefix: 'R$ ',
  suffix: '',
  thousands: '.',
  nullable: true,
  min: null,
  max: null,
  inputMode: CurrencyMaskInputMode.FINANCIAL
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProdutoComponent,
    NavComponent,
    ProdutoFormComponent,
    DialogComponent,
    ProdutoUpdateComponent
  ],
  imports: [
    NgbCollapseModule,
    HttpClientModule,
    MatDialogModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxMaskModule.forRoot(),
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig)
  ],
  entryComponents: [
    DialogComponent,
    ProdutoUpdateComponent
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    // { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
