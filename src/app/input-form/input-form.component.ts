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
      spintimes: [null,[Validators.required,]],
      Nstart: [null,[Validators.required,]],
      speeds: [null,[Validators.required,]],
      residualSolids:[null,[Validators.required,]],
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
