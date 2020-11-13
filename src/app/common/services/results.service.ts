import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  //The results coming in from the backend will be saved as JSON objects.
  resulting_flows;//From the Find Your Q-feature. Contains ["The Flows"] which are the corresponding flows to the separation efficiencies found by the spintest
 
  recommended_spintimes; //From the Find your Spintimes, given a centrifuge rpm and highest and lowest Q you run on your machine, as well as KQ of the machine

  //From Meet a criteria, different Qmax are given for different separator capacities that will yield a sufficient separation efficiency
  KQ_array;//Contains actual numbers as vector
  LF;//Actual number
  Qmax_array;//Contains actual numbers as vecto



  constructor() { }
}
