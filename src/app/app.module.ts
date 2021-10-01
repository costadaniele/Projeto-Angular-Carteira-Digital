import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';

import { DanieleCurrencyComponent } from './daniele-currency/daniele-currency.component';
import { DanieleWalletComponent } from './daniele-wallet/daniele-wallet.component';

import { RouterModule } from '@angular/router';
import { DanieleWalletService } from './daniele-wallet.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule,

    RouterModule.forRoot ([ 
      { path:  'daniele-currency', component: DanieleCurrencyComponent },
      { path:  'daniele-wallet', component: DanieleWalletComponent }, 
    ]) 
  ],

  declarations: [ AppComponent, HelloComponent, DanieleCurrencyComponent, DanieleWalletComponent ],
  bootstrap:    [ AppComponent ],
  providers: [DanieleWalletService]
})
export class AppModule { }
