import { HebelType } from "./hebel-type";

export interface BoughtAktie {
    id: number;
    kaufPreis: number;
    anzahl: number;
    hebel: number;
    hebelType: HebelType;
    aktieId: string;
}
