import { HebelType } from "./hebel-type";

export interface RealisierteAktie {
    id: string;
    aktieId: string;
    kaufPreis: number;
    verkaufPreis: number;
    anzahl: number;
    hebel: number;
    hebelType: HebelType;
    investiert: number;
    /** Realisierter Gewinn/Verlust zum Verkaufszeitpunkt, in €. */
    gewinn: number;
    /** Realisierter Gewinn/Verlust im Verhältnis zum eingesetzten Kapital, in %. */
    gewinnProzent: number;
    datum: string;
}
