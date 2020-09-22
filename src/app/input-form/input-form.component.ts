import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent implements OnInit {
  fluid_properties: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
      this.fluid_properties=this.formBuilder.group({
      densityParticle: [null,[Validators.required,]],
      densityFeed:[null,[Validators.required,]],
      kinviscosity: [null,Validators.required],
      
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
  }

}
