import { Component, OnInit } from '@angular/core';
import {ResultsService} from '../common/services/results.service';

@Component({
  selector: 'app-navigator-page',
  templateUrl: './navigator-page.component.html',
  styleUrls: ['./navigator-page.component.css']
})
export class NavigatorPageComponent implements OnInit {
  //These are used to show the user an error in case the setup wasn't completed.
  spintest_setup_completed;
  equipment_setup_completed;

  constructor(private _results: ResultsService) { }

  ngOnInit(): void {
    /*
    console.log("Spintest is setup:");
    console.log(this._results.spintest_setup_successfully);
    console.log("Equipment is setup:");
    console.log(this._results.equipment_setup_successfully)
    */
    this.spintest_setup_completed=this._results.spintest_setup_successfully;
    this.equipment_setup_completed=this._results.equipment_setup_successfully;

  }

}
