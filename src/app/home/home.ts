import { Component } from '@angular/core';
import { AktieOverview } from '../aktie-overview/aktie-overview';

@Component({
  selector: 'app-home',
  imports: [AktieOverview],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
}
