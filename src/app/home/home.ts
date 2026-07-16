import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AktieOverview } from '../aktie-overview/aktie-overview';
import { Aktie } from '../aktie';
import { AktienService } from '../aktien-service';
import { BoughtAktie } from '../bought-aktie';

@Component({
  selector: 'app-home',
  imports: [CommonModule, AktieOverview, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  boughtAktien: BoughtAktie[] = [];
  private aktienService = inject(AktienService);

  constructor() {
    this.boughtAktien = this.aktienService.getBoughtAktien();
    console.log(this.boughtAktien);
  }
}
