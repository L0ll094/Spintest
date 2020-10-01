import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css'],
  providers: [PassToPythonService],
})
export class InputFormComponent implements OnInit {
  fluid_properties: FormGroup;
  spin_test_data: FormGroup;
  private _PassToPythonServiceHolder;
  
  constructor(
    PassToPythonServiceHolder: PassToPythonService,
    private formBuilder: FormBuilder) {this._PassToPythonServiceHolder= PassToPythonService;

  }

  ngOnInit() {
      this.fluid_properties=this.formBuilder.group({
      densityParticle: [null,[Validators.required,]],
      densityFeed:[null,[Validators.required,]],
      kinviscosity: [null,Validators.required],})

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
  submit(){
   /* if(!this.fluid_properties.valid){
      return;
    }*/
  console.log(this.fluid_properties.value);
  console.log(this.spin_test_data.value);
  }

}
