import { Routes } from '@angular/router';
import { TranslatePageComponent } from './translate-page/translate-page.component';
import { SynonymsPageComponent } from './synonyms-page/synonyms-page.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

export const routes: Routes = [
    { path: '', redirectTo: '/welcome', pathMatch: 'full'},
    { path: 'translate', component: TranslatePageComponent },
    { path: 'synonyms', component: SynonymsPageComponent },
    { path: 'welcome', component: WelcomePageComponent},
    { path: '**', redirectTo: '/welcome' }

];
