import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Response {
  time: {
    updated: string;
  };
  disclaimer: string;
  bpi: {
    [key in 'USD' | 'EUR']: {
      symbol: string;
      description: string;
      rate_float: number;
      rate: string;
    };
  };
}

interface PriceUpdate {
  timestamp: Date;
  EUR: number;
  USD: number;
}

@Injectable()
export class DanieleWalletService {
  currentPrice: Response;
  lastUpdate: Date;
  saldo: number;
  valorAtualUSD!: number;
  valorAtualEUR!: number;
  ultimaUSD!: number;
  ultimaEUR!: number;

  updateList: Array<PriceUpdate> = [];

  constructor(private http: HttpClient) {
    this.saldo = 10;
  }

  update() {
    this.http
      .get<Response>('https://api.coindesk.com/v1/bpi/currentprice.json')
      .subscribe((data) => {
        this.lastUpdate = new Date();
        this.currentPrice = data;
        this.setValorAtualUSD();
        this.setValorAtualEUR();
        this.compareUSD();
        this.compareEUR();
        this.ultimaUSD = this.currentPrice.bpi.USD.rate_float;
        this.ultimaEUR = this.currentPrice.bpi.EUR.rate_float;
        this.updateList.push({
          timestamp: this.lastUpdate,
          USD: this.currentPrice.bpi.USD.rate_float,
          EUR: this.currentPrice.bpi.EUR.rate_float,
        });
      });
  }

  private timer: any;
  private counter = 60;

  start(ms: number) {
    if (!this.timer) {
      this.timer = setInterval(() => {
        this.counter--;
        if (this.counter == 0) {
          this.update();
          this.counter = 60;
        }
      }, ms);
    }
  }

  getCount() {
    return this.counter;
  }

  setValorAtualUSD() {
    if (this.valorAtualUSD === undefined) {
      this.valorAtualUSD = this.currentPrice.bpi.USD.rate_float;
    }
  }

  setValorAtualEUR() {
    if (this.valorAtualEUR === undefined) {
      this.valorAtualEUR = this.currentPrice.bpi.EUR.rate_float;
    }
  }

  compareUSD() {
    if (this.ultimaUSD > this.valorAtualUSD) {
      return ' ↑ ';
    } else if (this.ultimaUSD < this.valorAtualUSD) {
      return ' ↓ ';
    } else {
      return ' - ';
    }
  }

  compareEUR() {
    if (this.ultimaEUR > this.valorAtualEUR) {
      return ' ↑ ';
    } else if (this.ultimaEUR < this.valorAtualEUR) {
      return ' ↓ ';
    } else {
      return ' - ';
    }
  }
}
