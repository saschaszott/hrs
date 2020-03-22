import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { WirvsvirusTestModule } from '../../../test.module';
import { WorkingStyleUpdateComponent } from 'app/entities/working-style/working-style-update.component';
import { WorkingStyleService } from 'app/entities/working-style/working-style.service';
import { WorkingStyle } from 'app/shared/model/working-style.model';

describe('Component Tests', () => {
  describe('WorkingStyle Management Update Component', () => {
    let comp: WorkingStyleUpdateComponent;
    let fixture: ComponentFixture<WorkingStyleUpdateComponent>;
    let service: WorkingStyleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WirvsvirusTestModule],
        declarations: [WorkingStyleUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(WorkingStyleUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(WorkingStyleUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(WorkingStyleService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new WorkingStyle(123);
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
        const entity = new WorkingStyle();
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
