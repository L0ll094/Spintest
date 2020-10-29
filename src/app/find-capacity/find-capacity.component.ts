import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-find-capacity',
  templateUrl: './find-capacity.component.html',
  styleUrls: ['./find-capacity.component.css']
})
export class FindCapacityComponent implements OnInit {
  /*Do I use the FOrmgroup vs just setting it  */
  Input: FormGroup;
  Lower_limit_graph=0;
  Upper_limit_graph=20;
  Q;


  constructor(private formBuilder: FormBuilder) { 
  
  }
  create_graph(){
    
     
     /*Knowing the Q they need to run through the separator, and desired efficiency, the required capacity can be predicted*/
     //let stringQ=this.Q.toString()
     console.log(this.Q.value);
     
     window.alert('The submit function to plot expected efficiency for different KQ for the chosen Q has been activated:');
     


     }


  ngOnInit() {
    
    //inputQ=new FormControl()
  }



}
