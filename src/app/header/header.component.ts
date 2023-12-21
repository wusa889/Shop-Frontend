import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";
import {LoginComponent} from "../pages/auth/login/login.component";
import {Subscription} from "rxjs";

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
    private router: Router
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
    localStorage.removeItem('ACCESS_TOKEN'); // Adjust if your token key is different
    this.isLoggedIn = false;
    this.router.navigateByUrl('/auth/login'); // Optionally redirect the user to the home page after logout
    LoginComponent.onLoginChange.emit(false);
  }
}
