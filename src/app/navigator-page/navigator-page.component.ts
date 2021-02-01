import { Component, OnInit } from '@angular/core';
import {ResultsService} from '../common/services/results.service';

@Component({
  selector: 'app-navigator-page',
  templateUrl: './navigator-page.component.html',
  styleUrls: ['./navigator-page.component.css']
})
export class NavigatorPageComponent implements OnInit {
  //These are used to show the user an error in case the setup wasn't completed.


  constructor(private _results: ResultsService) { }

  ngOnInit(): void {

  }

}
