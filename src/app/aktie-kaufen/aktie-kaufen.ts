import { Component } from '@angular/core';
import { Aktie } from '../aktie';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-aktie-kaufen',
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './aktie-kaufen.html',
  styleUrl: './aktie-kaufen.css',
})
export class AktieKaufen {

  demoAktien: Aktie[] = [
    {
      id: 'BSP',
      name: 'Beispiel Aktie',
      aktuellerKurs: 100,
      aenderung: 0.05,
      beschreibung: 'Dies ist eine Beispielaktie.'
    }
  ];
  hebelTypes: string[] = ['Short', 'Long'];

  kaufenForm = new FormGroup({
    aktie: new FormControl<Aktie[]>(this.demoAktien),
    hebel: new FormControl(0),
    hebel_type: new FormControl<string[]>(this.hebelTypes),
  });
}
