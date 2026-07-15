import { Component, Input } from '@angular/core';
import { Aktie } from '../aktie';

@Component({
  selector: 'app-aktie-overview',
  imports: [],
  templateUrl: './aktie-overview.html',
  styleUrl: './aktie-overview.css',
})
export class AktieOverview {
<<<<<<< HEAD
  aktie: Aktie = {
    id: 'BSP',
    name: 'Beispiel Aktie',
    aktuellerKurs: 100,
    aenderung: 0.05,
    beschreibung: 'Dies ist eine Beispielaktie.'
  };
=======
  @Input() aktie!: Aktie;
>>>>>>> f37ae8d6c70f1c784d4e0fc17fb3fb0e8107d930
}
