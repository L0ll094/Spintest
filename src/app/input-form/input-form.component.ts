import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PassToPythonService } from '../common/services/pass-to-python.service';
import {ResultsService} from '../common/services/results.service';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css'],
  
})
export class InputFormComponent implements OnInit {
  fluid_properties: FormGroup;
  equipment_properties: FormGroup;
  spin_test_data: FormGroup;
  data;
  options;
  accTable =[
    {time:0, speed: 0},
    {time:6, speed: 600},
    {time:9, speed: 1200},
    {time:12, speed: 1800},
    {time:15, speed: 2400},
    {time:18,speed: 3000},
  ];
  retTable=[
    {time:0, speed: 3000},
    {time:6, speed: 2400},
    {time:9, speed: 1800},
    {time:12, speed: 1200},
    {time:15, speed: 600},
    {time:18,speed: 0},
  ];
  



 
  
  constructor(
    private _PassToPythonServiceHolder: PassToPythonService,
    private formBuilder: FormBuilder,
    private _results: ResultsService,


    ) {  }


  ngOnInit() {
        
      this.fluid_properties=this.formBuilder.group({
      densityParticle: [null],
      densityFeed:[null,[Validators.required,]],
      kinviscosity: [null,Validators.required],})

      this.equipment_properties=this.formBuilder.group({
      Rcentrifuge: [null,[Validators.required,]],
      L1:[null,[Validators.required,]],
      L2:[null,[Validators.required,]],
      V1:[null,[Validators.required,]],
      V2: [null,[Validators.required]],
      acc_t_1: [null],
      acc_t_2: [null],
      acc_t_3: [null],
      acc_t_4: [null],
      acc_t_5: [null],
      acc_t_6: [null],

      acc_rpm_1: [null],
      acc_rpm_2: [null],
      acc_rpm_3: [null],
      acc_rpm_4: [null],
      acc_rpm_5: [null],
      acc_rpm_6: [null],

      ret_t_1: [null],
      ret_t_2: [null],
      ret_t_3: [null],
      ret_t_4: [null],
      ret_t_5: [null],
      ret_t_6: [null],

      ret_rpm_1: [null],
      ret_rpm_2: [null],
      ret_rpm_3: [null],
      ret_rpm_4: [null],
      ret_rpm_5: [null],
      ret_rpm_6: [null], 

    
    
    })

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
    
   if(this.options){
     /*If new values for the acceleration and retardation were given, do nothing*/
  

    }
    else{
      /*If no new values for the acceleration and retardation were given, set the values to the existing default originating from the MT&C Hotspin*/
      this.equipment_properties.controls['acc_t_1'].setValue(this.accTable[0].time);
      this.equipment_properties.controls['acc_t_2'].setValue(this.accTable[1].time);
      this.equipment_properties.controls['acc_t_3'].setValue(this.accTable[2].time);
      this.equipment_properties.controls['acc_t_4'].setValue(this.accTable[3].time);
      this.equipment_properties.controls['acc_t_5'].setValue(this.accTable[4].time);
      this.equipment_properties.controls['acc_t_6'].setValue(this.accTable[5].time);

      this.equipment_properties.controls['acc_rpm_1'].setValue(this.accTable[0].speed);
      this.equipment_properties.controls['acc_rpm_2'].setValue(this.accTable[1].speed);
      this.equipment_properties.controls['acc_rpm_3'].setValue(this.accTable[2].speed);
      this.equipment_properties.controls['acc_rpm_4'].setValue(this.accTable[3].speed);
      this.equipment_properties.controls['acc_rpm_5'].setValue(this.accTable[4].speed);
      this.equipment_properties.controls['acc_rpm_6'].setValue(this.accTable[5].speed);


      this.equipment_properties.controls['ret_t_1'].setValue(this.retTable[0].time);
      this.equipment_properties.controls['ret_t_2'].setValue(this.retTable[1].time);
      this.equipment_properties.controls['ret_t_3'].setValue(this.retTable[2].time);
      this.equipment_properties.controls['ret_t_4'].setValue(this.retTable[3].time);
      this.equipment_properties.controls['ret_t_5'].setValue(this.retTable[4].time);
      this.equipment_properties.controls['ret_t_6'].setValue(this.retTable[5].time);

      this.equipment_properties.controls['ret_rpm_1'].setValue(this.retTable[0].speed);
      this.equipment_properties.controls['ret_rpm_2'].setValue(this.retTable[1].speed);
      this.equipment_properties.controls['ret_rpm_3'].setValue(this.retTable[2].speed);
      this.equipment_properties.controls['ret_rpm_4'].setValue(this.retTable[3].speed);
      this.equipment_properties.controls['ret_rpm_5'].setValue(this.retTable[4].speed);
      this.equipment_properties.controls['ret_rpm_6'].setValue(this.retTable[5].speed);


      
    }
   
    let data=JSON.stringify(this.fluid_properties.value)
 
    this._PassToPythonServiceHolder.sendFluidProperties(data).subscribe(
      res => console.log(res),
      err => console.log(err)

    );
    
  }

  submit_Equipment_Properties(){
    /*Saves the inputed equipment properties */
    
    let data=JSON.stringify(this.equipment_properties.value);
    console.log(data)

    this._PassToPythonServiceHolder.sendEquipmentProperties(data).subscribe(
      res => {
        let temp=JSON.parse(res);
        this._results.setup_completed_succesfully=temp.setup_completed_succesfully;
        console.log(this._results.setup_completed_succesfully)

      },
      err => console.log(err)

    )};

  submit_Spin_Test_Data(){
    /*Saves the inputed spin test data */
    this._results.results_spintest=[this.spin_test_data.value['residualSolids1'],this.spin_test_data.value['residualSolids2'],
    this.spin_test_data.value['residualSolids3'],this.spin_test_data.value['residualSolids4']]
    console.log("This is the property that was saved to global results")
    console.log(this._results.results_spintest)

    let data=JSON.stringify(this.spin_test_data.value)
    
     this._PassToPythonServiceHolder.sendSpintestData(data).subscribe(
       res =>  res => {
        let temp=JSON.parse(res);
        this._results.setup_completed_succesfully=temp.setup_completed_succesfully;
        console.log(this._results.setup_completed_succesfully)},
       err => console.log(err)
 
     );
 
 
   }

   


  addToContainer(){
      /*Empty function for testing */
    window.alert("You clicked a button")
      
  ;


  }
  

}
