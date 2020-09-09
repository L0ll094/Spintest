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
      density: [null,[Validators.required,]],
      Kinematic_Viscosity: [null,Validators.required],

    });
  }
  submit(){
    if(!this.fluid_properties.valid){
      return;
    }
  console.log(this.fluid_properties.value);
  }

}
