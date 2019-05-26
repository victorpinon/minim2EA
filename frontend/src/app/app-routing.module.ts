import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

const routes: Routes = [
  { path: '', redirectTo: 'stations', pathMatch: 'full' },
  { path: 'bikes', loadChildren: './components/bikes/bikes.module#BikesPageModule' },
  { path: 'stations', loadChildren: './components/stations/stations.module#StationsPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    HttpClientModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
