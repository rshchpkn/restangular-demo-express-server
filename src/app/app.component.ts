import {Component} from '@angular/core';
import {Http, Response, RequestOptions} from '@angular/http';

import {Observable} from 'rxjs';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  observable$: Observable<{}>;

  constructor(http: Http) {
    http
      .get('/api/heroes?number=4')
      .map((response: Response) => response.json())
      .subscribe(res => {
        debugger;
      }, err => {
        debugger;
      });
  }

  ngOnInit() {

  }
}
