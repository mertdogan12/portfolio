import { Routes } from '@angular/router';
import { AktieKaufen } from './aktie-kaufen/aktie-kaufen';
import { AktieDetail } from './aktie-detail/aktie-detail';
import { Home } from './home/home';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
    },
    {
        path: "kaufen",
        component: AktieKaufen,
    },
    {
        path: "aktie/:id",
        component: AktieDetail
    },
    {
        path: "home",
        component: Home
    }
];
