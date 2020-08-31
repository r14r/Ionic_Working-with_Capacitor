import { Component, OnInit } from '@angular/core';

import { Plugins } from '@capacitor/core';
import { bindCallback, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const { Geolocation, Modals } = Plugins;

@Component({
	selector: 'app-geolocation',
	templateUrl: './geolocation.page.html',
	styleUrls: ['./geolocation.page.scss'],
})
export class GeoLocationPage implements OnInit {
	private ID = 'GeoLocationPage';

	coords: Coordinates = null;


	log(func, line = '') {
		console.log(this.ID + '::' + func + '|' + line);
	}

	constructor() {
		this.log('constructor');
	}

	ngOnInit() {
		this.log('ngOnInit');
		// this.watchPosition().subscribe(coords => this.coords = coords);

		this.getCurrentPosition();
	}

	async getCurrentPosition() {
		this.log('getCurrentPosition');

		const coordinates = await Geolocation.getCurrentPosition();
		console.log('Current', coordinates);
	}

	watchPosition() {
		this.log('watchPosition');

		const wait = Geolocation.watchPosition({}, (position, err) => {
			Modals.alert({ title: 'Your Position:', message: 'Position: ${ position }' });
		});
	}

	showAlert() {
		const lat = this.coords.latitude;
		const lng = this.coords.longitude;

		Modals.alert({ title: 'Your Position:', message: 'Lat: ${ lat }, Lng: ${ lng }' });
	}
}
