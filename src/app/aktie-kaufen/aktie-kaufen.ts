import { Component, inject } from '@angular/core';
import { DecimalPipe, AsyncPipe } from '@angular/common';
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
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

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
  private router = inject(Router);
  private aktienService = inject(AktienService);

  aktien: Aktie[] = [];
  currentAktie$ = new BehaviorSubject<Aktie | null>(null);
  hebelTypes: HebelType[] = Object.values(HebelType);
  hebel: HebelType = HebelType.Long;

  kaufenForm = new FormGroup({
    aktie: new FormControl<Aktie | null>(null),
    anzahl: new FormControl(1),
    hebel: new FormControl(0),
    hebel_type: new FormControl<string[]>(Object.values(HebelType)),
  });

  search(aktie: string) {
    if (!aktie || aktie.trim() === '')
      return;

    this.aktien = this.aktienService.search(aktie);
  }

  selectAktie(aktie: Aktie) {
    this.aktienService.quoteAktie(aktie.id).subscribe((aktie) => {
      this.currentAktie$.next(aktie);
    });
  }

  kaufen() {
    const value = this.kaufenForm.value;
    const currentAktie = this.currentAktie$.value;

    if (currentAktie && value.hebel !== null && value.hebel_type) {
      const boughtAktie = {
        kaufPreis: currentAktie.aktuellerKurs,
        anzahl: value.anzahl || 0,
        hebel: value.hebel || 0,
        hebelType: this.hebel,
        aktieId: currentAktie.id,
      };

      this.aktienService.kaufenAktie(boughtAktie).subscribe(() =>
        this.router.navigate(['/home'])
      );
    }
  }
}
