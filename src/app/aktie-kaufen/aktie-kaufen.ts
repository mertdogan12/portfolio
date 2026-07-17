import { Component, inject } from '@angular/core';
import { DecimalPipe, AsyncPipe } from '@angular/common';
import { Aktie } from '../aktie';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

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

  kaufenForm = new FormGroup({
    investiert: new FormControl(100, [Validators.required, Validators.min(1)]),
    hebel: new FormControl(1, [Validators.required, Validators.min(1)]),
    hebelType: new FormControl<HebelType>(HebelType.Long, { nonNullable: true }),
  });

  private searchTerm$ = new Subject<string>();

  constructor() {
    this.aktienService.getKaufbareAktien().subscribe(aktien => (this.aktien = aktien));

    this.searchTerm$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(query => this.aktienService.search(query))
      )
      .subscribe(aktien => (this.aktien = aktien));
  }

  search(aktie: string) {
    if (!aktie || aktie.trim() === '') {
      this.aktienService.getKaufbareAktien().subscribe(aktien => (this.aktien = aktien));
      return;
    }

    this.searchTerm$.next(aktie.trim());
  }

  selectAktie(aktie: Aktie) {
    this.aktienService.quoteAktie(aktie.id).subscribe((aktie) => {
      this.currentAktie$.next(aktie);
    });
  }

  kaufen() {
    const value = this.kaufenForm.value;
    const currentAktie = this.currentAktie$.value;

    if (!currentAktie || !value.investiert || !value.hebel || !value.hebelType)
      return;

    const investiert = value.investiert;
    const hebel = value.hebel;
    // Wie bei echten Brokern: Hebel vergrößert die Positionsgröße, nicht das eingesetzte Kapital.
    const anzahl = (investiert * hebel) / currentAktie.aktuellerKurs;

    const boughtAktie = {
      kaufPreis: currentAktie.aktuellerKurs,
      anzahl,
      hebel,
      hebelType: value.hebelType,
      aktieId: currentAktie.id,
      investiert,
    };

    this.aktienService.kaufenAktie(boughtAktie).subscribe(() =>
      this.router.navigate(['/home'])
    );
  }
}
