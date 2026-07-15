import { Component, Input } from '@angular/core';
import { Aktie } from '../aktie';

@Component({
  selector: 'app-aktie-overview',
  imports: [],
  templateUrl: './aktie-overview.html',
  styleUrl: './aktie-overview.css',
})
export class AktieOverview {
  @Input() aktie!: Aktie;
}
