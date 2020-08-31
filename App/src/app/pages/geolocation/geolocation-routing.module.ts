import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeoLocationPage } from './geolocation.page';

const routes: Routes = [
	{
		path: '',
		component: GeoLocationPage
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class GeoLocationPageRoutingModule { }
