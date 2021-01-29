import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  /* The Result service provides a storage space for "global variables". Variables defined here are accessible for all components by importing this service in their .ts-file  */
  
  separation_result="Effluent conc. [vol%]"
  equipment_setup_successfully=false;
  spintest_setup_successfully=false;
  //The results coming in from the backend will be saved as JSON objects.
  resulting_flows;//From the Find Your Q-feature. Contains ["The Flows"] which are the corresponding flows to the separation efficiencies found by the spintest
 
  recommended_spintimes; //From the Find your Spintimes, given a centrifuge rpm and highest and lowest Q you run on your machine, as well as KQ of the machine

  //From Meet a criteria, different Qmax are given for different separator capacities that will yield a sufficient separation efficiency
  KQ_array;//Contains actual numbers as vector
  LF_crit;//Actual number
  Qmax_array;//Contains actual numbers as vecto

  //From find your size, a chosen interval of efficiencies give high and low bounds of capacities, and loadfactors
  //corresponding to the dessired separation efficiency
  size_high_sep;
  size_mid_sep;
  size_low_sep;
  LF_high_sep;
  LF_mid_sep;
  LF_low_sep;

  //Saving the input form spintest so that it can be used for plots.
  //It has a default setting to ensure that the plot doesn't crash if the user forgot to setup their data 
  //Or if the user accidentally updated.
  results_spintest=[5,4,3,2]; //in percentages. 





  constructor() { }
}
