import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { WirvsvirusTestModule } from '../../../test.module';
import { ProfessionalExperienceUpdateComponent } from 'app/entities/professional-experience/professional-experience-update.component';
import { ProfessionalExperienceService } from 'app/entities/professional-experience/professional-experience.service';
import { ProfessionalExperience } from 'app/shared/model/professional-experience.model';

describe('Component Tests', () => {
  describe('ProfessionalExperience Management Update Component', () => {
    let comp: ProfessionalExperienceUpdateComponent;
    let fixture: ComponentFixture<ProfessionalExperienceUpdateComponent>;
    let service: ProfessionalExperienceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WirvsvirusTestModule],
        declarations: [ProfessionalExperienceUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ProfessionalExperienceUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProfessionalExperienceUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProfessionalExperienceService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProfessionalExperience(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProfessionalExperience();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
