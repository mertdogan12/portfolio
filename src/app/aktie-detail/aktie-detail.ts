import { Component, inject } from '@angular/core';
import { Aktie } from '../aktie';
import { AktienService } from '../aktien-service';
import { ActivatedRoute } from '@angular/router';
import { BoughtAktie } from '../bought-aktie';
import { HebelType } from '../hebel-type';

@Component({
  selector: 'app-aktie-detail',
  imports: [],
  templateUrl: './aktie-detail.html',
  styleUrl: './aktie-detail.css',
})

export class AktieDetail {
  private aktienService = inject(AktienService);
  private route = inject(ActivatedRoute);

  private id = parseInt(this.route.snapshot.paramMap.get('id') || '0');

  boughtAktie: BoughtAktie = this.aktienService.getBoughtAktieById(
    this.id
  ) 
    || { id: 0, kaufPreis: 0, anzahl: 0, hebel: 0, hebelType: HebelType.Long, aktieId: '' };

  aktie: Aktie = this.aktienService.getAktieByID(this.boughtAktie.aktieId) 
    || { id: '', name: '', aktuellerKurs: 0, aenderung: 0, beschreibung: '' };
}
