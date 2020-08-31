import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeoLocationPageRoutingModule } from './geolocation-routing.module';

import { GeoLocationPage } from './geolocation.page';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		GeoLocationPageRoutingModule
	],
	declarations: [GeoLocationPage]
})
export class GeoLocationPageModule { }
