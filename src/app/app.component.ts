import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-recipebook';

  ngOnInit() {
    const firebaseConfig = {
      apiKey: 'AIzaSyAZfJouk8MWHw5AluqkLJOhFU038r6fsF8',
      authDomain: 'ng-recipe-book-32960.firebaseapp.com',
      databaseURL:
        'https://ng-recipe-book-32960-default-rtdb.asia-southeast1.firebasedatabase.app',
      projectId: 'ng-recipe-book-32960',
      storageBucket: 'ng-recipe-book-32960.appspot.com',
      messagingSenderId: '942068763857',
      appId: '1:942068763857:web:1361a69c6408b9b14e89f0',
    };

    const app = initializeApp(firebaseConfig);
  }
}