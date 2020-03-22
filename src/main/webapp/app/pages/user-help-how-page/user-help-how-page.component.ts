import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

const MOCK_COMPETENCES = ['Muskelkraft', 'Marketing', 'Öffentlicher Dienst', 'Design', 'Maurer', 'Koordination', 'Livestreaming'];

@Component({
  selector: 'jhi-user-help-how-page',
  templateUrl: './user-help-how-page.component.html',
  styleUrls: ['./user-help-how-page.component.scss']
})
export class UserHelpHowPageComponent implements OnInit {
  private userCompetences: string[] = [];

  public competences$: Observable<string[]> | undefined;

  constructor(private router: Router) {
    // TODO: wuerfelda: Inject a service fetching all available competences.
  }

  ngOnInit(): void {
    // TODO: wuefelda: Will be fetched from a service.
    this.competences$ = of(MOCK_COMPETENCES);
  }

  public addCompetence(competence: string): void {
    this.userCompetences.push(competence);
  }

  public get canContinue(): boolean {
    return this.userCompetences.length > 0;
  }

  public continue(): void {
    const message = `User has ${this.userCompetences.length} competences.`;
    // TODO: wuerfelda: Remove, just for testing purposes.
    // eslint-disable-next-line no-console
    console.log(message);
    this.router.navigate(['when']);
  }
}
