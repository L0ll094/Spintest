import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, SelectControlValueAccessor } from '@angular/forms';
import { PassToPythonService } from '../common/services/pass-to-python.service';
import {ResultsService} from '../common/services/results.service';
import {MatMenuModule} from '@angular/material/menu';
import {MatRadioModule} from '@angular/material/radio';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css'],
  
})
export class InputFormComponent implements OnInit {

  equipment_properties: FormGroup;
  spin_test_data: FormGroup;
  data;




  //Options determines if user wants to input their own acc/ret table
  options;

  //change_centrifuge determines if user wants to input their own centrifuge size parameters
  change_centrifuge;

  //Default values corresponding to the hotspin centrifuge
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
    {time:3, speed: 2400},
    {time:6, speed: 1800},
    {time:9, speed: 1200},
    {time:12, speed: 600},
    {time:18,speed: 0},
  ];

  default_Rcentrifuge=146.4;
  default_L1=76.2;
  default_L2=24.8;

  default_V1=100;
  default_V2=20;
  default_Va=100;
  default_Vb=50;

centrifugeSizes=[
  {param:"Rcentrifuge [cm]",value: this.default_Rcentrifuge},
  {param:"L1 [cm]",value:this.default_L1},
  {param:"L2 [cm]",value:this.default_L2},
  {param:"V1 [%]",value:this.default_V1},
  {param:"V2 [%]",value:this.default_V2},
  {param:"Va [%]",value:this.default_Va},
  {param:"Vb [%]",value:this.default_Vb},

  

]
  

  



 
  
  constructor(
    private _PassToPythonServiceHolder: PassToPythonService,
    private formBuilder: FormBuilder,
    public _results: ResultsService,
    private _snackBar: MatSnackBar,


    ) {  }


  ngOnInit() {

      //The parameters regarding the centrifuge are voluntary to input
      this.equipment_properties=this.formBuilder.group({
      Rcentrifuge: [null],
      L1:[null],
      L2:[null],
      V1:[null],
      V2: [null],
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
      Va: [null],
      Vb: [null],
      

    
    
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
      PreferredUnit: [null],
      
    });

    
  }
  printValue() {
    console.log("Value of options:");
    console.log(this.options);
  }

  isOptionsTrue(){
    return this.options=='yes';
  }
  isChange_centrifugeTrue(){
    return this.change_centrifuge=='yes';
  }

  checkUserInput(){
      //Check that person put their spintest in order and let them know if something is suspicious
      let usrSepRes=[this.spin_test_data.value['residualSolids1'],this.spin_test_data.value['residualSolids2'],this.spin_test_data.value['residualSolids3'],this.spin_test_data.value['residualSolids4']];

      let usrSpintimes=[this.spin_test_data.value['spintime1'],this.spin_test_data.value['spintime2'],this.spin_test_data.value['spintime3'],this.spin_test_data.value['spintime4']];

      let usrNstarts=[this.spin_test_data.value['Nstart1'],this.spin_test_data.value['Nstart2'],this.spin_test_data.value['Nstart3'],this.spin_test_data.value['Nstart4']];

      let anError: string;
      anError='';

      for (let i = 1; i < usrSepRes.length ; i++) {
        console.log(`Index ${i}`)
        console.log(`Is ${usrSepRes[i]} bigger than ${usrSepRes[i-1]}?`)
        console.log(`Is ${usrNstarts[i]} lower than ${usrNstarts[i-1]}?`)
        console.log(`Is ${usrSpintimes[i]} lower than ${usrSpintimes[i-1]}?`)
          if(usrSepRes[i]>=usrSepRes[i-1]){
          anError=anError+`\n Warning: It seems the separation result for sample tube ${i+1} is higher than (or the same as) for sample tube ${i}. Are you sure you entered them in the correct order? If not, simply re-do.\n`;
          }
          if(usrNstarts[i-1]>=usrNstarts[i]){
            anError=anError+`\n Warning: It seems sample tube ${i} experienced more starts than (or the same as) sample tube ${i+1}. Please put them in order lowest to highest and re-submit.\n`;
          }
          if(usrSpintimes[i-1]>=usrSpintimes[i]){
            anError=anError+` \n Warning:  It seems sample tube ${i}'s spin time is longer than(or the same as) sample tube ${i+1}'s. Please put them in order lowest to highest and re-submit.\n`;
          }

          
      }

      if(anError==''){
      }
      else{
        this._snackBar.open( anError,"Check input and redo",{panelClass: ['snackbarStyle']});
      }


  }

  submit_Equipment_Properties(){
    

    
   if(this.options=='yes'){
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

   if (this.change_centrifuge=='yes'){
     //if new values for the centrifuge were given, do nothing.
   }

   else{
     //If no new values were given, use defaults.
    this.equipment_properties.controls['Rcentrifuge'].setValue(this.default_Rcentrifuge);
    this.equipment_properties.controls['L1'].setValue(this.default_L1);
    this.equipment_properties.controls['L2'].setValue(this.default_L2);
  
    this.equipment_properties.controls['V1'].setValue(this.default_V1);
    this.equipment_properties.controls['V2'].setValue(this.default_V2);
    this.equipment_properties.controls['Va'].setValue(this.default_Va);
    this.equipment_properties.controls['Vb'].setValue(this.default_Vb);


   }

       /*Saves the inputed equipment properties */
    
    let data=JSON.stringify(this.equipment_properties.value);
    console.log(data)

    this._PassToPythonServiceHolder.sendEquipmentProperties(data).subscribe(
      res => {
        let temp=JSON.parse(res);
        this._results.equipment_setup_successfully=temp.equipment_setup_successfully;
        console.log("Setup of equipment was completed successfully:");
      },
      err => console.log("An error occurred in input-form-components.ts, submit_Equipment_Properties()")

    )};

  submit_Spin_Test_Data(){
    this.checkUserInput();


    
    

    /*Saves the inputed spin test data and changes the global variable spintest_setup_successfully to true */

    //Here, the residual solids entered in the formula are made accessible by the rest of the frontend for plotting
    this._results.results_spintest=[this.spin_test_data.value['residualSolids1'],this.spin_test_data.value['residualSolids2'],this.spin_test_data.value['residualSolids3'],this.spin_test_data.value['residualSolids4']];
    //console.log("This is the property that was saved to global results")
    //console.log(this._results.results_spintest)
    if(this.spin_test_data.controls['PreferredUnit'].value==null){

    }
    else{
      this._results.separation_result=this.spin_test_data.controls['PreferredUnit'].value;

    }    
    //PAUSED HERE

    let data=JSON.stringify(this.spin_test_data.value);

     this._PassToPythonServiceHolder.sendSpintestData(data).subscribe(
      res => {

                let temp=JSON.parse(res);    
                //console.log(temp);
                this._results.spintest_setup_successfully=temp.spintest_setup_successfully;
                console.log("Setup of spintest was completed successfully:");

      },
      err =>{
        
        this._snackBar.open("Unfortunately, an error occured when communicating with the calculation tool.", "Ok")
        console.log("An error occurred in input-form.component.ts, submit_Spin_Test_Data()")
      }    
    );

 
   }

   


 
  

}
