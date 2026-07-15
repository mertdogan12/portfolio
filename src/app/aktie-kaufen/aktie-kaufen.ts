import { Component } from '@angular/core';
import { Aktie } from '../aktie';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-aktie-kaufen',
  imports: [],
  templateUrl: './aktie-kaufen.html',
  styleUrl: './aktie-kaufen.css',
})
export class AktieKaufen {

  demoAktien: Aktie[] = [];

  kaufenForm = {
    aktie: new FormControl<Aktie[]>(this.demoAktien),
    hebel: new FormControl(0),
    hebel_type: new FormControl<string[]>(['Short', 'Long']),
  }
}
