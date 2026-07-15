import { Component } from '@angular/core';
import { Aktie } from '../aktie';

@Component({
  selector: 'app-aktie-overview',
  imports: [],
  templateUrl: './aktie-overview.html',
  styleUrl: './aktie-overview.css',
})
export class AktieOverview {
  aktie: Aktie = {
    id: 1,
    name: 'Beispiel Aktie',
    aktuellerKurs: 100,
    aenderung: 0.05,
    beschreibung: 'Dies ist eine Beispielaktie.'
  };
}
