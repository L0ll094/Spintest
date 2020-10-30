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
    let data=JSON.stringify(this.fluid_properties.value)
    this._PassToPythonServiceHolder.sendFluidProperties(data).subscribe(
      res => console.log(res),
      err => console.log(err)

    );
  }

  submit_Spin_Test_Data(){
    /*Saves the inputed spin test data */
    let data=JSON.stringify(this.spin_test_data.value)
     this._PassToPythonServiceHolder.sendSpintestData(data).subscribe(
       res => console.log(res),
       err => console.log(err)
 
     );
 
 
   }

   
  submit_Equipment_Properties(){
    /*Saves the inputed equipment properties */

    let data=JSON.stringify(this.equipment_properties.value)
    this._PassToPythonServiceHolder.sendEquipmentProperties(data).subscribe(
      res => console.log(res),
      err => console.log(err)

    );


  }
  

}
