import { Component, inject } from '@angular/core';
import { DecimalPipe, AsyncPipe } from '@angular/common';
import { Aktie } from '../aktie';
import { AktienService } from '../aktien-service';
import { ActivatedRoute } from '@angular/router';
import { BoughtAktie } from '../bought-aktie';
import { HebelType } from '../hebel-type';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-aktie-detail',
  imports: [
    DecimalPipe,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    AsyncPipe
  ],
  templateUrl: './aktie-detail.html',
  styleUrl: './aktie-detail.css',
})

export class AktieDetail {
  private aktienService = inject(AktienService);
  private route = inject(ActivatedRoute);

  private id = this.route.snapshot.paramMap.get('id') || '';

  boughtAktie$: Observable<BoughtAktie> = this.aktienService.getBoughtAktieById(this.id) ;

  aktie$: Observable<Observable<Aktie>> = this.boughtAktie$.pipe(
    map(boughtAktie => this.aktienService.quoteAktie(boughtAktie.aktieId))
  );
}
