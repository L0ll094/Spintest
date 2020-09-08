import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent implements OnInit {
  name= new FormControl('');
  fluid_properties: FormGroup;
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
      this.fluid_properties=this.formBuilder.group({
      email: [null,[Validators.required, Validators.pattern(this.emailRegx)]],
      viscosity: [null,Validators.required],

    });
  }
  submit(){
    if(!this.fluid_properties.valid){
      return;
    }
  console.log(this.fluid_properties.value);
  }

}
