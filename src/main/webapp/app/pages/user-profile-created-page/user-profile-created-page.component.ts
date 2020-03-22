import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'jhi-user-profile-created-page',
  templateUrl: './user-profile-created-page.component.html',
  styleUrls: ['./user-profile-created-page.component.scss']
})
export class UserProfileCreatedPageComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  public continue(): void {
    this.router.navigate(['../company-search'], { relativeTo: this.route });
  }
}
