import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { AktieOverview } from '../aktie-overview/aktie-overview';
import { AktienService } from '../aktien-service';
import { BoughtAktie } from '../bought-aktie';

@Component({
  selector: 'app-home',
  imports: [DecimalPipe, AktieOverview],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  boughtAktien: BoughtAktie[] = [];
  totalValue = 0;
  totalInvested = 0;

  private aktienService = inject(AktienService);

  constructor() {
    this.boughtAktien = this.aktienService.getBoughtAktien();

    for (const bought of this.boughtAktien) {
      const aktie = this.aktienService.getAktieByID(bought.aktieId);
      if (aktie) {
        this.totalValue += aktie.aktuellerKurs * bought.anzahl;
      }
      this.totalInvested += bought.kaufPreis * bought.anzahl;
    }
  }

  get totalChangeAbs(): number {
    return this.totalValue - this.totalInvested;
  }

  get totalChangePct(): number {
    return this.totalInvested ? (this.totalChangeAbs / this.totalInvested) * 100 : 0;
  }
}
