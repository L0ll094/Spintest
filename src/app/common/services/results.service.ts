import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {
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
  results_spintest=[5,4,3,2]; //in percentages. Setting defaults.

  /*

  //Data below is only for testing purposes
  //To run for real please remove below code and uncomment the block above
  resulting_flows=[50,60,70,80];//From the Find Your Q-feature. Contains ["The Flows"] which are the corresponding flows to the separation efficiencies found by the spintest
 
  recommended_spintimes=[1,6,8,19]; //From the Find your Spintimes, given a centrifuge rpm and highest and lowest Q you run on your machine, as well as KQ of the machine

  //From Meet a criteria, different Qmax are given for different separator capacities that will yield a sufficient separation efficiency
  KQ_array=[100,200,300,400];//Contains actual numbers as vector
  LF=3;//Actual number
  Qmax_array=[50,65,78,89];//Contains actual numbers as vecto

  //From find your size
  size_high_sep=1300;
  size_mid_sep=1000;
  size_low_sep=700;
  LF_high_sep=2;
  LF_mid_sep=4;
  LF_low_sep=6;

  //Saving the input form spintest so that it can be used for plots.
  results_spintest=[40,30,20,10]; 
  */




  constructor() { }
}
