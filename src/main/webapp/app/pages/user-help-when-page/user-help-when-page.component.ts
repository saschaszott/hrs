import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'jhi-user-help-when-page',
  templateUrl: './user-help-when-page.component.html',
  styleUrls: ['./user-help-when-page.component.scss']
})
export class UserHelpWhenPageComponent {
  public availableDate: Date | undefined;

  constructor(private router: Router, private route: ActivatedRoute) {}

  public get canContinue(): boolean {
    return this.availableDate !== undefined;
  }

  public continue(): void {
    const message = `User can help on ${this.availableDate}.`;
    // TODO: wuerfelda: Remove, just for testing purposes.
    // eslint-disable-next-line no-console
    console.log(message);
    this.router.navigate(['../created'], { relativeTo: this.route });
  }
}
