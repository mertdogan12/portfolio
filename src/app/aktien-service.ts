import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Aktie } from './aktie';
import { BoughtAktie } from './bought-aktie';
import { HebelType } from './hebel-type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AktienService {
  private http = inject(HttpClient);

  demoAktien: Aktie[] = [
    {
      id: 'AAPL',
      name: 'Apple Inc.',
      aktuellerKurs: 195.32,
      aenderung: 1.24,
      beschreibung: 'US-amerikanischer Technologiekonzern, bekannt für iPhone, Mac und iPad.'
    },
    {
      id: 'MSFT',
      name: 'Microsoft Corp.',
      aktuellerKurs: 418.75,
      aenderung: 0.68,
      beschreibung: 'Weltweit führender Anbieter von Software, Cloud-Diensten und Hardware.'
    },
    {
      id: 'AMZN',
      name: 'Amazon.com Inc.',
      aktuellerKurs: 178.90,
      aenderung: -0.45,
      beschreibung: 'Größter Onlinehändler der Welt und Anbieter von Cloud-Computing über AWS.'
    },
    {
      id: 'GOOGL',
      name: 'Alphabet Inc.',
      aktuellerKurs: 165.42,
      aenderung: 0.92,
      beschreibung: 'Muttergesellschaft von Google, führend in Suchmaschinen und Werbung.'
    },
    {
      id: 'TSLA',
      name: 'Tesla Inc.',
      aktuellerKurs: 248.50,
      aenderung: -2.15,
      beschreibung: 'Hersteller von Elektrofahrzeugen und Energiespeicherlösungen.'
    },
    {
      id: 'NVDA',
      name: 'NVIDIA Corp.',
      aktuellerKurs: 890.15,
      aenderung: 3.87,
      beschreibung: 'Führender Hersteller von Grafikprozessoren und KI-Chips.'
    },
    {
      id: 'META',
      name: 'Meta Platforms Inc.',
      aktuellerKurs: 502.30,
      aenderung: 1.05,
      beschreibung: 'Betreiber von Facebook, Instagram und WhatsApp.'
    },
    {
      id: 'SAP',
      name: 'SAP SE',
      aktuellerKurs: 189.60,
      aenderung: 0.33,
      beschreibung: 'Deutscher Softwarekonzern und größter europäischer Softwarehersteller.'
    },
    {
      id: 'SIE',
      name: 'Siemens AG',
      aktuellerKurs: 178.24,
      aenderung: -0.78,
      beschreibung: 'Deutscher Technologiekonzern mit Schwerpunkt Industrie, Infrastruktur und Mobilität.'
    },
    {
      id: 'VOW3',
      name: 'Volkswagen AG',
      aktuellerKurs: 112.80,
      aenderung: -1.32,
      beschreibung: 'Einer der größten Automobilhersteller der Welt mit Sitz in Wolfsburg.'
    }
  ];

  demoBoughtAktien: BoughtAktie[] = [
    {
      id: 1,
      kaufPreis: 182.10,
      anzahl: 10,
      hebel: 1,
      hebelType: HebelType.Long,
      aktieId: 'AAPL'
    },
    {
      id: 2,
      kaufPreis: 405.20,
      anzahl: 5,
      hebel: 2,
      hebelType: HebelType.Long,
      aktieId: 'MSFT'
    },
    {
      id: 3,
      kaufPreis: 260.75,
      anzahl: 8,
      hebel: 3,
      hebelType: HebelType.Short,
      aktieId: 'TSLA'
    },
    {
      id: 4,
      kaufPreis: 750.40,
      anzahl: 3,
      hebel: 2,
      hebelType: HebelType.Long,
      aktieId: 'NVDA'
    },
    {
      id: 5,
      kaufPreis: 195.00,
      anzahl: 6,
      hebel: 1,
      hebelType: HebelType.Long,
      aktieId: 'SAP'
    }
  ];

  getBoughtAktien(): BoughtAktie[] {
    return this.demoBoughtAktien;
  }

  getAktien(): Aktie[] {
    return this.demoAktien;
  }

  getBoughtAktieById(id: number): BoughtAktie | undefined {
    return this.demoBoughtAktien.find(bought => bought.id === id);
  }

  getAktieByID(id: string): Aktie | undefined {
    return this.demoAktien.find(aktie => aktie.id === id);
  }

  search(query: string): Aktie[] {
    const lowerQuery = query.toLowerCase();
    return this.demoAktien.filter(aktie =>
      aktie.name.toLowerCase().includes(lowerQuery) ||
      aktie.id.toLowerCase().includes(lowerQuery)
    );
  }

  quoteAktie(aktieId: string): Observable<Aktie> {
    return this.http.get<Aktie>(`/api/quote/${aktieId}`);
  }

  kaufenAktie(boughtAktie: BoughtAktie): Observable<BoughtAktie> {
    console.log("Kaufen Aktie:", boughtAktie);
    return this.http.post<BoughtAktie>("/bought", boughtAktie);
  }
}
