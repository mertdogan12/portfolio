import { Component, inject, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { Aktie } from '../aktie';
import { BoughtAktie } from '../bought-aktie';
import { AktienService } from '../aktien-service';

@Component({
  selector: 'app-aktie-overview',
  imports: [DecimalPipe, AsyncPipe, RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './aktie-overview.html',
  styleUrl: './aktie-overview.css',
})
export class AktieOverview implements OnInit {
  private aktienService = inject(AktienService);
  @Input() boughtAktie!: BoughtAktie;
  @Output() verkauft = new EventEmitter<void>();

  aktie$!: Observable<Aktie>;

  ngOnInit(): void {
    this.aktie$ = this.aktienService.quoteAktie(this.boughtAktie.aktieId);
  }

  verkaufen(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    this.aktienService.verkaufenAktie(this.boughtAktie.id).subscribe(() =>
      this.verkauft.emit()
    );
  }
}
