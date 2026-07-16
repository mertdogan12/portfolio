import { Component, inject, Input, OnInit } from '@angular/core';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Aktie } from '../aktie';
import { BoughtAktie } from '../bought-aktie';
import { AktienService } from '../aktien-service';

@Component({
  selector: 'app-aktie-overview',
  imports: [DecimalPipe, AsyncPipe, RouterLink],
  templateUrl: './aktie-overview.html',
  styleUrl: './aktie-overview.css',
})
export class AktieOverview implements OnInit {
  private aktienService = inject(AktienService);
  @Input() boughtAktie!: BoughtAktie;

  aktie$!: Observable<Aktie>;

  ngOnInit(): void {
    this.aktie$ = this.aktienService.quoteAktie(this.boughtAktie.aktieId);
  }

  gewinn(aktuellerKurs: number): number {
    return this.aktienService.berechneGewinn(this.boughtAktie, aktuellerKurs);
  }

  gewinnProzent(aktuellerKurs: number): number {
    return this.aktienService.berechneGewinnProzent(this.boughtAktie, aktuellerKurs);
  }
}
