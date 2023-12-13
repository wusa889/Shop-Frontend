import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CategoryControllerService, CategoryShowDto, UserControllerService, UserShowDto} from "../../../openapi-client";
import {MatTableModule} from "@angular/material/table";

@Component({
  selector: 'pm-listusers',
  standalone: true,
    imports: [CommonModule, MatTableModule],
  templateUrl: './listusers.component.html',
  styleUrl: './listusers.component.scss'
})
export class ListusersComponent {
    users: UserShowDto[] = [];
    displayedColumns: string[] = ['id', 'firstName', 'lastName', 'street', 'zip', 'city', 'country', 'phone', 'mobilePhone', 'email'];

    constructor(private readonly userService: UserControllerService) { }

    ngOnInit(): void {
        this.showCategories();
    }

    showCategories(): void {
        this.userService.getAllUsers().subscribe(value => {
            this.users = value;
        });
    }
}
