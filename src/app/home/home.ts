import { Component, inject } from '@angular/core';
<<<<<<< HEAD
import { DecimalPipe } from '@angular/common';
=======
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
>>>>>>> c1ee9e57a1c36ab2565153b91d0e2fed75f12039
import { AktieOverview } from '../aktie-overview/aktie-overview';
import { AktienService } from '../aktien-service';
import { BoughtAktie } from '../bought-aktie';

@Component({
  selector: 'app-home',
<<<<<<< HEAD
  imports: [DecimalPipe, AktieOverview],
=======
  imports: [CommonModule, AktieOverview, RouterLink],
>>>>>>> c1ee9e57a1c36ab2565153b91d0e2fed75f12039
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
