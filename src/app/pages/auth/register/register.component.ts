import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {Router, RouterLink} from "@angular/router";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {UserControllerService} from "../../../openapi-client";
import {routes} from "../../../app.routes";

@Component({
  selector: 'pm-register',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, RouterLink, ReactiveFormsModule, MatOptionModule, MatSelectModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  router = inject(Router)
  constructor(
    private readonly userService: UserControllerService
  ) {
  }
  myForm = new FormGroup({
    firstName: new FormControl<string>("", [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(255),
      Validators.pattern(/\D/)]),
    lastName: new FormControl<string>("",
      [Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
        Validators.pattern(/\D+/)]),
    street: new FormControl<string>("",
      [Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
        Validators.pattern(/\w+/)]),
    zip: new FormControl<string>("",
      [Validators.required,
        Validators.minLength(4),
        Validators.maxLength(10),
        Validators.pattern(/\d+/)]),
    email: new FormControl<string>("",
      [Validators.required,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
    password: new FormControl<string>("",
      [Validators.required,
        Validators.minLength(8),
      Validators.pattern(/^(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%^&+-]).*$/)]),
    city: new FormControl<string>("",
      [Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
        Validators.pattern(/\D+/)]),
    country: new FormControl<string>("",
      [Validators.required,
        Validators.maxLength(15),
        Validators.pattern(/\D+/)]),
    phone: new FormControl<string>("",
      [Validators.maxLength(15),
        Validators.pattern(/\d+/)]),
    mobilePhone: new FormControl<string>("",
      [Validators.maxLength(15),
        Validators.pattern(/\d+/)]),
  })

  submit() {
    let email: string = this.myForm.value.email!;
    let password: string = this.myForm.value.password!;
    let firstName: string = this.myForm.value.firstName!;
    let lastName: string = this.myForm.value.lastName!;
    let street: string = this.myForm.value.street!;
    let zip: string = this.myForm.value.zip!;
    let city: string = this.myForm.value.city!;
    let country: string = this.myForm.value.country!;
    let phone: string = this.myForm.value.phone!;
    let mobilePhone: string = this.myForm.value.mobilePhone!;
    this.userService.register({
        zip: zip,
        city: city,
        country: country,
        email: email,
        street: street,
        phone: phone,
        mobilePhone: mobilePhone,
        password: password,
        lastName: lastName,
        firstName: firstName
    }).subscribe(value => {
      this.router.navigateByUrl('/auth/login')
    });

  }
}


