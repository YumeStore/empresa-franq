import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

declare var gtag;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private _router: Subscription;
  title = 'GIZ';

  constructor(private router: Router) {  }

  ngOnInit() {  }
}
