import { Component, inject } from '@angular/core';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Aktie } from '../aktie';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { AktienService } from '../aktien-service';
import { HebelType } from '../hebel-type';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-aktie-kaufen',
  imports: [
    DecimalPipe,
    AsyncPipe,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
  ],
  templateUrl: './aktie-kaufen.html',
  styleUrl: './aktie-kaufen.css',
})
export class AktieKaufen {
  aktienService = inject(AktienService);
  aktien: Aktie[] = [];
  currentAktie$: Observable<Aktie> | null = null;
  hebelTypes: HebelType[] = Object.values(HebelType);

  kaufenForm = new FormGroup({
    aktie: new FormControl<Aktie | null>(null),
    hebel: new FormControl(0),
    hebel_type: new FormControl<string[]>(Object.values(HebelType)),
  });

  search(aktie: string) {
    if (!aktie || aktie.trim() === '')
      return;

    this.aktien = this.aktienService.search(aktie);
  }

  selectAktie(aktie: Aktie) {
    this.currentAktie$ = this.aktienService.quoteAktie(aktie.id).pipe(
      map(live => ({ ...live, beschreibung: live.beschreibung || aktie.beschreibung }))
    );
  }
}
