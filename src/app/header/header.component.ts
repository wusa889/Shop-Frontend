import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";
import {LoginComponent} from "../pages/auth/login/login.component";
import {Subscription} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'pm-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatMenuModule, MatButtonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isLoggedIn: boolean
  private loginSubscription: Subscription;

  constructor(
    private router: Router,
    private toastr: ToastrService
  ) {
    this.isLoggedIn = !!localStorage.getItem('ACCESS_TOKEN');
    this.loginSubscription = LoginComponent.onLoginChange.subscribe((status: boolean) => {
      this.isLoggedIn = status;
    });
  }
  toHome(): void {
    this.router.navigateByUrl('/')
  }
  logout(): void {
    this.toastr.success('Logout successful', 'Success', {
      positionClass: 'toast-bottom-center'
    })
    localStorage.removeItem('ACCESS_TOKEN');
    this.isLoggedIn = false;
    this.router.navigateByUrl('/');
    LoginComponent.onLoginChange.emit(false);
  }
}
