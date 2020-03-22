import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IWorkingStyle } from 'app/shared/model/working-style.model';

@Component({
  selector: 'jhi-working-style-detail',
  templateUrl: './working-style-detail.component.html'
})
export class WorkingStyleDetailComponent implements OnInit {
  workingStyle: IWorkingStyle | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ workingStyle }) => (this.workingStyle = workingStyle));
  }

  previousState(): void {
    window.history.back();
  }
}
