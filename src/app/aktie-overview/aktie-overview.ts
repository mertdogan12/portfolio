import { Component, inject, Input, OnInit } from '@angular/core';
import { Aktie } from '../aktie';
import { BoughtAktie } from '../bought-aktie';
import { AktienService } from '../aktien-service';

@Component({
  selector: 'app-aktie-overview',
  imports: [],
  templateUrl: './aktie-overview.html',
  styleUrl: './aktie-overview.css',
})
export class AktieOverview implements OnInit {
  private aktienService = inject(AktienService);
  @Input() boughtAktie!: BoughtAktie;

  aktie: Aktie = { id: '', name: '', aktuellerKurs: 0, aenderung: 0, beschreibung: '' };

  ngOnInit(): void {
    const a = this.aktienService.getAktieByID(this.boughtAktie.aktieId);

    if (a) {
      this.aktie = a;
    }
  }
}
