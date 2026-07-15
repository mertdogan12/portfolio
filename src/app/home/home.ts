import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AktieOverview } from '../aktie-overview/aktie-overview';
import { Aktie } from '../aktie';

@Component({
  selector: 'app-home',
  imports: [CommonModule, AktieOverview],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  aktien: Aktie[] = [
    {
      id: 1,
      name: 'Beispiel Aktie',
      aktuellerKurs: 100,
      aenderung: 0.05,
      beschreibung: 'Dies ist eine Beispielaktie.',
    },
    {
      id: 2,
      name: 'Tech Innovate AG',
      aktuellerKurs: 245.5,
      aenderung: 2.3,
      beschreibung: 'Innovatives Unternehmen im Technologiesektor.',
    },
    {
      id: 3,
      name: 'Grüne Energie GmbH',
      aktuellerKurs: 78.2,
      aenderung: -1.1,
      beschreibung: 'Erneuerbare Energien und nachhaltige Lösungen.',
    },
    {
      id: 4,
      name: 'Global Handel AG',
      aktuellerKurs: 132.9,
      aenderung: 0.8,
      beschreibung: 'International tätiges Handelsunternehmen.',
    },
    {
      id: 5,
      name: 'Bio Pharma AG',
      aktuellerKurs: 310.75,
      aenderung: -0.45,
      beschreibung: 'Forschung und Entwicklung im Pharmabereich.',
    },
  ];
}
