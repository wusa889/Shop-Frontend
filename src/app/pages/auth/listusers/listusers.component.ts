import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoryControllerService, CategoryShowDto, UserControllerService, UserShowDto} from "../../../openapi-client";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'pm-listusers',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './listusers.component.html',
  styleUrl: './listusers.component.scss'
})
export class ListusersComponent {
  users: UserShowDto[] = [];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'street', 'zip', 'city', 'country', 'phone', 'mobilePhone', 'email', 'action'];

  constructor(
    private readonly userService: UserControllerService,
    private tostr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.showCategories();
  }

  showCategories(): void {
    this.userService.getAllUsers().subscribe(value => {
      this.users = value;
    });
  }

  promoteToAdmin(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to promote this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, promote user!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.promoteUser(id).subscribe(value => {
          console.log("user Promoted")
        }, error => {
          this.tostr.error('This user is already admin', 'Failed', {
            positionClass: 'toast-bottom-center'
          })
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.tostr.info('Promotion cancelled', 'Cancelled', {
          positionClass: 'toast-bottom-center'
        });
      }
    });
  }
}
