import { Component, inject } from '@angular/core';
import { AsyncPipe, DatePipe, DecimalPipe } from '@angular/common';
import { forkJoin, map, Observable, of } from 'rxjs';
import { AktieOverview } from '../aktie-overview/aktie-overview';
import { AktienService } from '../aktien-service';
import { BoughtAktie } from '../bought-aktie';
import { RealisierteAktie } from '../realisierte-aktie';

@Component({
  selector: 'app-home',
  imports: [DecimalPipe, DatePipe, AsyncPipe, AktieOverview],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private aktienService = inject(AktienService);

  boughtAktien$: Observable<BoughtAktie[]> = of([]);
  totalInvested = 0;

  totalValue$: Observable<number> = of(0);

  realisierteAktien$: Observable<RealisierteAktie[]> = of([]);
  totalRealisiert = 0;

  constructor() {
    this.reload();
  }

  reload(): void {
    this.totalInvested = 0;
    this.boughtAktien$ = this.aktienService.getBoughtAktien();

    this.boughtAktien$.subscribe(boughtAktien => {
      for (const bought of boughtAktien) {
        this.totalInvested += bought.investiert;
      }

      this.totalValue$ = boughtAktien.length
        ? forkJoin(
            boughtAktien.map(bought =>
              this.aktienService.quoteAktie(bought.aktieId).pipe(
                map(aktie => bought.investiert + this.aktienService.berechneGewinn(bought, aktie.aktuellerKurs))
              )
            )
          ).pipe(map(werte => werte.reduce((summe, wert) => summe + wert, 0)))
        : of(0);
    });

    this.realisierteAktien$ = this.aktienService.getRealisierteAktien();
    this.realisierteAktien$.subscribe(verkaeufe => {
      this.totalRealisiert = verkaeufe.reduce((summe, v) => summe + v.gewinn, 0);
    });
  }

  totalChangeAbs(totalValue: number): number {
    return totalValue - this.totalInvested;
  }

  totalChangePct(totalValue: number): number {
    return this.totalInvested ? (this.totalChangeAbs(totalValue) / this.totalInvested) * 100 : 0;
  }
}
