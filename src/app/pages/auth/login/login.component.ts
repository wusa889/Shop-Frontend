import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ɵFormGroupValue,
  ɵTypedOrUntyped
} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {RouterLink} from "@angular/router";
import {UserControllerService} from "../../../openapi-client";


@Component({
  selector: 'pm-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatInputModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  constructor(
    private readonly userService: UserControllerService
  ) {
  }
  myForm = new FormGroup({
    userName: new FormControl<string>("", [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
    password: new FormControl<string>("", [Validators.required, Validators.minLength(8)])
    }
  )
  submit(): void{
    let userName = this.myForm.value.userName!
    let password = this.myForm.value.password!
    this.userService.login({
        email: userName,
        password: password
    }).subscribe(value =>{
      console.log(value)
      localStorage.setItem("ACCESS_TOKEN", value.token!)
    })
  }
}
