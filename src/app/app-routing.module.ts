import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InterlistManagementComponent } from './interlist-management/interlist-management.component';
import { InternallistDefinationComponent } from './interlist-management/internallist-defination/internallist-defination.component';
import { InternallistWatchlistComponent } from './interlist-management/internallist-watchlist/internallist-watchlist.component';
import { BlacklistBicComponent } from './blacklist-bic/blacklist-bic.component';
import { NeutralWordsComponent } from './neutral-words/neutral-words.component';
import { SanctionedCitiesComponent } from './sanctioned-cities/sanctioned-cities.component';
import { HighRiskCountriesComponent } from './high-risk-countries/high-risk-countries.component';
import { ZoneVsGlobalComponent } from './zone-vs-global/zone-vs-global.component';

const routes: Routes = [
  { path: 'internamanagement', component: InterlistManagementComponent },
  { path: 'internallist', component: InternallistDefinationComponent },
  { path: 'internawatchlist', component: InternallistWatchlistComponent },
  { path: 'blacklistedbic', component: BlacklistBicComponent },
  { path: 'highriskcountries', component: HighRiskCountriesComponent },
  { path: 'neutralwords', component: NeutralWordsComponent },
  { path: 'sanctionedcities', component: SanctionedCitiesComponent },
  { path: 'zonevsglobal', component: ZoneVsGlobalComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes),CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
