import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  //The results coming in from the backend will be saved as JSON objects.
  resulting_flows;//From the Find Your Q-feature. Contains ["The Flows"] which are the corresponding flows to the separation efficiencies found by the spintest
  result_container2="ABC"

  constructor() { }
}
