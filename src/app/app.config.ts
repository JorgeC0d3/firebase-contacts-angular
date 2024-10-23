import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions, } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, withViewTransitions(), withComponentInputBinding()), 
    provideFirebaseApp(() => 
      initializeApp({ 
        "projectId": "angular-crud-2b7ab", 
        "appId": "1:1034147009654:web:503c19d655703f03f37b57", 
        "storageBucket": "angular-crud-2b7ab.appspot.com", 
        "apiKey": "AIzaSyD0PDFUAFbHD7-EPDGl3Ce1s3oamIeIy-g", 
        "authDomain": "angular-crud-2b7ab.firebaseapp.com", 
        "messagingSenderId": "1034147009654", 
        "measurementId": "G-LSDG25JGC4" 
      })), provideFirestore(() => getFirestore())]
};
