import { Component, OnInit } from '@angular/core';
import { DanieleWalletService } from '../daniele-wallet.service';

@Component({
  selector: 'app-daniele-currency',
  templateUrl: './daniele-currency.component.html',
  styleUrls: ['./daniele-currency.component.css'],
})
export class DanieleCurrencyComponent implements OnInit {
  constructor(public danieleWalletService: DanieleWalletService) {}

  ngOnInit() {}
  getCurrentPrice() {
    return this.danieleWalletService.currentPrice;
  }

  update() {
    this.danieleWalletService.update();
  }
}
