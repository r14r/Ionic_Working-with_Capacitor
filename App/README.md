# Working with Capacitor

https://angularfirebase.com/lessons/capacitor-five-apps-in-five-minutes/


## Building a Geolocation App with Angular

The app we’re building is super simple. The user clicks a button show position and it will alert their lat/lng geographic coordinates. However, every native platform handles geolocation data and alert modals differently, so we use use a capacitor plugin to bridge the gap.

We’re using a basic Angular CLI app for this demo, but feel free to build your app with any framework like Vue, React, Backbone, MooTools, or whatever.

    ng new capApp && cd capApp
    
### Initialize Capacitor

    npm install --save @capacitor/core @capacitor/cli
    npx cap init
    
    
## A Simple GeoLocation App

Importing Plugins from capacitor gives us access to Geolocation and Modals, which handle the cross-platform magic for these features.

Also notice how I use the bindCallback helper from RxJS, which takes a callback function and converts it into a function that returns an Observable. This makes it easy to just subscribe to the geolocation data and map them to the desired coordinate value.

app.component.ts
import { Component, OnInit } from '@angular/core';

import { Plugins } from '@capacitor/core';

import { Observable } from 'rxjs/Observable';
import { bindCallback } from 'rxjs/observable/bindCallback';
import { map } from 'rxjs/operators/map';

const { Geolocation, Modals } = Plugins;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  coords: Coordinates = null;

  ngOnInit() {
    this.watchPosition().subscribe( coords =>
      this.coords = coords
    );
  }


  watchPosition(): Observable<any> {
    const watch = bindCallback(Geolocation.watchPosition)({});

    return watch.pipe(map(pos => pos.coords));
  }

  showAlert() {
    const lat = this.coords.latitude;
    const lng = this.coords.longitude;
    Modals.alert({
      title: 'Your Position',
      message: `Lat: ${lat}, Lng: ${lng}`,
    });
  }

}

app.html.ts

    <button (click)="showAlert()">Show Position</button>

## Deploying Capacitor to Native Platforms

Now it’s time to show off the real value of Capacitor - deployment. Under the hood, it’s handling all sorts of crazy stuff to transpile your code into something each native platform can understand. For desktop platforms it leverages the highly-popular Electron framework.

## Progressive Web App

    ng build --prod
    npx cap serve

That should bring up a browser window that looks like this:

## Android
    npx cap add android
    npx cap run android

If the run command that doesn’t work, open the project directly in Android Studio and click the green play button in the top right corner.


## iOS

For iOS, you follow the same process as Android, but open up the app in Xcode and hit play.

    npx cap add ios
    npx cap run ios

### MacOS and Windows Desktop

There is one important caveat with Electron apps, and that’s to make sure you change the baseURL in the index.html

    <base href="./">
    
Also, don’t forget to rebuild the app if anything changes in the source code.

    ng build --prod  
    npx cap add electron

    cd electron
    npm run electron:start
    That should bring up your app as a native desktop app on your operating system.

I took that screenshot on Ubuntu, but let’s also build the binaries so we can distribute our app to Windows and MacOS users.

    npm install electron-packager -g
    electron-packager . --platform=win32
    electron-packager . --platform=darwin

And like magic, your app has shapeshifted into a native desktop app.
