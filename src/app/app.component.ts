import { Component, VERSION } from '@angular/core';
import { DanieleWalletService } from './daniele-wallet.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Projeto Angular - Carteira Digital';

  constructor(public danieleWalletService: DanieleWalletService) {
    this.danieleWalletService.start(1000);
  }
  valorAtualUSD!: number;
  valorAtualEUR!: number;
  ultimaUSD!: number;
  ultimaEUR!: number;

  ngOnInit() {
    this.update();
  }

  getCurrentPrice() {
    return this.danieleWalletService.currentPrice;
  }

  update() {
    this.danieleWalletService.update();
  }

  getCompareUSD() {
    return this.danieleWalletService.compareUSD();
  }

  getCompareEUR() {
    return this.danieleWalletService.compareEUR();
  }
}
