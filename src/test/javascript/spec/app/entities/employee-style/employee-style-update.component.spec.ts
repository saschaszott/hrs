import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { WirvsvirusTestModule } from '../../../test.module';
import { EmployeeStyleUpdateComponent } from 'app/entities/employee-style/employee-style-update.component';
import { EmployeeStyleService } from 'app/entities/employee-style/employee-style.service';
import { EmployeeStyle } from 'app/shared/model/employee-style.model';

describe('Component Tests', () => {
  describe('EmployeeStyle Management Update Component', () => {
    let comp: EmployeeStyleUpdateComponent;
    let fixture: ComponentFixture<EmployeeStyleUpdateComponent>;
    let service: EmployeeStyleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WirvsvirusTestModule],
        declarations: [EmployeeStyleUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(EmployeeStyleUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EmployeeStyleUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EmployeeStyleService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new EmployeeStyle(123);
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
        const entity = new EmployeeStyle();
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
