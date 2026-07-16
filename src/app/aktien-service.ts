import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Aktie } from './aktie';
import { BoughtAktie } from './bought-aktie';
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

  getBoughtAktien(): Observable<BoughtAktie[]> {
    return this.http.get<BoughtAktie[]>("/bought");
  }

  getAktien(): Aktie[] {
    return this.demoAktien;
  }

  getBoughtAktieById(id: string): Observable<BoughtAktie> {
    return this.http.get<BoughtAktie>(`/bought/${id}`);
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

  kaufenAktie(boughtAktie: Omit<BoughtAktie, 'id'>): Observable<BoughtAktie> {
    return this.http.post<BoughtAktie>("/bought", boughtAktie);
  }

  verkaufenAktie(id: string): Observable<BoughtAktie> {
    return this.http.delete<BoughtAktie>(`/bought/${id}`);
  }
}
