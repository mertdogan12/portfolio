import { HebelType } from "./hebel-type";

export interface BoughtAktie {
    id: string;
    kaufPreis: number;
    anzahl: number;
    hebel: number;
    hebelType: HebelType;
    aktieId: string;
    /** Eingesetztes Kapital (Margin) zum Kaufzeitpunkt, in €. */
    investiert: number;
}
