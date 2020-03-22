import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProfessionalExperience } from 'app/shared/model/professional-experience.model';

@Component({
  selector: 'jhi-professional-experience-detail',
  templateUrl: './professional-experience-detail.component.html'
})
export class ProfessionalExperienceDetailComponent implements OnInit {
  professionalExperience: IProfessionalExperience | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ professionalExperience }) => (this.professionalExperience = professionalExperience));
  }

  previousState(): void {
    window.history.back();
  }
}
