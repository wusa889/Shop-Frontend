import {Directive, TemplateRef, ViewContainerRef} from '@angular/core';
import {jwtDecode} from "jwt-decode";

@Directive({
  selector: '[pmIsAdmin]',
  standalone: true
})
export class IsAdminDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {
    this.checkAndDisplayContent();
  }

  private checkAndDisplayContent(): void {
    this.viewContainer.clear();
    if (this.hasAdminRole()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  private hasAdminRole(): boolean {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (!token) return false;

    try {
      const decodedToken: any = jwtDecode(token)
      const roles: string[] = decodedToken.roles || [];
      return roles.includes('admin');
    } catch (error) {
      console.error('Error decoding token', error);
      return false;
    }
  }
}
