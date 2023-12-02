import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {RouterLink} from "@angular/router";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";

@Component({
  selector: 'pm-register',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, RouterLink, ReactiveFormsModule, MatOptionModule, MatSelectModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  myForm = new FormGroup({
    firstName: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(255),
      Validators.pattern(/\D/)]),
    lastName: new FormControl(null,
      [Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
        Validators.pattern(/\D+/)]),
    street: new FormControl(null,
      [Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
        Validators.pattern(/\w+/)]),
    zip: new FormControl(null,
      [Validators.required,
        Validators.minLength(4),
        Validators.maxLength(10),
        Validators.pattern(/\d+/)]),
    email: new FormControl(null,
      [Validators.required,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
    password: new FormControl(null,
      [Validators.required,
        Validators.minLength(8),
      Validators.pattern(/^(?=.*[0-9]) (?=.*[A-Z]) (?=.*[@#$%^&+-]) .*$/)]),
    city: new FormControl(null,
      [Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
        Validators.pattern(/\D+/)]),
    country: new FormControl(null,
      [Validators.required,
        Validators.maxLength(15),
        Validators.pattern(/\D+/)]),
    phone: new FormControl(null,
      [Validators.maxLength(15),
        Validators.pattern(/\d+/)]),
    mobilePhone: new FormControl(null,
      [Validators.maxLength(15),
        Validators.pattern(/\d+/)]),
  })

  submit() {

  }
}


