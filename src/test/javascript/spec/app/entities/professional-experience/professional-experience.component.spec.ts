import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { WirvsvirusTestModule } from '../../../test.module';
import { ProfessionalExperienceComponent } from 'app/entities/professional-experience/professional-experience.component';
import { ProfessionalExperienceService } from 'app/entities/professional-experience/professional-experience.service';
import { ProfessionalExperience } from 'app/shared/model/professional-experience.model';

describe('Component Tests', () => {
  describe('ProfessionalExperience Management Component', () => {
    let comp: ProfessionalExperienceComponent;
    let fixture: ComponentFixture<ProfessionalExperienceComponent>;
    let service: ProfessionalExperienceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WirvsvirusTestModule],
        declarations: [ProfessionalExperienceComponent]
      })
        .overrideTemplate(ProfessionalExperienceComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProfessionalExperienceComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProfessionalExperienceService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ProfessionalExperience(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.professionalExperiences && comp.professionalExperiences[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
