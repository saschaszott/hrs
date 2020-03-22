import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'jhi-user-welcome-page',
  templateUrl: './user-welcome-page.component.html',
  styleUrls: ['./user-welcome-page.component.scss']
})
export class UserWelcomePageComponent {
  public firstName = '';
  public lastName = '';
  public address = '';
  public image = '';

  constructor(private router: Router, private route: ActivatedRoute) {}

  public get canContinue(): boolean {
    return this.firstName !== '' && this.lastName !== '' && this.address !== '';
  }

  public continue(): void {
    this.router.navigate(['../how'], { relativeTo: this.route });
  }
}
