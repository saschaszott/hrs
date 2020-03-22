import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-user-profile-created-page',
  templateUrl: './user-profile-created-page.component.html',
  styleUrls: ['./user-profile-created-page.component.scss']
})
export class UserProfileCreatedPageComponent {
  constructor(private router: Router) {}

  public continue(): void {
    this.router.navigate(['company-search']);
  }
}
