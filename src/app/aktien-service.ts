import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Aktie } from './aktie';
import { BoughtAktie } from './bought-aktie';
import { HebelType } from './hebel-type';
import { RealisierteAktie } from './realisierte-aktie';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AktienService {
  private http = inject(HttpClient);

  getBoughtAktien(): Observable<BoughtAktie[]> {
    return this.http.get<BoughtAktie[]>("/bought");
  }

  /** Alle laut API kaufbaren Aktien, mit Live-Kursen. */
  getKaufbareAktien(): Observable<Aktie[]> {
    return this.http.get<Aktie[]>("/api/list");
  }

  getBoughtAktieById(id: string): Observable<BoughtAktie> {
    return this.http.get<BoughtAktie>(`/bought/${id}`);
  }

  search(query: string): Observable<Aktie[]> {
    return this.http.get<Aktie[]>(`/api/search/${encodeURIComponent(query)}`);
  }

  quoteAktie(aktieId: string): Observable<Aktie> {
    return this.http.get<Aktie>(`/api/quote/${aktieId}`);
  }

  kaufenAktie(boughtAktie: Omit<BoughtAktie, 'id'>): Observable<BoughtAktie> {
    return this.http.post<BoughtAktie>("/bought", boughtAktie);
  }

  /**
   * Gewinn/Verlust einer gehebelten Position in €.
   * Der Hebel wirkt bereits über die Positionsgröße (anzahl = investiert * hebel / kaufPreis),
   * daher skaliert die Kursbewegung direkt auf die volle Positionsgröße.
   */
  berechneGewinn(boughtAktie: BoughtAktie, aktuellerKurs: number): number {
    const kursDiff = (aktuellerKurs - boughtAktie.kaufPreis) * boughtAktie.anzahl;
    return boughtAktie.hebelType === HebelType.Short ? -kursDiff : kursDiff;
  }

  /** Gewinn/Verlust im Verhältnis zum eingesetzten Kapital (Margin), in %. */
  berechneGewinnProzent(boughtAktie: BoughtAktie, aktuellerKurs: number): number {
    return boughtAktie.investiert
      ? (this.berechneGewinn(boughtAktie, aktuellerKurs) / boughtAktie.investiert) * 100
      : 0;
  }
  getRealisierteAktien(): Observable<RealisierteAktie[]> {
    return this.http.get<RealisierteAktie[]>("/verkaeufe");
  }

  verkaufenAktie(boughtAktie: BoughtAktie, aktuellerKurs: number): Observable<BoughtAktie> {
    const realisiert: Omit<RealisierteAktie, 'id'> = {
      aktieId: boughtAktie.aktieId,
      kaufPreis: boughtAktie.kaufPreis,
      verkaufPreis: aktuellerKurs,
      anzahl: boughtAktie.anzahl,
      hebel: boughtAktie.hebel,
      hebelType: boughtAktie.hebelType,
      investiert: boughtAktie.investiert,
      gewinn: this.berechneGewinn(boughtAktie, aktuellerKurs),
      gewinnProzent: this.berechneGewinnProzent(boughtAktie, aktuellerKurs),
      datum: new Date().toISOString(),
    };

    return this.http.post("/verkaeufe", realisiert).pipe(
      switchMap(() => this.http.delete<BoughtAktie>(`/bought/${boughtAktie.id}`))
    );
  }
}
