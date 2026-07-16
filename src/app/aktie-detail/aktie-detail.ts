import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Aktie } from '../aktie';
import { AktienService } from '../aktien-service';
import { ActivatedRoute } from '@angular/router';
import { BoughtAktie } from '../bought-aktie';
import { HebelType } from '../hebel-type';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-aktie-detail',
  imports: [
    DecimalPipe,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
  ],
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
