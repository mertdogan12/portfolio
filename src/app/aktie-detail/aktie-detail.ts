import { Component } from '@angular/core';
import { Aktie } from '../aktie';

@Component({
  selector: 'app-aktie-detail',
  imports: [],
  templateUrl: './aktie-detail.html',
  styleUrl: './aktie-detail.css',
})
export class AktieDetail {
  demoAktie: Aktie = {
    id: 1,
    name: 'Beispiel Aktie',
    aktuellerKurs: 100,
    aenderung: 0.05,
    beschreibung: 'Dies ist eine Beispielaktie.'
  };
}
