import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PassToPythonService } from '../pass-to-python.service';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css'],
  
})
export class InputFormComponent implements OnInit {
  fluid_properties: FormGroup;
  equipment_properties: FormGroup;
  spin_test_data: FormGroup;
  data;//Attemt to save all my data in this, managed by the pass-to-python service

 
  
  constructor(
    private _PassToPythonServiceHolder: PassToPythonService,
    private formBuilder: FormBuilder,
    ) {  }


  addToContainer(data){
    //this._PassToPythonServiceHolder.addToContainer(data);

    //window.alert('The data '+data+' has been added to the datacontainer');
    console.log("WORKING");

    }

  ngOnInit() {
      this.data=this._PassToPythonServiceHolder.getData();
    
      this.fluid_properties=this.formBuilder.group({
      densityParticle: [null,[Validators.required,]],
      densityFeed:[null,[Validators.required,]],
      kinviscosity: [null,Validators.required],})

      this.equipment_properties=this.formBuilder.group({
      Rcentrifuge: [null,[Validators.required,]],
      L1:[null,[Validators.required,]],
      L2:[null,[Validators.required,]],
      V1:[null,[Validators.required,]],
      V2: [null,Validators.required],})

      this.spin_test_data=this.formBuilder.group({
      
      spintime1: [null,[Validators.required,]],
      spintime2: [null,[Validators.required,]],
      spintime3: [null,[Validators.required,]],
      spintime4: [null,[Validators.required,]],

      Nstart1: [null,[Validators.required,]],
      Nstart2: [null,[Validators.required,]],
      Nstart3: [null,[Validators.required,]],
      Nstart4: [null,[Validators.required,]],

      speed1: [null,[Validators.required,]],
      speed2: [null,[Validators.required,]],
      speed3: [null,[Validators.required,]],
      speed4: [null,[Validators.required,]],

      residualSolids1:[null,[Validators.required,]],
      residualSolids2:[null,[Validators.required,]],
      residualSolids3:[null,[Validators.required,]],
      residualSolids4:[null,[Validators.required,]],

      tempSpinTest:[null,[Validators.required,]],
      neededQ: [null,[Validators.required,]],
      
    });
  }
  submit_Fluid_Properties(){
   /*Saves the inputed fluid properties */

  /*
  this.addToContainer(this.fluid_properties.controls['densityParticle'].value)
  this.addToContainer(this.fluid_properties.controls['densityFeed'].value)


  set data = this.flueod_properties.value to save as data said zory
  
  console.log(this.fluid_properties.value);
  console.log(this.spin_test_data.value);
  console.log(this._PassToPythonServiceHolder.getData())*/
    console.log('The submit function Fluid Properties have been activated');
   /* this._PassToPythonServiceHolder.sendToBackend().subscribe(
      res => console.log(res),
      err => console.error(err)

    );*/
    let data=JSON.stringify(this.fluid_properties.value)
    this._PassToPythonServiceHolder.sendToBackend2(data).subscribe(
      res => console.log(res),
      err => console.log(err)

    );
  }

  
  submit_Equipment_Properties(){
    /*Saves the inputed equipment properties */
    window.alert('The submit function Equipment Properties have been activated');


  }
  
  submit_Spin_Test_Data(){
   /*Saves the inputed spin test data */
   window.alert('The submit function Spin Test Data have been activated');


  }
}
